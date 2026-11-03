import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Factory, Globe2, Wrench } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { HeroVideoBackground } from "@/components/hero-video-background";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { processSteps, stats, type Mode } from "@/content/site-data";
import { useSiteContent } from "@/lib/site-content";
import { automationImages } from "@/content/automation-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Modtech | Casting Machinery & Robotic Automation" },
      {
        name: "description",
        content:
          "Modtech engineers investment casting machinery and customised robotic automation systems for manufacturers worldwide.",
      },
      { property: "og:title", content: "Modtech | Casting Machinery & Robotic Automation" },
      {
        property: "og:description",
        content:
          "Investment casting machinery and customised robotic automation systems, engineered and built in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/modtech-home-poster.webp",
      },
    ],
  }),
  component: HomePage,
});

const advantages = [
  {
    Icon: Factory,
    title: "Indigenous development",
    text: "Machines, robot cells, controls and custom tooling developed by Modtech's engineering team in India.",
  },
  {
    Icon: Wrench,
    title: "Customised turnkey systems",
    text: "Complete solutions configured around the product, plant layout, throughput and safety requirements.",
  },
  {
    Icon: Globe2,
    title: "Worldwide support",
    text: "Ethernet-enabled remote support and service capability for installations across more than 45 countries.",
  },
];

