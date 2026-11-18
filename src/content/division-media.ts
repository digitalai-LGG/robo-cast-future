import type { Mode } from "@/content/site-data";

/**
 * Background footage for each division.
 *
 * Shared by the division chooser and the machine catalogue hero, so opening a
 * division carries the same film through from the card the visitor clicked.
 *
 * `startAt` skips each clip's intro so the first visible frame is the machine
 * running, not a title card.
 */
export const divisionVideos = {
  casting: {
    videoId: "Ah5mS5PDqwQ",
    title: "Modtech AutoMode — Fully Automatic Wax Injection Machine",
    startAt: 0,
  },
  robotics: {
    videoId: "bd5fXFXLylE",
    title: "Future of Smart Factory in India — Modtech Automation",
    startAt: 15,
  },
} satisfies Record<Mode, { videoId: string; title: string; startAt: number }>;

/** Preconnect hints for routes that mount a division background video. */
export const divisionVideoPreconnect = [
  { rel: "preconnect", href: "https://www.youtube.com" },
  { rel: "preconnect", href: "https://www.youtube-nocookie.com" },
  { rel: "preconnect", href: "https://i.ytimg.com" },
];
