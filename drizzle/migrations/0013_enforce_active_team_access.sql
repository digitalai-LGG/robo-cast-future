-- Deactivating a team member must revoke database and server-function access,
-- not only prevent the admin page from loading.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles AS role_row
    JOIN public.profiles AS profile ON profile.id = role_row.user_id
    WHERE role_row.user_id = _user_id
      AND role_row.role = _role
      AND profile.active
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role_name(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles AS role_row
    JOIN public.profiles AS profile ON profile.id = role_row.user_id
    WHERE role_row.user_id = _user_id
      AND role_row.role::text = _role
      AND profile.active
  );
$$;
