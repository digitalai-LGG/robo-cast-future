import type { ImgHTMLAttributes } from "react";
import { useState } from "react";
import { MachineMediaFallback } from "@/components/machine-media-fallback";

type MachineImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fallbackTitle: string;
  fallbackCode?: string;
  fallbackCompact?: boolean;
  fallbackClassName?: string;
};

/**
 * Renders verified machine photography without placing fallback artwork behind
 * transparent product cut-outs. The fallback is shown only when the browser
 * reports a real image loading or decoding failure.
 */
export function MachineImage({
  src,
  fallbackTitle,
  fallbackCode,
  fallbackCompact = false,
  fallbackClassName = "",
  onError,
  ...imageProps
}: MachineImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <MachineMediaFallback
        title={fallbackTitle}
        code={fallbackCode}
        compact={fallbackCompact}
        className={fallbackClassName}
      />
    );
  }

  return (
    <img
      {...imageProps}
      src={src}
      onError={(event) => {
        onError?.(event);
        setFailedSrc(src);
      }}
    />
  );
}
