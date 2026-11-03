import { Factory, ImageOff } from "lucide-react";

type MachineMediaFallbackProps = {
  title: string;
  code?: string;
  compact?: boolean;
  className?: string;
};

export function MachineMediaFallback({
  title,
  code,
  compact = false,
  className = "",
}: MachineMediaFallbackProps) {
  return (
    <div
      className={`relative grid h-full w-full place-items-center overflow-hidden bg-[#eef3e9] text-[#10241d] ${className}`}
      aria-label={`${title} product media pending`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(49,208,165,0.24),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full border border-[#1d7258]/15" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-[#1d7258]/20" />

      <div
        className={`relative flex max-w-sm flex-col items-center text-center ${compact ? "gap-2 p-5" : "gap-4 p-8"}`}
      >
        <span
          className={`grid place-items-center rounded-2xl border border-[#1d7258]/20 bg-white/75 text-[#1d7258] shadow-[0_16px_34px_rgba(15,66,51,0.14)] ${compact ? "h-12 w-12" : "h-16 w-16"}`}
        >
          {compact ? <ImageOff className="h-5 w-5" /> : <Factory className="h-7 w-7" />}
        </span>
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1d7258]">
            {code ? `${code} · ` : ""}Product media pending
          </p>
          {!compact && (
            <>
              <p className="mt-2 font-display text-xl font-bold leading-tight">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#38554a]">
                Verified specifications, features and applications are available below.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
