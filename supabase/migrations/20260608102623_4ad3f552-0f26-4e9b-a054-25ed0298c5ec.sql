
-- 1. Add status workflow columns
ALTER TABLE public.medical_updates
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','approved','rejected')),
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewer_id uuid;

-- 2. Default officer_id to auth.uid() so client doesn't need to send it
ALTER TABLE public.medical_updates
  ALTER COLUMN officer_id SET DEFAULT auth.uid();

-- 3. Tighten policies: drop the broad admin-manage-all policy
DROP POLICY IF EXISTS "Admins can manage all medical_updates" ON public.medical_updates;
DROP POLICY IF EXISTS "Patients can view their medical_updates" ON public.medical_updates;
DROP POLICY IF EXISTS "Officers insert updates for real patients only" ON public.medical_updates;
DROP POLICY IF EXISTS "Officers view their own submitted updates" ON public.medical_updates;
DROP POLICY IF EXISTS "Patients view their own updates" ON public.medical_updates;
DROP POLICY IF EXISTS "Patients approve or reject their pending updates" ON public.medical_updates;

-- Health officer (admin role) can INSERT, but:
--   * officer_id must be their own auth.uid()
--   * patient must exist, must NOT be an admin, and must not be themselves
CREATE POLICY "Officers insert updates for real patients only"
ON public.medical_updates
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  AND officer_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = medical_updates.patient_id
      AND p.user_id <> auth.uid()
      AND NOT public.has_role(p.user_id, 'admin')
  )
);

-- Health officer can read updates they submitted (for their history view)
CREATE POLICY "Officers view their own submitted updates"
ON public.medical_updates
FOR SELECT
TO authenticated
USING (officer_id = auth.uid());

-- Patient can read their own updates (pending + approved + rejected)
CREATE POLICY "Patients view their own updates"
ON public.medical_updates
FOR SELECT
TO authenticated
USING (patient_id = public.get_profile_id(auth.uid()));

-- Patient can UPDATE only their own pending updates and only to set status
CREATE POLICY "Patients approve or reject their pending updates"
ON public.medical_updates
FOR UPDATE
TO authenticated
USING (
  patient_id = public.get_profile_id(auth.uid())
  AND status = 'pending'
)
WITH CHECK (
  patient_id = public.get_profile_id(auth.uid())
  AND status IN ('approved','rejected')
);

-- NOTE: no DELETE policy is created — records are append-only.
