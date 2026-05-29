
-- 1. Fix profiles: remove the ALL/USING(auth.uid() IS NOT NULL) policy that leaked all rows to any signed-in user.
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;

-- Re-add narrow write protections (SELECT remains governed by existing per-user/parent/admin policies).
CREATE POLICY "Authenticated users can insert profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Block any anonymous writes explicitly (SELECT is already restricted by per-user policies).
CREATE POLICY "Block anonymous writes on profiles"
ON public.profiles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 2. Fix user_roles privilege escalation: only allow self-insert of non-privileged role.
DROP POLICY IF EXISTS "Users can insert their own role" ON public.user_roles;

CREATE POLICY "Users can insert own non-privileged role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND role IN ('child'::app_role, 'adult'::app_role)
);

-- Admins can manage roles (escalation path goes through admin only).
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
