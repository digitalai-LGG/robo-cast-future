-- Careers vacancies managed from the admin control centre.
-- Idempotent: safe to re-run if the table was already created by hand.
-- Note: compensation is intentionally not stored here. Budgeted CTC is an
-- internal figure and must never be published on the website.
CREATE TABLE IF NOT EXISTS public.career_vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  openings integer NOT NULL DEFAULT 1 CHECK (openings > 0),
  department text NOT NULL DEFAULT '',
  qualification text NOT NULL DEFAULT '',
  experience text NOT NULL DEFAULT '',
  responsibilities text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 100,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS career_vacancies_published_sort_idx
  ON public.career_vacancies (published, sort_order);

GRANT SELECT ON public.career_vacancies TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.career_vacancies TO authenticated;
GRANT ALL ON public.career_vacancies TO service_role;
ALTER TABLE public.career_vacancies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read published vacancies" ON public.career_vacancies;
CREATE POLICY "public read published vacancies" ON public.career_vacancies
  FOR SELECT TO anon, authenticated USING (published);

DROP POLICY IF EXISTS "staff read all vacancies" ON public.career_vacancies;
CREATE POLICY "staff read all vacancies" ON public.career_vacancies
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

DROP POLICY IF EXISTS "staff manage vacancies" ON public.career_vacancies;
CREATE POLICY "staff manage vacancies" ON public.career_vacancies
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

DROP TRIGGER IF EXISTS career_vacancies_touch ON public.career_vacancies;
CREATE TRIGGER career_vacancies_touch BEFORE UPDATE ON public.career_vacancies
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
