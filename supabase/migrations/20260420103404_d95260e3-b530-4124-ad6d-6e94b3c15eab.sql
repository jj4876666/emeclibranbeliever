DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;

CREATE POLICY "Authenticated users can create their own donations"
ON public.donations
FOR INSERT
TO authenticated
WITH CHECK (donor_id = public.get_profile_id(auth.uid()));