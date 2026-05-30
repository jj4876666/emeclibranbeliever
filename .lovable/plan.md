# Investigation: Why Health Officer Updates Don't Reach Patient Records

## 1. The actual data flow (as built today)

```
HealthOfficerDashboard.handleSaveUpdate()         src/components/dashboards/HealthOfficerDashboard.tsx:192-230
        │
        ├─► supabase.from('medical_updates').insert({       ← single DB write
        │       patient_id: selectedPatient.id,             ← profiles.id of patient
        │       update_type, title, data,
        │       officer_name, facility_name
        │   })
        │
        └─► auditLogger.log(...)                            ← localStorage only
                src/utils/healthOfficerAuditLog.ts (key: emec_health_officer_audit_log)
```

Patient side:

```
AdultDashboard (src/components/dashboards/AdultDashboard.tsx:29-40)
   └─ supabase.from('profiles').select('id').eq('user_id', currentUser.id)   ← needs real auth uid
        └─ profileId
             ├─► LiveMedicalUpdates (src/components/records/LiveMedicalUpdates.tsx)
             │     └─ supabase.from('medical_updates').select().eq('patient_id', profileId)
             └─► EnhancedPatientRecords (src/components/records/EnhancedPatientRecords.tsx:58-113)
                   └─ same query + realtime channel on medical_updates / medical_records
```

So the only table the officer writes to is `public.medical_updates`. `medical_records`, `medications`, `allergies`, `immunizations`, and `audit_logs` are NEVER written by the officer flow.

## 2. Audit Log Analysis

- The "officer audit log" the officer sees is **`auditLogger` in `src/utils/healthOfficerAuditLog.ts`** — writes to `localStorage` key `emec_health_officer_audit_log`, never to Supabase.
- The Supabase `public.audit_logs` table exists and has RLS, but **no code path inserts into it**. The patient-side `EnhancedPatientRecords` queries `audit_logs` (line 86) and always gets nothing.
- An audit entry appearing locally does **not** imply the DB write succeeded — but in `handleSaveUpdate` they are gated (audit only logs in the `else` branch of `if (error)`), so a visible audit entry means the `medical_updates` insert returned no error for that browser/session.

## 3. EMEC ID linkage

- Generation: `public.generate_emec_id()` (11 chars) is called by the `handle_new_user` trigger when a real auth user signs up; the result is stored on `profiles.emec_id`. Client also has `generateEmecId()` in `src/types/emec.ts` for demo users.
- Linkage to records: every record table (`medical_updates`, `medical_records`, `medications`, `allergies`, `immunizations`, `audit_logs`) keys off **`patient_id = profiles.id`** — NOT `emec_id`. There are **no foreign keys** declared on any of those tables (see schema dump), so the link is by convention only.
- Officer search: `HealthOfficerDashboard` filters `profiles` rows by `full_name`/`emec_id` (lines 116-119), then writes `patient_id = selectedPatient.id` (the profile uuid). That linkage is correct **for real registered patients**.

## 4. Where the chain breaks (root causes — ranked)

### A. Demo patients have no row in `public.profiles` (primary cause)
Demo accounts (`allDemoUsers`, ids like `demo-…` / `EMEC-…`) live only in localStorage; they are never inserted into Supabase. Consequences:
- The officer's `fetchPatients` (HealthOfficerDashboard.tsx:70-84) returns only **real registered patients**. Demo patient EMEC IDs cannot be found at all.
- If the patient is a demo account and logs in, `AdultDashboard` runs `select id from profiles where user_id = currentUser.id` with a synthetic id → `profileId` stays `null` → `LiveMedicalUpdates` is not rendered (`{profileId && …}` on line 119) and `EnhancedPatientRecords` returns early at line 77 with empty arrays. So even if an officer somehow wrote an update, the demo patient dashboard would never query it.

### B. Officer role / RLS write requirement
`medical_updates` only has two policies: `Admins can manage all medical_updates` (ALL, `has_role(auth.uid(),'admin')`) and `Patients can view their medical_updates` (SELECT). Therefore the officer's INSERT only succeeds if:
1. They are signed in with a real Supabase session (not a demo officer), AND
2. They have a row in `user_roles` with `role = 'admin'`.

