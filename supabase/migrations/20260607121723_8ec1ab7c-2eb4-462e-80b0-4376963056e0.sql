CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_trace text := COALESCE(NEW.raw_user_meta_data->>'signup_trace_id', 'no-trace');
BEGIN
  RAISE LOG '[SIGNUP %] handle_new_user start user=%', v_trace, NEW.id;

  INSERT INTO public.profiles (
    user_id,
    full_name,
    emec_id,
    account_type,
    date_of_birth,
    gender,
    phone,
    emergency_contact,
    height,
    weight,
    license_number,
    parent_phone,
    parent_email
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    public.generate_emec_id(),
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'adult'),
    NULLIF(NEW.raw_user_meta_data->>'date_of_birth', '')::date,
    NULLIF(NEW.raw_user_meta_data->>'gender', ''),
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    CASE
      WHEN NEW.raw_user_meta_data ? 'emergency_contact'
        THEN (NEW.raw_user_meta_data->>'emergency_contact')::jsonb
      ELSE NULL
    END,
    NULLIF(NEW.raw_user_meta_data->>'height', '')::numeric,
    NULLIF(NEW.raw_user_meta_data->>'weight', '')::numeric,
    NULLIF(NEW.raw_user_meta_data->>'license_number', ''),
    NULLIF(NEW.raw_user_meta_data->>'parent_phone', ''),
    NULLIF(NEW.raw_user_meta_data->>'parent_email', '')
  )
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role, facility_name)
  VALUES (
    NEW.id,
    CASE
      WHEN NEW.raw_user_meta_data->>'account_type' = 'admin' THEN 'admin'::app_role
      WHEN NEW.raw_user_meta_data->>'account_type' = 'child' THEN 'child'::app_role
      WHEN NEW.raw_user_meta_data->>'account_type' = 'parent' THEN 'parent'::app_role
      ELSE 'adult'::app_role
    END,
    NULLIF(NEW.raw_user_meta_data->>'facility_name', '')
  )
  ON CONFLICT (user_id, role) DO NOTHING;

  RAISE LOG '[SIGNUP %] handle_new_user success user=%', v_trace, NEW.id;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[SIGNUP %] handle_new_user failed user=% sqlstate=% msg=%', v_trace, NEW.id, SQLSTATE, SQLERRM;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();