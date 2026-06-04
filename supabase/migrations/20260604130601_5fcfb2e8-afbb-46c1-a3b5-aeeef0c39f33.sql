
-- 1. Enforce one-to-one auth.users <-> profiles
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- 2. Collision-safe EMEC ID generator
CREATE OR REPLACE FUNCTION public.generate_emec_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT;
  i INTEGER;
  attempts INTEGER := 0;
BEGIN
  LOOP
    result := '';
    FOR i IN 1..11 LOOP
      result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE emec_id = result) THEN
      RETURN result;
    END IF;
    attempts := attempts + 1;
    IF attempts > 10 THEN
      RETURN result || substr(md5(random()::text), 1, 4);
    END IF;
  END LOOP;
END;
$function$;

-- 3. Hardened handle_new_user: idempotent, never blocks signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, emec_id, account_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    public.generate_emec_id(),
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'adult')
  )
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE
      WHEN NEW.raw_user_meta_data->>'account_type' = 'admin' THEN 'admin'::app_role
      WHEN NEW.raw_user_meta_data->>'account_type' = 'child' THEN 'child'::app_role
      WHEN NEW.raw_user_meta_data->>'account_type' = 'parent' THEN 'parent'::app_role
      ELSE 'adult'::app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'handle_new_user failed for %: % %', NEW.id, SQLERRM, SQLSTATE;
  RETURN NEW;
END;
$function$;