The `handle_new_user` trigger assigns `admin` only when signup metadata contains `account_type = 'admin'`. Officers registered without that metadata get `adult` and every insert silently fails RLS — the toast shows "Failed to save update" and `auditLogger.log` is **not** called. Verify with:
```sql
select p.full_name, p.account_type, ur.role
from profiles p left join user_roles ur on ur.user_id = p.user_id
where p.account_type = 'admin' or ur.role = 'admin';
```

### C. Demo officer writing against Supabase
If the officer is a demo account, `supabase.auth.getSession()` has no session → RLS rejects the insert → error branch fires → audit log not written either. (So demo-officer + any-patient = nothing anywhere.)

### D. `medical_records`, `medications`, `allergies`, `immunizations` are never populated by the officer
`EnhancedPatientRecords` shows tabs for vitals/medications/allergies/immunizations that read from those tables. The officer flow only writes to `medical_updates`, so those tabs will look empty even when updates exist — the data only shows up in the "Medical Updates" / LiveMedicalUpdates panel. This is an architectural gap, not a bug per se, but matches the symptom "EMEC ID doesn't show updated information" for users looking at the structured tabs.

### E. `audit_logs` table is dead code
`EnhancedPatientRecords` queries `public.audit_logs` (line 86) but nothing inserts into it. The "Access Log" tab is therefore always empty for real users.

## 5. Verification queries to confirm the root cause

Run (read-only) before any fix:
```sql
-- 1. Did officer inserts actually land?
select id, patient_id, update_type, title, officer_name, created_at
from medical_updates order by created_at desc limit 20;

-- 2. Map a specific EMEC ID to a profile
select id, user_id, emec_id, full_name, account_type from profiles where emec_id = 'XXXXXXXXXXX';

-- 3. Updates for that profile
select * from medical_updates where patient_id = '<profile.id from #2>';

-- 4. Officer's role
select p.emec_id, p.account_type, ur.role
from profiles p left join user_roles ur on ur.user_id = p.user_id
where p.emec_id = '<officer EMEC ID>';
```

Expected outcome of each scenario:
- Real officer + real patient, officer has `admin` role: row in #1, matches #3 → patient should see it. If they don't, it's a UI/profile-resolution bug in `AdultDashboard.useEffect` (e.g., session not yet hydrated when fetch runs).
- Real officer without `admin` role: #1 empty for that officer → RLS rejected silently from the user's perspective (only a toast).
- Demo patient: #2 returns no row → updates can never be linked.
- Demo officer: #1 empty → nothing written.

## 6. Files / functions / tables responsible

| Layer | Location |
|---|---|
| Officer form & submit | `src/components/dashboards/HealthOfficerDashboard.tsx` (`handleSaveUpdate`, lines 192-230; `fetchPatients` 70-84) |
| Officer local audit log | `src/utils/healthOfficerAuditLog.ts` (localStorage only) |
| Patient profile resolution | `src/components/dashboards/AdultDashboard.tsx` lines 29-40; `src/components/records/EnhancedPatientRecords.tsx` lines 58-77 |
| Patient updates display | `src/components/records/LiveMedicalUpdates.tsx`; `EnhancedPatientRecords.tsx` lines 80-113 |
| Auth → profile/user_role bootstrap | `public.handle_new_user()` trigger (schema dump above) |
| Tables actually written | only `public.medical_updates` |
| Tables read but never written | `public.medical_records`, `medications`, `allergies` (officer side), `immunizations`, `audit_logs` |
| RLS gate for officer writes | `medical_updates` policy "Admins can manage all medical_updates" → requires `has_role(auth.uid(),'admin')` |

## 7. The single sentence diagnosis

The officer flow only writes one row to `public.medical_updates` keyed on `profiles.id`; everything else the patient UI reads (`medical_records`, `medications`, `allergies`, `immunizations`, `audit_logs`) is never populated, and the link breaks entirely when either side is a demo account (no `profiles` row) or when the officer's `user_roles.role` isn't `admin` (RLS rejects the insert silently).

No fixes applied — awaiting your direction on which root cause(s) to address first (demo-vs-real account routing, RLS/role bootstrap for officers, or also persisting structured records into `medical_records`/`medications`/`allergies`/`immunizations`).
