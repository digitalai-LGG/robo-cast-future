import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  FileText,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { PageShell } from "@/components/page-shell";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { supabase } from "@/integrations/supabase/client";
import { careerVacancies, type Vacancy } from "@/content/careers";
import { companyContact } from "@/content/automation-data";
import { presenceCountries } from "@/content/global-presence";
import { DEMO_MODE, getDemoRows } from "@/lib/demo-admin";

const HR_EMAIL = "hr@modtechworld.com";
const ALL_DEPARTMENTS = "All departments";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Modtech Machine" },
      {
        name: "description",
        content:
          "Open engineering, design, purchase, service and quality roles at Modtech Machines in Ahmedabad. Apply by emailing your CV to our HR team.",
      },
      { property: "og:title", content: "Careers at Modtech Machine" },
      {
        property: "og:description",
        content:
          "Design, robotics, service, purchase, testing and quality openings at our Ahmedabad facility.",
      },
    ],
  }),
  component: CareersPage,
});

/**
 * Opens the candidate's mail app with the role already in the subject line, so
 * HR can route the CV without having to ask which position it is for.
 */
function applyHref(title: string) {
  const subject = `Application — ${title} | Modtech Machines`;
  const body = [
    "Dear HR Team,",
    "",
    `I would like to apply for the position of ${title}.`,
    "",
    "Name:",
    "Phone:",
    "Total experience:",
    "Current location:",
    "Notice period:",
    "",
    "My CV is attached with this email.",
    "",
    "Thank you,",
  ].join("\n");
  return `mailto:${HR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const generalApplicationHref = `mailto:${HR_EMAIL}?subject=${encodeURIComponent(
  "General application | Modtech Machines",
)}&body=${encodeURIComponent(
  [
    "Dear HR Team,",
    "",
    "I would like to be considered for suitable openings at Modtech Machines.",
    "",
    "Name:",
    "Phone:",
    "Department of interest:",
    "Total experience:",
    "",
    "My CV is attached with this email.",
    "",
    "Thank you,",
  ].join("\n"),
)}`;

async function loadVacancies(): Promise<Vacancy[]> {
  if (DEMO_MODE) {
    const rows = (getDemoRows("career_vacancies") as Vacancy[]).filter((vacancy) => vacancy.id);
    return rows.length > 0 ? rows : careerVacancies;
  }

  try {
    const { data, error } = await supabase
      .from("career_vacancies")
      .select("id, title, openings, department, qualification, experience, responsibilities")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    // The CMS table is optional. Until HR publishes rows there, the bundled
    // requisition list is what candidates should see — never an empty page.
    return data && data.length > 0 ? (data as Vacancy[]) : careerVacancies;
  } catch {
    return careerVacancies;
  }
}

function CareersPage() {
  useRevealOnScroll();
  const [department, setDepartment] = useState(ALL_DEPARTMENTS);

  // The bundled requisition list seeds the cache so the server renders real
  // roles (and search engines index them) instead of an empty skeleton; the
  // published CMS rows replace it as soon as the query resolves.
  const { data: vacancies } = useQuery({
    queryKey: ["public-career-vacancies"],
    queryFn: loadVacancies,
    initialData: careerVacancies,
  });

  const departments = useMemo(() => {
    const counts = new Map<string, number>();
    for (const vacancy of vacancies) {
      const name = vacancy.department || "Modtech";
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return [
      { name: ALL_DEPARTMENTS, count: vacancies.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ];
  }, [vacancies]);

  const visibleVacancies = useMemo(
    () =>
      department === ALL_DEPARTMENTS
        ? vacancies
        : vacancies.filter((vacancy) => (vacancy.department || "Modtech") === department),
    [vacancies, department],
  );

  const totalOpenings = useMemo(
    () => vacancies.reduce((sum, vacancy) => sum + (Number(vacancy.openings) || 0), 0),
    [vacancies],
  );

  return (
    <PageShell>
      <section className="on-dark relative isolate overflow-hidden bg-carbon px-5 py-14 sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-25" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-brand/15 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <h1 className="reveal max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Build what&apos;s next
            <span className="block text-gradient-brand">with Modtech.</span>
          </h1>
          <p
            className="reveal mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
            style={{ animationDelay: "110ms" }}
          >
            We design, build and commission investment casting machinery and robotic automation
            under one roof in Ahmedabad. Pick the role that matches your experience and email your
            CV to our HR team.
          </p>

          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "170ms" }}
          >
            <a
              href="#openings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-foreground shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
            >
              See open roles <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={generalApplicationHref}
              className="inline-flex items-center justify-center gap-2 break-all rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 backdrop-blur transition hover:border-brand/55 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Mail className="h-4 w-4 shrink-0" /> {HR_EMAIL}
            </a>
          </div>

          <dl
            className="reveal mt-10 grid gap-3 sm:grid-cols-3"
            style={{ animationDelay: "230ms" }}
          >
            <HeroStat
              icon={<BriefcaseBusiness className="h-4 w-4" />}
              value={String(totalOpenings)}
              label={totalOpenings === 1 ? "Open position" : "Open positions"}
            />
            <HeroStat
              icon={<Users className="h-4 w-4" />}
              value={String(Math.max(departments.length - 1, 0))}
              label="Teams hiring"
            />
            <HeroStat
              icon={<Globe2 className="h-4 w-4" />}
              value={`${presenceCountries.length} countries`}
              label="Where our machines run"
            />
          </dl>
        </div>
      </section>

      <section
        id="openings"
        aria-labelledby="openings-title"
        className="scroll-mt-20 bg-background px-5 py-14 sm:scroll-mt-24 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="reveal-on-scroll flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <h2 id="openings-title" className="font-display text-3xl font-bold sm:text-4xl">
                Current openings
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Every role is based at our Ahmedabad facility. Apply directly from any card — the
                button opens your email app with the position already in the subject line.
              </p>
            </div>
            <a
              href="#apply"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition hover:border-brand/60 hover:text-brand"
            >
              How to apply <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {departments.length > 2 && (
            <div
              className="reveal-on-scroll mt-6 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter openings by department"
            >
              {departments.map((item) => {
                const active = item.name === department;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setDepartment(item.name)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      active
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-brand/55 hover:text-brand"
                    }`}
                  >
                    {item.name}
                    <span
                      className={active ? "text-brand-foreground/70" : "text-muted-foreground/70"}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {visibleVacancies.length > 0 ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {visibleVacancies.map((vacancy, index) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
              <BriefcaseBusiness className="mx-auto h-8 w-8 text-brand" />
              <h3 className="mt-4 font-display text-xl font-semibold">No openings in this team</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Choose another department, or send us your CV and we will keep it on file for the
                next requirement.
              </p>
              <a
                href={generalApplicationHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground transition hover:-translate-y-0.5"
              >
                Send your CV <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      <section
        id="apply"
        aria-labelledby="apply-title"
        className="scroll-mt-20 border-t border-border bg-carbon-2 px-5 py-14 sm:scroll-mt-24 sm:px-8 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-14">
          <div className="reveal-on-scroll">
            <h2 id="apply-title" className="font-display text-3xl font-bold sm:text-4xl">
              How to apply
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Applications are handled directly by our HR team — there is no portal to sign up for.
              Three steps, and you are done.
            </p>

            <ol className="mt-8 space-y-4">
              <ApplyStep
                step="01"
                title="Pick your role"
                description="Find the position that matches your experience in the list above and press Apply. Your email app opens with the role in the subject line."
              />
              <ApplyStep
                step="02"
                title="Attach your CV"
                description="Send a PDF or Word CV with your total experience, current location, current and expected role, and notice period."
              />
              <ApplyStep
                step="03"
                title="We review and call you"
                description="Shortlisted candidates are contacted by our HR team for a technical discussion. Compensation is discussed at that stage."
              />
            </ol>

            <div className="mt-8 rounded-2xl border border-border bg-card/70 p-5 sm:p-6">
              <p className="flex items-center gap-2 font-display text-sm font-semibold">
                <FileText className="h-4 w-4 text-brand" /> Before you send
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>Keep the role name in the subject line so your CV reaches the right team.</li>
                <li>Mention the department if you are open to more than one position.</li>
                <li>
                  Every position listed here requires a degree; relevant industry experience is
                  noted on each card.
                </li>
              </ul>
            </div>
          </div>

          <aside className="reveal-on-scroll rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              HR team
            </p>
            <h3 className="mt-3 font-display text-xl font-bold">Send your CV</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Write to our HR team for any role, or for a general application.
            </p>

            <a
              href={generalApplicationHref}
              className="mt-5 flex items-center gap-3 rounded-xl border border-brand/35 bg-brand/10 p-4 transition hover:border-brand/60 hover:bg-brand/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
                <Mail className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  Email
                </span>
                <span className="mt-0.5 block break-all text-sm font-semibold text-brand">
                  {HR_EMAIL}
                </span>
              </span>
            </a>

            <div className="mt-4 space-y-3 border-t border-border pt-4">
              <ContactLine
                icon={<Phone className="h-4 w-4" />}
                label="Reception"
                value={companyContact.phone}
                href={`tel:${companyContact.phone.replace(/\s/g, "")}`}
              />
              <ContactLine
                icon={<MapPin className="h-4 w-4" />}
                label="Office"
                value={companyContact.address}
              />
            </div>

            <a
              href={generalApplicationHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <Send className="h-3.5 w-3.5" /> General application
            </a>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function HeroStat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur">
      <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/55">
        <span className="text-brand">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl font-bold tracking-tight">{value}</dd>
    </div>
  );
}

function VacancyCard({ vacancy, index }: { vacancy: Vacancy; index: number }) {
  return (
    <article
      className="reveal-on-scroll group flex min-h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/45 hover:shadow-deep sm:p-6"
      data-reveal-delay={(index % 6) * 60}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">
          <Building2 className="h-3 w-3" />
          {vacancy.department || "Modtech"}
        </span>
        <span className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
          {vacancy.openings} {vacancy.openings === 1 ? "opening" : "openings"}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight text-foreground">
        {vacancy.title}
      </h3>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
          <p className="mt-2 text-sm leading-6 text-foreground/80">{vacancy.responsibilities}</p>
        </div>
      )}

      <a
        href={applyHref(vacancy.title)}
        aria-label={`Apply for ${vacancy.title} by email`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground transition group-hover:gap-3 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        Apply by email <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

function VacancyDetail({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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

function ApplyStep({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4 rounded-2xl border border-border bg-card/60 p-5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 font-mono text-[11px] font-bold text-brand">
        {step}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}

function ContactLine({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block text-sm leading-relaxed text-foreground/85">{value}</span>
      </span>
    </>
  );

  return href ? (
    <a href={href} className="flex gap-3 transition hover:text-brand">
      {content}
    </a>
  ) : (
    <p className="flex gap-3">{content}</p>
  );
}
