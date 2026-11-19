import { createFileRoute, Link, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { MachineImage } from "@/components/machine-image";
import { MachineMediaFallback } from "@/components/machine-media-fallback";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import {
  functionalities,
  categoryMeta,
  modeData,
  machineDivision,
  machineSection,
  productSectionMeta,
  type Machine,
  type Mode,
  type ProductSection,
} from "@/content/site-data";
import { YouTubeBackground } from "@/components/youtube-background";
import { divisionVideoPreconnect, divisionVideos } from "@/content/division-media";
import { fetchPublishedMachines } from "@/lib/catalogue";

export const Route = createFileRoute("/machines")({
  validateSearch: (search: Record<string, unknown>): { division?: Mode } => ({
    division:
      search.division === "casting" || search.division === "robotics" ? search.division : undefined,
  }),
  beforeLoad: ({ location, search }) => {
    const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
    if (normalizedPath === "/machines" && !search.division) {
      throw redirect({ to: "/divisions", replace: true });
    }
  },
  head: () => ({
    meta: [
      { title: "Machines & Cells — Modtech Machine" },
      {
        name: "description",
        content:
          "Browse Modtech's investment-casting equipment, robotic packaging systems, palletizing, pick-and-place and vision solutions.",
      },
      { property: "og:title", content: "Modtech Machines & Cells" },
      {
        property: "og:description",
        content:
          "Wax injectors, shell-room systems, case handling, palletizing, pick-and-place and vision solutions.",
      },
    ],
    links: divisionVideoPreconnect,
  }),
  component: MachinesRoute,
});

const isCatalogueCutout = (machine: Machine) =>
  machine.image.includes("/productsimg/casting/") && machine.slug !== "automated-shelling-solution";

const usesLightBackdropBlend = (image: string) =>
  image.includes("c-frame-wax-injector") ||
  image.includes("manual-wax-injector") ||
  image.includes("wax-extruder-");

type CatalogueSection = {
  id: ProductSection;
  division: Mode;
  title: string;
  description: string;
  matches: (machine: Machine) => boolean;
};

const catalogueSectionOrder: ProductSection[] = [
  "wax-injection-machines",
  "wax-processing-conditioning",
  "wax-room-automation",
  "shelling-solutions",
  "ceramic-injectors",
  "fettling-equipment",
  "end-of-line-packaging",
  "flexible-industrial-automation",
];

const catalogueSections: CatalogueSection[] = catalogueSectionOrder.map((id) => ({
  id,
  division: productSectionMeta[id].division,
  title: productSectionMeta[id].label,
  description: productSectionMeta[id].description,
  matches: (machine) => machineSection(machine) === id,
}));

function MachinesPage() {
  useRevealOnScroll();
  const { division: activeDivision } = Route.useSearch();
  const { data: catalogue } = useQuery({
    queryKey: ["public-machines"],
    queryFn: fetchPublishedMachines,
  });
  const machines = catalogue ?? functionalities;

  const division = activeDivision ?? "casting";
  const divisionContent = modeData[division];
  const divisionVideo = divisionVideos[division];
  const divisionMachines = machines.filter((machine) => machineDivision(machine) === division);
  const sections = catalogueSections
    .filter((section) => section.division === division)
    .map((section) => ({
      ...section,
      machines: divisionMachines.filter(section.matches),
    }))
    .filter((section) => section.machines.length > 0);

  return (
    <PageShell>
      <section className="catalogue-hero on-dark relative isolate flex flex-col overflow-hidden bg-carbon lg:min-h-[38rem] lg:items-center lg:justify-center lg:px-8 lg:py-20">
        {/* The division's film leads the page as a 16:9 panel on phones, where
            a full-bleed backdrop could only show a narrow centre crop of it,
            and goes back behind the headline from lg up. */}
        <div className="relative z-0 aspect-video w-full overflow-hidden border-b border-white/10 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:border-b-0">
          <YouTubeBackground
            key={division}
            videoId={divisionVideo.videoId}
            title={divisionVideo.title}
            startAt={divisionVideo.startAt}
            priority
            // No fallbackImageSrc: the clip's own poster frame is used, so it
            // fills the hero and matches the first frame of the video. The
            // division still is a cut-out that would letterbox into a panel.
            fallbackImageClassName="object-cover"
            playingClassName="opacity-100 lg:opacity-80"
          />
          {/* Phones: a bottom fade that hands over to the copy below.
              Desktop: dark on the left so the headline stays readable,
              clearing to the right so the machine stays visible. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/15 to-transparent lg:bg-gradient-to-r lg:from-carbon lg:via-carbon/70 lg:to-carbon/15" />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-carbon via-carbon/20 to-carbon/45 lg:block" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-0 lg:py-0">
          <div className="reveal flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <Link
              to="/divisions"
              className="inline-flex min-h-11 items-center gap-2 text-foreground/60 transition hover:text-brand sm:min-h-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Divisions
            </Link>
          </div>

          <div className="mt-2 sm:mt-6 lg:mt-8">
            <div>
              <h1
                className="reveal max-w-4xl font-display text-[clamp(2.1rem,5.5vw,5.7rem)] font-bold leading-[0.98] tracking-[-0.035em] sm:leading-[0.96] sm:tracking-[-0.04em]"
                style={{ animationDelay: "110ms" }}
              >
                {categoryMeta[division].label}
                <span className="block text-gradient-brand">machines & systems.</span>
              </h1>
              <p
                className="reveal mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:mt-6 sm:text-base lg:text-lg"
                style={{ animationDelay: "170ms" }}
              >
                {divisionContent.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-background py-12 sm:py-16">
        <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
          <div className="reveal-on-scroll rounded-2xl border border-border bg-card/65 p-4 shadow-card backdrop-blur sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Layers3 className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold">Browse by product family</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Every {categoryMeta[division].label.toLowerCase()} product is shown below.
                </p>
              </div>
            </div>
            <Link
              to="/divisions"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition hover:border-brand/60 hover:text-brand sm:mt-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Change division
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <section aria-labelledby={`${division}-division-heading`}>
            <h2 id={`${division}-division-heading`} className="sr-only">
              {categoryMeta[division].label} product catalogue
            </h2>
            <div className="space-y-14 sm:space-y-20">
              {sections.map((section, sectionIndex) => (
                <section key={section.id} id={section.id} data-machine-section={section.id}>
                  <div className="reveal-on-scroll mb-6 grid gap-3 border-b border-border pb-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-5">
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {section.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {section.machines.length} products
                    </span>
                  </div>
                  <div className="cat-group grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {section.machines.map((machine, index) => (
                      <MachineCard
                        key={machine.slug}
                        machine={machine}
                        index={index}
                        priority={sectionIndex === 0}
                        activeDivision={activeDivision}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}

function MachineCard({
  machine,
  index,
  priority,
  activeDivision,
}: {
  machine: Machine;
  index: number;
  priority: boolean;
  activeDivision?: Mode;
}) {
  return (
    <Link
      to="/machines/$slug"
      params={{ slug: machine.slug }}
      className="cat-card reveal-on-scroll group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/45 hover:shadow-deep"
      data-reveal-delay={(index % 6) * 70}
      data-active={activeDivision === machineDivision(machine) ? "true" : "false"}
      data-machine-division={machineDivision(machine)}
      data-machine-slug={machine.slug}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden border-b border-border/70 ${
          isCatalogueCutout(machine) ? "bg-[#f6f7e5]" : "bg-secondary"
        }`}
      >
        {machine.image ? (
          <MachineImage
            src={machine.image}
            alt={machine.title}
            fallbackTitle={machine.title}
            fallbackCode={machine.code}
            fallbackCompact
            fallbackClassName="absolute inset-0"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className={`relative z-10 h-full w-full transition duration-700 group-hover:scale-[1.035] ${
              isCatalogueCutout(machine)
                ? `object-contain drop-shadow-[0_18px_18px_rgba(10,30,24,0.16)] ${machine.slug === "c-frame-wax-injector" ? "p-0 mix-blend-darken" : `p-5 sm:p-7 ${usesLightBackdropBlend(machine.image) ? "mix-blend-darken" : ""}`}`
                : "object-cover"
            }`}
          />
        ) : (
          <MachineMediaFallback
            title={machine.title}
            code={machine.code}
            compact
            className="absolute inset-0"
          />
        )}
        <div className="on-dark absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/70 bg-carbon/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand shadow-sm backdrop-blur">
            {machine.code}
          </span>
          <span className="cat-tag rounded-full border border-white/70 bg-carbon/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75 shadow-sm backdrop-blur transition">
            {categoryMeta[machineDivision(machine)].label}
          </span>
        </div>
        {(machine.images?.length ?? 0) > 1 && (
          <span className="on-dark absolute bottom-4 right-4 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-carbon shadow-sm backdrop-blur">
            {machine.images?.length} views
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className="line-clamp-2 font-display text-xl font-bold tracking-tight text-foreground sm:text-[1.35rem]">
          {machine.title}
        </h4>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {machine.desc}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand transition group-hover:gap-3">
          Know more <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

function MachinesRoute() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  return normalizedPath === "/machines" ? <MachinesPage /> : <Outlet />;
}
