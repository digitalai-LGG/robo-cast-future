-- Point the public announcement bar at the 2027 show calendar.
-- Safe to re-run: the row is a singleton (id = 1).
INSERT INTO public.announcement_bar (id, message, redirect_url, is_visible, active_until)
VALUES (
  1,
  'Upcoming events 2027 — meet Modtech at EICF Sweden (May 10th – 13th) and GIFA, Dusseldorf (June 21st – 25th)',
  '/blog#upcoming-events',
  true,
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  message = EXCLUDED.message,
  redirect_url = EXCLUDED.redirect_url,
  is_visible = true,
  active_until = NULL;
