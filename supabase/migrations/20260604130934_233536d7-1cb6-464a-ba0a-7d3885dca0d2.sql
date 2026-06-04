
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
  RAISE WARNING '[SIGNUP %] handle_new_user failed user=% sqlstate=% msg=%', v_trace, NEW.id, SQLSTATE, SQLERRM;
  RETURN NEW;
END;
$function$;
