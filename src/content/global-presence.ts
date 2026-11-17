/**
 * Countries Modtech names publicly on modtechworld.com — the flagged markers on the
 * Global Presence map plus the three countries that have a listed local representative.
 * `base` marks a Modtech location, `market` an installed-base / served market.
 */
export type PresenceKind = "base" | "market";

export type PresenceCountry = {
  code: string;
  name: string;
  flag: string;
  kind: PresenceKind;
  note: string;
};

export const presenceCountries: PresenceCountry[] = [
  {
    code: "IN",
    name: "India",
    flag: "/flags/india.svg",
    kind: "base",
    note: "Headquarters & manufacturing",
  },
  {
    code: "US",
    name: "United States",
    flag: "/flags/united-states.svg",
    kind: "base",
    note: "Modtech location",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "/flags/united-kingdom.svg",
    kind: "base",
    note: "Modtech location",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "/flags/germany.svg",
    kind: "market",
    note: "Local representative",
  },
  {
    code: "RU",
    name: "Russia",
    flag: "/flags/russia.svg",
    kind: "market",
    note: "Local representative",
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "/flags/south-korea.svg",
    kind: "market",
    note: "Local representative",
  },
  { code: "FR", name: "France", flag: "/flags/france.svg", kind: "market", note: "Key market" },
  { code: "IT", name: "Italy", flag: "/flags/italy.svg", kind: "market", note: "Key market" },
  { code: "PL", name: "Poland", flag: "/flags/poland.svg", kind: "market", note: "Key market" },
  {
    code: "CZ",
    name: "Czech Republic",
    flag: "/flags/czech-republic.svg",
    kind: "market",
    note: "Key market",
  },
  { code: "RO", name: "Romania", flag: "/flags/romania.svg", kind: "market", note: "Key market" },
  { code: "TR", name: "Türkiye", flag: "/flags/turkey.svg", kind: "market", note: "Key market" },
  { code: "CN", name: "China", flag: "/flags/china.svg", kind: "market", note: "Key market" },
  { code: "JP", name: "Japan", flag: "/flags/japan.svg", kind: "market", note: "Key market" },
  { code: "BR", name: "Brazil", flag: "/flags/brazil.svg", kind: "market", note: "Key market" },
];

export const presenceBases = presenceCountries.filter((country) => country.kind === "base");
