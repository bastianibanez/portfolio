import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, readdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.env.AUDIT_ORIGIN ?? "http://localhost:8787";
const publicOrigin = "https://bastianibanez.com";
const chromePath =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const routes = [
  { path: "/", canonical: "/", alternate: "/en/", lang: "es", status: 200 },
  { path: "/cv", canonical: "/cv", alternate: "/en/cv", lang: "es", status: 200 },
  { path: "/proyectos/agente-operaciones-erp", canonical: "/proyectos/agente-operaciones-erp", alternate: "/en/projects/erp-operations-agent", lang: "es", status: 200 },
  { path: "/proyectos/plataforma-manufactura", canonical: "/proyectos/plataforma-manufactura", alternate: "/en/projects/manufacturing-platform", lang: "es", status: 200 },
  { path: "/proyectos/groupfit", canonical: "/proyectos/groupfit", alternate: "/en/projects/groupfit", lang: "es", status: 200 },
  { path: "/proyectos/go-agent", canonical: "/proyectos/go-agent", alternate: "/en/projects/go-agent", lang: "es", status: 200 },
  { path: "/en/", canonical: "/en/", alternate: "/", lang: "en", status: 200 },
  { path: "/en/cv", canonical: "/en/cv", alternate: "/cv", lang: "en", status: 200 },
  { path: "/en/projects/erp-operations-agent", canonical: "/en/projects/erp-operations-agent", alternate: "/proyectos/agente-operaciones-erp", lang: "en", status: 200 },
  { path: "/en/projects/manufacturing-platform", canonical: "/en/projects/manufacturing-platform", alternate: "/proyectos/plataforma-manufactura", lang: "en", status: 200 },
  { path: "/en/projects/groupfit", canonical: "/en/projects/groupfit", alternate: "/proyectos/groupfit", lang: "en", status: 200 },
  { path: "/en/projects/go-agent", canonical: "/en/projects/go-agent", alternate: "/proyectos/go-agent", lang: "en", status: 200 },
  { path: "/missing-route", canonical: "/404", alternate: "/en/404", lang: "es", status: 404 },
  { path: "/en/missing-route", canonical: "/en/404", alternate: "/404", lang: "en", status: 404 },
];

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});
const artifactDir = new URL("../tmp/qa/", import.meta.url);
const distDir = new URL("../dist/", import.meta.url);
await mkdir(artifactDir, { recursive: true });

const builtFiles = await readdir(distDir, { recursive: true });
const sitemap = await readFile(new URL("sitemap-0.xml", distDir), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== 12 || sitemapUrls.some((url) => url.includes("/404"))) {
  throw new Error(`Sitemap: expected 12 public URLs without 404 routes, got ${sitemapUrls}`);
}
const forbiddenPatterns = [
  "juan-core",
  "gira-planner",
  "process_management_tool",
  "/Volumes/",
  "bastianibanez1998",
  "lh3.googleusercontent",
];
const textFiles = builtFiles.filter((file) => /\.(?:html|xml|svg|txt)$/.test(file));
for (const file of textFiles) {
  const source = await readFile(new URL(file, distDir), "utf8");
  const forbidden = forbiddenPatterns.find((pattern) => source.includes(pattern));
  if (forbidden) throw new Error(`${file}: leaked forbidden identifier ${forbidden}`);
}
if (builtFiles.some((file) => file.endsWith(".js"))) {
  throw new Error("Static build unexpectedly contains client JavaScript");
}
for (const path of ["bastian-ibanez-cv-es.pdf", "bastian-ibanez-cv-en.pdf", "bastian-ibanez-cv.pdf"]) {
  const [approved, built] = await Promise.all([
    readFile(new URL(`../public/${path}`, import.meta.url)),
    readFile(new URL(path, distDir)),
  ]);
  if (!approved.equals(built)) throw new Error(`${path}: built PDF differs from approved artifact`);
}

