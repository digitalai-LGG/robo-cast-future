import { defineHandler } from "h3";

/**
 * Keeps the Supabase project awake.
 *
 * A free Supabase project is paused after about a week without any API
 * traffic, which takes the whole site's content down with it. Opening the
 * website is not enough on its own: the pages query Supabase from the
 * browser, so an uptime check that only fetches HTML never reaches the
 * database. This route runs the query on the server, so every call counts as
 * real project activity.
 *
 * It is scheduled from vercel.json (cron) and from the GitHub Actions
 * workflow in .github/workflows/supabase-keep-alive.yml.
 *
 * The read is deliberately tiny — one column, one row, from a table that is
 * public anyway — and it never returns row data.
 */
export default defineHandler(async (event) => {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  if (!url || !key) {
    event.res.status = 500;
    return { ok: false, error: "Supabase environment variables are missing." };
  }

  const startedAt = Date.now();
  try {
    const response = await fetch(`${url}/rest/v1/announcement_bar?select=id&limit=1`, {
      headers: { apikey: key, Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    const durationMs = Date.now() - startedAt;

    if (!response.ok) {
      event.res.status = 502;
      return {
        ok: false,
        status: response.status,
        durationMs,
        checkedAt: new Date().toISOString(),
      };
    }

    return {
      ok: true,
      status: response.status,
      durationMs,
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    event.res.status = 502;
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Supabase did not respond.",
      durationMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    };
  }
});
