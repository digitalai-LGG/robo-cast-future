const base = new URL(process.argv[2] ?? "http://127.0.0.1:4180");

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

const listingPath = "/machines?division=casting";
const retainedMachineChecks = {
  "/machines/vertical-sander": {
    title: "Vertical Sander",
    image: "/productsimg/casting/gallery/rain-sander/front.webp?v=2",
    rangeKind: "machines",
  },
  "/machines/slurry-preparation-tank": {
    title: "Slurry Preparation Tank",
    image: "/productsimg/casting/gallery/slurry-mixer/front.webp?v=2",
    rangeKind: "machines",
  },
};
const retiredMachinePaths = [
  "/machines/shell-drying-conveyor",
  "/machines/stucco-elevator",
  "/machines/shell-hangers",
  "/machines/ic-series-robot",
  "/machines/robot-gripper",
];
const listingResponse = await fetch(new URL(listingPath, base));
if (!listingResponse.ok) throw new Error(`Machine listing returned ${listingResponse.status}.`);
const listingHtml = await listingResponse.text();
const listingFallbackCount = (listingHtml.match(/Product media pending/g) ?? []).length;
const discovered = [...listingHtml.matchAll(/data-machine-slug="([^"]+)"/g)].map(
  (match) => `/machines/${match[1]}`,
);
const listingDivisions = [...listingHtml.matchAll(/data-machine-division="([^"]+)"/g)].map(
  (match) => match[1],
);
const divisionCounts = Object.fromEntries(
  ["casting", "robotics"].map((division) => [
    division,
    listingDivisions.filter((item) => item === division).length,
  ]),
);
const pathSet = new Set(discovered);
let paths = [...pathSet].sort();
const duplicateLinks = discovered.length - paths.length;
const results = [];
const issues = [];
if (
  listingDivisions.length !== paths.length ||
  divisionCounts.casting !== 22 ||
  divisionCounts.robotics !== 0
) {
  issues.push({
    path: listingPath,
    expectedDivisions: { casting: 22, robotics: 0 },
    divisionCounts,
    classifiedCards: listingDivisions.length,
  });
}

const retainedListingPaths = Object.keys(retainedMachineChecks);
const retainedMachinesListed = retainedListingPaths.every((path) => pathSet.has(path));
const retiredMachinesAbsent = retiredMachinePaths.every((path) => !pathSet.has(path));
if (!retainedMachinesListed || !retiredMachinesAbsent) {
  issues.push({
    path: listingPath,
    expectedRetainedMachines: retainedListingPaths,
    retainedMachinesListed,
    expectedRetiredMachinesAbsent: retiredMachinePaths,
    retiredMachinesAbsent,
  });
}
if (listingFallbackCount > 0) {
  issues.push({
    path: listingPath,
    expected: "verified product images without fallback artwork behind them",
    listingFallbackCount,
  });
}
const checkedImages = new Map();
const uniqueImages = new Set();

const redirectResponse = await fetch(new URL("/machines", base), { redirect: "manual" });
const redirectLocation = redirectResponse.headers.get("location");
const redirectsToDivisions =
  [301, 302, 303, 307, 308].includes(redirectResponse.status) &&
  redirectLocation !== null &&
  new URL(redirectLocation, base).pathname === "/divisions";
if (!redirectsToDivisions) {
  issues.push({
    path: "/machines",
    expected: "redirect to /divisions",
    status: redirectResponse.status,
    location: redirectLocation,
  });
}

const divisionNavigation = {};
for (const page of ["/", "/divisions"]) {
  const response = await fetch(new URL(page, base));
  const html = await response.text();
  const links = {
    casting: html.includes('href="/machines?division=casting"'),
    robotics: html.includes('href="/machines?division=robotics"'),
  };
  const currentCastingTerminology =
    html.includes("Vertical sanders") &&
    html.includes("Slurry preparation") &&
    !html.includes("Rain sanders");
  const valid = response.ok && links.casting && links.robotics && currentCastingTerminology;
  divisionNavigation[page] = {
    valid,
    status: response.status,
    links,
    currentCastingTerminology,
  };
  if (!valid) {
    issues.push({
      path: page,
      expected: "links to both filtered catalogues and current casting-machine terminology",
      links,
      currentCastingTerminology,
    });
  }
}

const filteredCatalogueChecks = {};
const expectedFilteredCatalogues = {
  casting: {
    products: 22,
    sections: [
      "wax-injection-machines",
      "wax-processing-conditioning",
      "wax-room-automation",
      "shelling-solutions",
      "ceramic-injectors",
      "fettling-equipment",
    ],
  },
  robotics: {
    products: 5,
    sections: ["end-of-line-packaging", "flexible-industrial-automation"],
  },
};

for (const [division, expected] of Object.entries(expectedFilteredCatalogues)) {
  const response = await fetch(new URL(`/machines?division=${division}`, base));
  const html = await response.text();
  const productLinks = [
    ...new Set(
      [...html.matchAll(/data-machine-slug="([^"]+)"/g)].map((match) => `/machines/${match[1]}`),
    ),
  ];
  productLinks.forEach((path) => pathSet.add(path));
  const cardDivisions = [...html.matchAll(/data-machine-division="([^"]+)"/g)].map(
    (match) => match[1],
  );
  const sections = [...html.matchAll(/data-machine-section="([^"]+)"/g)].map((match) => match[1]);
  const valid =
    response.ok &&
    productLinks.length === expected.products &&
    cardDivisions.length === expected.products &&
    cardDivisions.every((item) => item === division) &&
    expected.sections.length === sections.length &&
    expected.sections.every((item) => sections.includes(item));
  filteredCatalogueChecks[division] = {
    valid,
    status: response.status,
    products: productLinks.length,
    cardDivisions: Object.fromEntries(
      [...new Set(cardDivisions)].map((item) => [
        item,
        cardDivisions.filter((value) => value === item).length,
      ]),
    ),
    sections,
  };
  if (!valid) {
    issues.push({
      path: `/machines?division=${division}`,
      expected,
      ...filteredCatalogueChecks[division],
    });
  }
}

