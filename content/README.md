# Portfolio content pack

This directory is the content source of truth for the Astro implementation. The
Stitch screen remains the layout reference; wording and evidence must come from
this pack whenever the two disagree.

## Files

- `portfolio-content.md`: final Spanish and English copy for the home page,
  project case studies, web CV, SEO metadata and interface labels.
- `asset-manifest.md`: approved visual evidence, accessibility text and privacy
  rules.
- `assets/*.svg`: client-safe, provider-neutral diagrams for the four featured
  cases.

## Publication rules

- The Spanish home is `/`; English mirrors it under `/en/`.
- Never expose client names, private repository names, internal service names,
  prompts, production URLs, credentials, real operational data or screenshots.
- GroupFit and go-agent are private repositories as of 2026-08-07. Do not render
  a source-code link or call either project open source.
- The manufacturing-platform test claim is **255 unit tests in 57 files**,
  verified with Vitest on 2026-08-07. Keep the date close to the claim or omit
  the number if the suite changes.
- The approved one-page CV files are `../output/pdf/cv.pdf` for `/cv.pdf` and
  `../output/pdf/en/cv.pdf` for `/en/cv.pdf`. The Astro implementation must copy
  these exact artifacts to its public routes; older CV files outside this
  repository are not approved.
- `mailto:ibanezmbastian@gmail.com` is the sole primary conversion action.

## Approved public links

- GitHub: <https://github.com/bastianibanez>
- LinkedIn: <https://www.linkedin.com/in/ibanezbastian>
- Python env-manager: <https://github.com/NotoriosTI/env-manager>
- TypeScript env-manager: <https://github.com/NotoriosTI/env-manager-js>

All other primary-project links remain internal and must not be emitted into the
site.