function HomePage() {
  useRevealOnScroll();
  const content = useSiteContent("home");
  const processContent = useSiteContent("process");

  return (
    <PageShell>
      <section className="home-hero on-dark relative isolate overflow-hidden bg-carbon lg:-mt-[4.5rem] lg:min-h-svh lg:pt-[4.5rem]">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <HeroVideoBackground
            videoSrc="/modtech-home-hero.mp4"
            posterSrc="/modtech-home-poster.webp"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-carbon via-carbon/80 to-carbon/35 lg:bg-gradient-to-r lg:from-carbon lg:via-carbon/80 lg:to-carbon/20" />
        <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-t from-carbon via-transparent to-carbon/40 lg:block" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-10 lg:opacity-20" />

        <div className="mx-auto grid min-h-[34rem] max-w-7xl content-end gap-8 px-5 pb-8 pt-10 sm:min-h-[36rem] sm:gap-10 sm:px-8 sm:pb-10 sm:pt-12 lg:min-h-[calc(100svh-4.5rem)] lg:content-center lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end lg:pb-16 lg:pt-10 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 max-w-4xl">
            <h1
              className="reveal max-w-4xl font-display text-[clamp(2.2rem,7vw,6rem)] font-bold leading-[1.02] sm:leading-[0.98]"
              style={{ animationDelay: "80ms" }}
            >
              {content.title}
              <span className="mt-2 block text-brand">{content.accent}</span>
            </h1>
            <p
              className="reveal mt-5 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:mt-7 sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              {content.description}
            </p>
            <div
              className="reveal mt-7 flex flex-wrap gap-3 max-[420px]:flex-col sm:mt-8"
              style={{ animationDelay: "240ms" }}
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-6 font-mono text-xs uppercase tracking-wider max-[420px]:w-full"
              >
                <Link to="/divisions">
                  {content.primary_cta} <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-foreground/30 bg-carbon/50 px-6 font-mono text-xs uppercase tracking-wider backdrop-blur hover:border-brand hover:bg-carbon/80 hover:text-brand max-[420px]:w-full"
              >
                <Link to="/machines" search={{ division: "robotics" }}>
                  {content.secondary_cta} <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>

          <dl
            className="reveal grid grid-cols-3 border border-foreground/15 bg-carbon/40 lg:grid-cols-1 lg:bg-carbon/65 lg:backdrop-blur-md"
            style={{ animationDelay: "320ms" }}
          >
            {stats.slice(0, 3).map((item) => (
              <div
                key={item.label}
                className="min-w-0 border-r border-foreground/15 p-3 last:border-r-0 sm:p-5 lg:border-b lg:border-r-0 lg:last:border-b-0"
              >
                <dd className="font-display text-xl font-bold text-brand sm:text-3xl">
                  {item.value}
                </dd>
                <dt className="mt-1 break-words font-mono text-[9px] uppercase leading-snug tracking-[0.06em] text-foreground/70 sm:tracking-[0.18em]">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-background px-5 py-12 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <header className="reveal-on-scroll border-b border-border pb-5 sm:pb-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
              Our divisions
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-[1.75rem] font-bold tracking-tight sm:text-5xl">
              Precision foundry machinery. Factory automation.
            </h2>
          </header>

          <div className="mt-7 space-y-12 sm:mt-12 sm:space-y-20 lg:space-y-24">
            <DivisionChapter
              title="Investment Casting Machinery"
              description="Equipment for wax preparation and injection, ceramic shell building and foundry processing, engineered for repeatable production and dependable uptime."
              image={automationImages.casting}
              alt="Investment casting machinery on the factory floor"
              division="casting"
              linkLabel="View casting machines"
              points={[
                "Wax injectors",
                "Wax conditioning systems",
                "Slurry equipment",
                "Rain sanders & shelling cells",
              ]}
            />
            <DivisionChapter
              title="Robotics & Automation"
              description="Custom robot cells for packaging, palletizing, pick-and-place and vision inspection, built around each product, process and factory layout."
              image={automationImages.casePacker}
              alt="Robotic automation cell in production"
              division="robotics"
              linkLabel="Explore automation"
              points={[
                "Robotic case erecting & packing",
                "Robotic palletizing",
                "Pick & place",
                "Vision systems",
              ]}
              reverse
            />
          </div>
        </div>
      </section>
      <section className="bg-background px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="reveal-on-scroll grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
            <div>
              <h2 className="max-w-lg font-display text-[1.75rem] font-bold leading-tight sm:text-4xl lg:text-5xl">
                Engineering that stays accountable.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                One engineering partner, from first layout through commissioning and after-sales
                support.
              </p>
            </div>
            <ol className="border-t border-border">
              {advantages.map(({ Icon, title, text }) => (
                <li
                  key={title}
                  className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2.5 border-b border-border py-3.5 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-4 sm:py-5"
                >
                  <div className="pt-0.5">
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold sm:text-xl">{title}</h3>
                    <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="process"
        className="on-dark relative isolate scroll-mt-24 overflow-hidden border-y border-foreground/10 bg-carbon px-5 py-7 sm:px-8 sm:py-10 lg:py-12"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-[0.08]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand/[0.08] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)] lg:gap-0">
          <header className="reveal-on-scroll flex min-w-0 flex-col lg:border-r lg:border-foreground/20 lg:pr-12 xl:pr-16">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                {processContent.eyebrow.replace(/^\/\s*/, "")}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,7.5vw,3.7rem)] font-bold leading-[0.98] tracking-[-0.035em]">
                {processContent.title}
                <span className="block text-gradient-brand">{processContent.accent}</span>
              </h2>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/65 sm:mt-4 sm:text-base">
              {processContent.description}
            </p>
            <Button
              asChild
              className="mt-4 h-11 w-full justify-between px-5 sm:mt-5 sm:w-fit sm:justify-center lg:mt-auto lg:translate-y-1"
            >
              <Link to="/contact" search={{ machine: undefined }}>
                Start a project <ArrowUpRight />
              </Link>
            </Button>
          </header>

          <ol
            className="relative border-t border-foreground/15 before:pointer-events-none before:absolute before:bottom-7 before:left-[0.4375rem] before:top-7 before:w-px before:bg-gradient-to-b before:from-brand/20 before:via-brand/80 before:to-brand/20 before:content-[''] lg:border-t-0 lg:pl-12 lg:before:left-[3.4375rem] xl:pl-16 xl:before:left-[4.4375rem]"
            aria-label="Engineering delivery process"
          >
            {processSteps.map((step, index) => (
              <li
                key={step.code}
                className="reveal-on-scroll group relative grid min-h-[4.25rem] grid-cols-[1.75rem_minmax(0,1fr)_2.25rem] items-center gap-3 border-b border-foreground/15 py-3 sm:min-h-[5.2rem] sm:grid-cols-[2.25rem_minmax(7.5rem,0.58fr)_minmax(0,1fr)_2.75rem] sm:gap-5 sm:py-4 lg:min-h-[5.35rem] lg:grid-cols-[2.25rem_minmax(7rem,0.55fr)_minmax(0,1fr)_2.75rem]"
                data-reveal-delay={index * 70}
              >
                <span className="relative z-10 grid h-4 w-4 place-items-center rounded-full border border-brand/70 bg-carbon shadow-[0_0_0_4px_var(--color-carbon),0_0_18px_color-mix(in_oklab,var(--brand)_45%,transparent)] sm:h-5 sm:w-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <span className="sr-only">Step {step.code}</span>
                </span>
                <div className="min-w-0 sm:contents">
                  <h3 className="font-display text-base font-bold text-foreground sm:text-xl">
                    {step.name}
                  </h3>
                  <p className="mt-0.5 text-xs leading-snug text-foreground/60 sm:mt-0 sm:text-[15px] sm:leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <step.Icon
                  className="h-5 w-5 justify-self-end text-brand/75 transition duration-300 group-hover:scale-110 group-hover:text-brand sm:h-7 sm:w-7"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}

function DivisionChapter({
  title,
  description,
  image,
  alt,
  division,
  linkLabel,
  points,
  reverse = false,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  division: Mode;
  linkLabel: string;
  points: string[];
  reverse?: boolean;
}) {
  return (
    <article className="reveal-on-scroll grid gap-5 sm:gap-8 lg:grid-cols-12 lg:items-center">
      <div
        className={`home-image-reveal relative aspect-[16/10] min-h-0 overflow-hidden md:aspect-auto md:min-h-[32rem] lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
      >
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="home-machine-image absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-10" : "lg:pl-10"}`}>
        <h3 className="font-display text-2xl font-bold sm:text-4xl lg:text-5xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
          {description}
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 max-[360px]:grid-cols-1 sm:mt-6 sm:gap-3 lg:grid-cols-1">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-xs leading-snug sm:gap-3 sm:text-sm"
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand sm:h-4 sm:w-4" />
              {point}
            </li>
          ))}
        </ul>
        <Button
          asChild
          variant="link"
          className="mt-5 h-auto p-0 font-mono text-[11px] uppercase tracking-wider sm:mt-7 sm:text-xs"
        >
          <Link to="/machines" search={{ division }}>
            {linkLabel} <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
