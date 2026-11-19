import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Factory } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { YouTubeBackground } from "@/components/youtube-background";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { divisions, functionalities, machineDivision, type Mode } from "@/content/site-data";
import { divisionVideoPreconnect, divisionVideos } from "@/content/division-media";
import { automationImages } from "@/content/automation-data";
import { useSiteContent } from "@/lib/site-content";
import { fetchPublishedMachines } from "@/lib/catalogue";

export const Route = createFileRoute("/divisions")({
  head: () => ({
    meta: [
      { title: "Divisions — Robotics & Investment Casting | Modtech Machine" },
      {
        name: "description",
        content:
          "Choose between Modtech's Robotics & Automation and Investment Casting divisions, then explore every machine in that portfolio.",
      },
      { property: "og:title", content: "Modtech Divisions — Robotics & Casting" },
      {
        property: "og:description",
        content: "Choose a division to explore its complete machine portfolio.",
      },
    ],
    links: divisionVideoPreconnect,
  }),
  component: DivisionsPage,
});

const divisionIcons = {
  casting: Factory,
  robotics: Bot,
} satisfies Record<Mode, typeof Factory>;

function DivisionsPage() {
  useRevealOnScroll();
  const content = useSiteContent("divisions");
  const description = content.description.startsWith("Each division ships a complete portfolio")
    ? "Choose a division to see its machines and systems."
    : content.description;
  const { data: catalogue } = useQuery({
    queryKey: ["public-machines"],
    queryFn: fetchPublishedMachines,
  });
  const machines = catalogue ?? functionalities;

  return (
    <PageShell>
      <section className="division-hero on-dark relative isolate overflow-hidden bg-carbon px-5 py-10 sm:px-8 sm:py-14">
        <div className="pointer-events-none absolute inset-0 -z-20">
          <img
            src={automationImages.robot6Axis}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/95 to-carbon/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/30" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-25" />
        <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <h1 className="reveal max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Choose your division.
          </h1>
          <p className="reveal mt-3 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Explore investment casting machines or robotics and automation systems.
          </p>
        </div>
      </section>

      <section
        id="division-selector"
        className="relative scroll-mt-[calc(var(--header-h)_+_1.5rem)] bg-background px-5 py-10 sm:px-8 sm:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <header className="reveal-on-scroll mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-2xl font-bold leading-tight sm:text-4xl">
                {content.title} <span className="text-brand">{content.accent}</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
              {description}
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            {divisions.map((division, index) => {
              const mode = division.category as Mode;
              const Icon = divisionIcons[mode];
              const backgroundVideo = divisionVideos[mode];
              const machineCount = machines.filter(
                (machine) => machineDivision(machine) === mode,
              ).length;

              return (
                <Link
                  key={division.code}
                  to="/machines"
                  search={{ division: mode }}
                  aria-label={`Open all ${division.title} machines`}
                  className="division-choice-card on-dark reveal-on-scroll group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-[1.75rem] sm:focus-visible:ring-offset-4 lg:min-h-[34rem]"
                  data-reveal-delay={index * 140}
                >
                  {/* Phones get the film as a 16:9 panel at the top of the
                      card: a tall, narrow container would only ever show a
                      centre crop of the footage, so the machine itself was
                      never visible. From lg the same clip goes back behind the
                      copy, full bleed, exactly as before. */}
                  <div className="relative z-0 aspect-video w-full overflow-hidden border-b border-white/10 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:border-b-0">
                    <YouTubeBackground
                      videoId={backgroundVideo.videoId}
                      title={backgroundVideo.title}
                      className="division-choice-media"
                      fallbackImageSrc={division.image}
                      fallbackClassName={
                        mode === "casting"
                          ? "bg-[#edf2ee] bg-[radial-gradient(circle_at_50%_35%,rgba(49,208,165,0.22),transparent_55%)]"
                          : ""
                      }
                      fallbackImageClassName={
                        mode === "casting"
                          ? "object-contain p-4 drop-shadow-[0_24px_28px_rgba(10,35,27,0.24)] sm:p-9"
                          : "object-cover"
                      }
                      startAt={backgroundVideo.startAt}
                      // Full strength where the video is the subject; dimmed
                      // on desktop, where the headline sits on top of it.
                      playingClassName="opacity-100 lg:opacity-80"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/10 to-transparent lg:from-carbon lg:via-carbon/50 lg:to-carbon/15" />
                    <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-carbon/65 via-transparent to-transparent lg:block" />
                    <div className="division-choice-grid pointer-events-none absolute inset-0 bg-grid opacity-0" />
                    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-carbon/65 text-brand shadow-lg backdrop-blur-md lg:hidden">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col justify-between gap-5 p-5 sm:p-7 lg:gap-0 lg:p-8">
                    <div className="hidden items-start justify-between gap-4 lg:flex">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-carbon/55 text-brand shadow-lg backdrop-blur-md">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <div>
                      <h3 className="max-w-lg font-display text-[1.7rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {division.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
                        {division.description}
                      </p>

                      <ul
                        className="mt-4 flex flex-wrap gap-2 sm:mt-6"
                        aria-label={`${division.title} capabilities`}
                      >
                        {division.points.slice(0, 4).map((point) => (
                          <li
                            key={point}
                            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70 backdrop-blur sm:px-3 sm:tracking-[0.14em]"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/15 pt-4 sm:mt-7 sm:pt-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 sm:tracking-[0.2em]">
                          {machineCount} machines & systems
                        </span>
                        <span className="division-choice-cta inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground shadow-glow sm:min-h-0 sm:px-5 sm:py-2.5">
                          Explore all <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
