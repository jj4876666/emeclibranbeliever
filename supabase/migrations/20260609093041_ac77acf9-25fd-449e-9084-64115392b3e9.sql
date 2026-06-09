CREATE POLICY "Patients can insert their own audit logs"
ON public.audit_logs
FOR INSERT
TO authenticated
WITH CHECK (patient_id = public.get_profile_id(auth.uid()));