paths = [...pathSet].sort();

for (const path of paths) {
  const response = await fetch(new URL(path, base));
  const html = await response.text();
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() ?? "");
  const heading = decode(
    html
      .match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]
      ?.replace(/<[^>]+>/g, "")
      .trim() ?? "",
  );
  const imageSources = [
    ...new Set(
      [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)]
        .map((match) => decode(match[1]))
        .filter((source) => source.startsWith("/")),
    ),
  ];
  imageSources.forEach((source) => uniqueImages.add(source));
  const brokenImages = [];

  for (const source of imageSources) {
    let imageCheck = checkedImages.get(source);
    if (!imageCheck) {
      const imageResponse = await fetch(new URL(source, base));
      const contentType = imageResponse.headers.get("content-type") ?? "";
      const bytes = imageResponse.ok ? (await imageResponse.arrayBuffer()).byteLength : 0;
      imageCheck = {
        ok: imageResponse.ok && contentType.startsWith("image/") && bytes > 0,
        status: imageResponse.status,
        contentType,
        bytes,
      };
      checkedImages.set(source, imageCheck);
    }
    if (!imageCheck.ok) {
      brokenImages.push(
        `${imageCheck.status} ${imageCheck.contentType || "unknown type"} ${imageCheck.bytes}B ${source}`,
      );
    }
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const imagesMissingAlt = imageTags.filter((tag) => !/\balt=["'][^"']*["']/.test(tag)).length;
  const fallbackCopyCount = (html.match(/Product media pending/g) ?? []).length;
  const retainedMachineCheck = retainedMachineChecks[path];
  const retainedMachineValid = retainedMachineCheck
    ? heading === retainedMachineCheck.title &&
      title.startsWith(`${retainedMachineCheck.title} —`) &&
      imageSources.includes(retainedMachineCheck.image) &&
      html.includes(`data-range-kind="${retainedMachineCheck.rangeKind}"`)
    : true;

  const checks = {
    status: response.status,
    title,
    heading,
    hasOverview: html.includes('id="overview"'),
    hasApplications: html.includes('id="applications"'),
    hasSpecs: html.includes('id="specifications"'),
    hasQuoteAction: html.includes("Request a quote"),
    localImages: imageSources.length,
    brokenImages,
    imagesMissingAlt,
    fallbackCopyCount,
    retainedMachineValid,
  };
  const valid =
    response.ok &&
    title.includes("Modtech Machine") &&
    title !== "Machine — Modtech Machine" &&
    heading.length > 0 &&
    checks.hasOverview &&
    checks.hasApplications &&
    checks.hasSpecs &&
    checks.hasQuoteAction &&
    retainedMachineValid &&
    fallbackCopyCount === 0 &&
    brokenImages.length === 0 &&
    imagesMissingAlt === 0;
  if (!valid) issues.push({ path, ...checks });
  results.push({ path, valid, ...checks });
}

const missingResponse = await fetch(new URL("/machines/this-machine-does-not-exist", base));
if (missingResponse.status !== 404) {
  issues.push({
    path: "/machines/this-machine-does-not-exist",
    expected: 404,
    status: missingResponse.status,
  });
}

const legacyRedirects = {};
for (const [legacyPath, expectedPath] of Object.entries({
  "/machines/rain-sander": "/machines/vertical-sander",
  "/machines/slurry-tank": "/machines/slurry-preparation-tank",
})) {
  const response = await fetch(new URL(legacyPath, base), { redirect: "manual" });
  const location = response.headers.get("location");
  const valid =
    [301, 302, 303, 307, 308].includes(response.status) &&
    location !== null &&
    new URL(location, base).pathname === expectedPath;
  legacyRedirects[legacyPath] = { valid, status: response.status, location, expectedPath };
  if (!valid) issues.push({ path: legacyPath, expected: `redirect to ${expectedPath}` });
}

const retiredMachineStatuses = {};
for (const path of retiredMachinePaths) {
  const response = await fetch(new URL(path, base));
  retiredMachineStatuses[path] = response.status;
  if (response.status !== 404) issues.push({ path, expected: 404, status: response.status });
}

console.log(
  JSON.stringify(
    {
      passed: paths.length > 0 && issues.length === 0,
      machines: paths.length,
      listingLinks: discovered.length,
      repeatedListingLinks: duplicateLinks,
      machinesRedirect: {
        valid: redirectsToDivisions,
        status: redirectResponse.status,
        location: redirectLocation,
      },
      divisionCounts,
      divisionNavigation,
      filteredCatalogues: filteredCatalogueChecks,
      validPages: results.filter((item) => item.valid).length,
      totalLocalImageReferences: results.reduce((total, item) => total + item.localImages, 0),
      uniqueLocalImages: uniqueImages.size,
      validImageResponses: [...checkedImages.values()].filter((item) => item.ok).length,
      imagesMissingAlt: results.reduce((total, item) => total + item.imagesMissingAlt, 0),
      fallbackCopyCount:
        listingFallbackCount + results.reduce((total, item) => total + item.fallbackCopyCount, 0),
      missingMachineStatus: missingResponse.status,
      retainedMachinesListed,
      retiredMachinesAbsent,
      legacyRedirects,
      retiredMachineStatuses,
      issues,
    },
    null,
    2,
  ),
);

if (paths.length === 0 || issues.length > 0) process.exitCode = 1;