const rootResponse = await fetch(`${origin}/`);
const expectedSecurityHeaders = {
  "content-security-policy": "default-src 'self'",
  "cross-origin-opener-policy": "same-origin",
  "permissions-policy": "camera=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};
for (const [header, expected] of Object.entries(expectedSecurityHeaders)) {
  if (!rootResponse.headers.get(header)?.includes(expected)) {
    throw new Error(`Headers: ${header} does not contain ${expected}`);
  }
}
const stylesheet = builtFiles.find((file) => file.startsWith("_astro/") && file.endsWith(".css"));
if (!stylesheet) throw new Error("Build: generated stylesheet not found");
const [assetResponse, pdfResponse] = await Promise.all([
  fetch(`${origin}/${stylesheet}`),
  fetch(`${origin}/bastian-ibanez-cv.pdf`),
]);
if (assetResponse.headers.get("cache-control") !== "public, max-age=31536000, immutable") {
  throw new Error("Headers: immutable asset cache policy is missing");
}
if (pdfResponse.headers.get("cache-control") !== "public, max-age=3600") {
  throw new Error("Headers: PDF cache policy is missing");
}
if (!pdfResponse.headers.get("content-disposition")?.includes("Bastian-Ibanez-CV.pdf")) {
  throw new Error("Headers: downloadable CV content disposition is missing");
}

let checkedPages = 0;
let checkedViewports = 0;
const internalLinks = new Set();

try {
  const desktop = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
  });
  const page = await desktop.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
  });

  for (const route of routes) {
    consoleErrors.length = 0;
    failedRequests.length = 0;
    const response = await page.goto(`${origin}${route.path}`, {
      waitUntil: "networkidle",
    });
    if (!response || response.status() !== route.status) {
      throw new Error(
        `${route.path}: expected HTTP ${route.status}, got ${response?.status()}`,
      );
    }

    const structure = await page.evaluate(() => ({
      h1Count: document.querySelectorAll("h1").length,
      lang: document.documentElement.lang,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    }));

    if (structure.h1Count !== 1) {
      throw new Error(`${route.path}: expected one h1, got ${structure.h1Count}`);
    }
    if (structure.lang !== route.lang) {
      throw new Error(`${route.path}: expected lang=${route.lang}, got ${structure.lang}`);
    }
    if (structure.horizontalOverflow) {
      throw new Error(`${route.path}: horizontal overflow at 1440px`);
    }
    if (structure.scrollBehavior !== "auto") {
      throw new Error(`${route.path}: reduced motion did not disable smooth scrolling`);
    }

    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      alternates: Object.fromEntries(
        [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
          link.hreflang,
          link.href,
        ]),
      ),
      ogUrl: document.querySelector('meta[property="og:url"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
      favicon: document.querySelector('link[rel="icon"]')?.getAttribute("href"),
      desktopLanguage: document.querySelector(".rail__language a")?.getAttribute("href"),
      mobileLanguage: document.querySelector(".mobile-bar__language")?.getAttribute("href"),
      internalLinks: [...document.querySelectorAll("a[href]")]
        .map((link) => link.getAttribute("href"))
        .filter((href) => href && !href.startsWith("#"))
        .map((href) => new URL(href, location.href))
        .filter((url) => url.origin === location.origin)
        .map((url) => `${url.pathname}${url.search}`),
      externalOrigins: [...new Set(
        [...document.querySelectorAll('a[href^="http"]')].map((link) => new URL(link.href).origin),
      )],
    }));
    const expectedCanonical = `${publicOrigin}${route.canonical}`;
    const expectedEs = route.lang === "es" ? expectedCanonical : `${publicOrigin}${route.alternate}`;
    const expectedEn = route.lang === "en" ? expectedCanonical : `${publicOrigin}${route.alternate}`;
    if (
      !metadata.title ||
      !metadata.description ||
      metadata.canonical !== expectedCanonical ||
      metadata.alternates.es !== expectedEs ||
      metadata.alternates.en !== expectedEn ||
      metadata.alternates["x-default"] !== expectedEs ||
      metadata.ogUrl !== expectedCanonical ||
      metadata.ogImage !== `${publicOrigin}/og.png` ||
      metadata.twitterCard !== "summary_large_image" ||
      metadata.favicon !== "/favicon.svg"
    ) {
      throw new Error(`${route.path}: incomplete or inconsistent international SEO metadata`);
    }
    if (
      metadata.desktopLanguage !== route.alternate ||
      metadata.mobileLanguage !== route.alternate
    ) {
      throw new Error(
        `${route.path}: language switch expected ${route.alternate}, got desktop=${metadata.desktopLanguage}, mobile=${metadata.mobileLanguage}`,
      );
    }
    const allowedOrigins = new Set([
      publicOrigin,
      "https://github.com",
      "https://www.linkedin.com",
    ]);
    const disallowedOrigins = metadata.externalOrigins.filter((url) => !allowedOrigins.has(url));
    if (disallowedOrigins.length > 0) {
      throw new Error(`${route.path}: unexpected external origins: ${disallowedOrigins.join(", ")}`);
    }
    for (const link of metadata.internalLinks) internalLinks.add(link);

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    if (axe.violations.length > 0) {
      const summary = axe.violations
        .map((violation) => {
          const nodes = violation.nodes
            .map((node) => `${node.target.join(" ")}: ${node.failureSummary}`)
            .join(" | ");
          return `${violation.id} (${violation.nodes.length}) ${nodes}`;
        })
        .join(", ");
      throw new Error(`${route.path}: axe violations: ${summary}`);
    }
    const unexpectedConsoleErrors = route.status === 404 ? [] : consoleErrors;
    if (unexpectedConsoleErrors.length > 0 || failedRequests.length > 0) {
      throw new Error(
        `${route.path}: browser errors: ${[
          ...unexpectedConsoleErrors,
          ...failedRequests,
        ].join(" | ")}`,
      );
    }
    checkedPages += 1;
  }

  await page.goto(`${origin}/`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const firstFocus = await page.locator(":focus").getAttribute("class");
  if (firstFocus !== "skip-link") {
    throw new Error(`Keyboard: first focus target was ${firstFocus}, expected skip-link`);
  }

  for (let index = 0; index < 24; index += 1) {
    const focus = page.locator(":focus");
    const visibleIndicator = await focus.evaluate((element) => {
      const style = getComputedStyle(element);
      return style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) >= 2;
    });
    if (!visibleIndicator) {
      const label = await focus.textContent();
      throw new Error(`Keyboard: missing visible focus indicator on ${label?.trim()}`);
    }
    await page.keyboard.press("Tab");
  }

  for (const link of internalLinks) {
    const response = await desktop.request.get(`${origin}${link}`);
    if (!response.ok()) {
      throw new Error(`Internal link ${link}: HTTP ${response.status()}`);
    }
  }
  await page.goto(`${origin}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: new URL("home-desktop.png", artifactDir).pathname, fullPage: true });
  await desktop.close();

  for (const width of [320, 390, 768]) {
    const mobile = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width, height: 844 },
    });
    const mobilePage = await mobile.newPage();
    for (const route of routes.filter((route) => route.status === 200)) {
      await mobilePage.goto(`${origin}${route.path}`, { waitUntil: "networkidle" });
      const state = await mobilePage.evaluate(() => ({
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        mobileBar: getComputedStyle(document.querySelector(".mobile-bar")).display,
        rail: getComputedStyle(document.querySelector(".rail")).display,
      }));
      if (state.horizontalOverflow) {
        throw new Error(`${route.path}: horizontal overflow at ${width}px`);
      }
      if (state.mobileBar === "none" || state.rail !== "none") {
        throw new Error(`${route.path}: responsive navigation failed at ${width}px`);
      }
      checkedViewports += 1;
    }
    if (width === 390) {
      await mobilePage.goto(`${origin}/`, { waitUntil: "networkidle" });
      await mobilePage.screenshot({
        path: new URL("home-mobile.png", artifactDir).pathname,
        fullPage: true,
      });
    }
    await mobile.close();
  }

  console.log(
    `PASS browser audit: ${checkedPages} pages with zero axe violations; ` +
      `${checkedViewports} responsive route/viewport checks; ${internalLinks.size} internal links; ` +
      `keyboard, reduced motion, international SEO, privacy, sitemap, PDFs, and headers verified`,
  );
} finally {
  await browser.close();
}
