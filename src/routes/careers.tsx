import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  GraduationCap,
  Clock3,
  Building2,
} from "lucide-react";
import type { ReactNode } from "react";
import { PageHero, PageShell } from "@/components/page-shell";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_MODE, getDemoRows } from "@/lib/demo-admin";

const HR_EMAIL = "hr@modtechworld.com";

type Vacancy = {
  id: string;
  title: string;
  openings: number;
  department: string;
  qualification: string;
  experience: string;
  responsibilities: string;
};

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Modtech Machine" },
      {
        name: "description",
        content:
          "Explore career opportunities at Modtech Machine and apply directly to our HR team.",
      },
      { property: "og:title", content: "Careers at Modtech Machine" },
    ],
  }),
  component: CareersPage,
});

function applyHref(title: string) {
  const subject = `Application for ${title}`;
  const body = `Dear HR Team,\n\nI would like to apply for the position of ${title}.\n\nPlease find my CV attached.\n\nName:\nPhone:\nEmail:\n\nThank you.`;
  return `mailto:${HR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function CareersPage() {
  const {
    data: vacancies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-career-vacancies"],
    queryFn: async (): Promise<Vacancy[]> => {
      if (DEMO_MODE) {
        return (getDemoRows("career_vacancies") as Vacancy[])
          .filter((vacancy) => vacancy.id)
          .sort((a, b) => String(a.title).localeCompare(String(b.title)));
      }
      const { data, error } = await supabase
        .from("career_vacancies")
        .select("id, title, openings, department, qualification, experience, responsibilities")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <PageShell>
      <PageHero
        title={
          <>
            Build what&apos;s next <span className="text-gradient-brand">with Modtech.</span>
          </>
        }
        subtitle="Explore opportunities across investment casting machinery, robotics and industrial automation."
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="openings-title">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 id="openings-title" className="font-display text-3xl font-bold sm:text-4xl">
                Current openings
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Choose a role and email your CV to our HR team. The Apply button opens your email
                app with the vacancy name in the subject.
              </p>
            </div>
            <a
              href={`mailto:${HR_EMAIL}`}
              className="inline-flex w-fit items-center gap-2 break-all rounded-full border border-brand/40 bg-brand/10 px-5 py-3 text-sm font-medium text-brand transition hover:bg-brand/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Mail className="h-4 w-4 shrink-0" /> {HR_EMAIL}
            </a>
          </div>

          {isLoading ? (
            <div className="mt-10 grid gap-4" aria-label="Loading vacancies">
              {[0, 1].map((item) => (
                <div key={item} className="h-28 animate-pulse rounded-2xl bg-card" />
              ))}
            </div>
          ) : vacancies.length > 0 ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {vacancies.map((vacancy) => (
                <article
                  key={vacancy.id}
                  className="group flex min-h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-brand/40 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand">
                        <Building2 className="h-3 w-3" />
                        {vacancy.department || "Modtech"}
                      </span>
                      <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                        {vacancy.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {vacancy.openings} {vacancy.openings === 1 ? "opening" : "openings"}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <VacancyDetail
                      icon={<GraduationCap className="h-4 w-4" />}
                      label="Education"
                      value={vacancy.qualification}
                    />
                    <VacancyDetail
                      icon={<Clock3 className="h-4 w-4" />}
                      label="Experience"
                      value={vacancy.experience}
                    />
                  </div>

                  {vacancy.responsibilities && (
                    <div className="mt-5 flex-1 border-t border-border pt-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                        Key responsibilities
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground/80">
                        {vacancy.responsibilities}
                      </p>
                    </div>
                  )}

                  <a
                    href={applyHref(vacancy.title)}
                    aria-label={`Apply for ${vacancy.title} by email`}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-foreground transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    Apply by email <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
              <BriefcaseBusiness className="mx-auto h-8 w-8 text-brand" />
              <h3 className="mt-4 font-display text-xl font-semibold">
                {isError ? "Openings are temporarily unavailable" : "No current openings"}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {isError
                  ? "Please contact our HR team for current opportunities."
                  : "Please check back soon. You can still email your CV to our HR team."}
              </p>
              <a
                href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent("Career enquiry")}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-foreground transition hover:-translate-y-0.5"
              >
                Email HR <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function VacancyDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl bg-secondary/45 p-3">
      <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="text-brand">{icon}</span>
        {label}
      </span>
      <span className="mt-1.5 block text-sm leading-relaxed text-foreground/85">{value}</span>
    </div>
  );
}
