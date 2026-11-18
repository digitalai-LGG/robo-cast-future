import { presenceCountries } from "@/content/global-presence";

/**
 * Continuously scrolling strip of the countries Modtech names publicly.
 * The second pass is a duplicate that keeps the loop seamless, so it is
 * hidden from assistive technology.
 */
export function PresenceMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`presence-rail overflow-hidden ${className}`}>
      <div className="presence-marquee flex w-max items-center">
        {[0, 1].map((pass) => (
          <div
            key={pass}
            className="flex shrink-0 items-center gap-3 pr-3"
            aria-hidden={pass === 1}
          >
            {presenceCountries.map((country) => (
              <span
                key={`${pass}-${country.code}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-foreground/12 bg-carbon/50 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/65 backdrop-blur-md"
              >
                <img
                  src={country.flag}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width="36"
                  height="24"
                  className="h-3.5 w-5 rounded-[2px] ring-1 ring-white/20"
                />
                {country.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
