-- 1. Allergies: allow patients to manage their own rows
CREATE POLICY "Patients can insert their allergies"
ON public.allergies
FOR INSERT
TO authenticated
WITH CHECK (patient_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Patients can update their allergies"
ON public.allergies
FOR UPDATE
TO authenticated
USING (patient_id = public.get_profile_id(auth.uid()))
WITH CHECK (patient_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Patients can delete their allergies"
ON public.allergies
FOR DELETE
TO authenticated
USING (patient_id = public.get_profile_id(auth.uid()));

-- 2. Donations: add M-Pesa tracking columns
ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS mpesa_checkout_request_id TEXT,
  ADD COLUMN IF NOT EXISTS mpesa_receipt_number TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS charity_name TEXT;

CREATE INDEX IF NOT EXISTS idx_donations_checkout
  ON public.donations (mpesa_checkout_request_id);

-- Allow donors to update only their own pending donation rows (e.g. to cancel)
CREATE POLICY "Donors can update their own donations"
ON public.donations
FOR UPDATE
TO authenticated
USING (donor_id = public.get_profile_id(auth.uid()))
WITH CHECK (donor_id = public.get_profile_id(auth.uid()));