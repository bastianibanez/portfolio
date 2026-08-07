# Design System: Bastián Ibáñez Portfolio

## 1. Visual Theme & Atmosphere

A sober technical editorial portfolio: quiet, exact and evidence-led. It should feel like a carefully typeset engineering dossier, not a SaaS landing page or cyberpunk interface. Density 5/10, controlled asymmetry 6/10, motion 2/10. Identity comes from typographic hierarchy, a disciplined grid, real project content and deliberate whitespace.

## 2. Color Palette & Roles

- **Deep Graphite Canvas** (`#090D0C`) — page background; never use pure black.
- **Raised Graphite** (`#111816`) — rare secondary surface for meaningful hierarchy.
- **Primary Ink** (`#E6ECEA`) — headings and primary body text.
- **Muted Ink** (`#A6B0AD`) — secondary copy and metadata; maintain accessible contrast.
- **Quiet Ink** (`#73807C`) — decorative or large metadata only, never small essential text.
- **Structural Border** (`#26302D`) — one-pixel rules and focus-independent separation.
- **Cold Turquoise** (`#2DD4BF`) — the only accent; links, keyboard focus, selected states and small diagram signals.

No gradients, neon, glow, translucent glass, colorful shadows or large turquoise surfaces.

## 3. Typography Rules

- **Display and body:** IBM Plex Sans, weights 400/500/600. Clear, compact hierarchy without oversized slogans.
- **Metadata:** IBM Plex Mono, weights 400/500, limited to dates, status, stack, paths and technical labels; at most 15% of visible text.
- **Scale:** display `clamp(2.75rem, 6vw, 4.5rem)` with tight line-height; section heading `clamp(2rem, 4vw, 3rem)`; project heading 1.5rem; body 1.0625–1.125rem with 1.55 line-height; metadata 0.875rem.
- Body copy stays left aligned and within 60–72 characters. Avoid all-caps sentences, decorative tracking and generic startup copy.

## 4. Component Stylings

- **Navigation:** compact, text-led, keyboard accessible, with a visible current-page state. No logo mark is required; use the name or initials plainly.
- **Links and CTA:** email is the sole primary action. Use text links or squared buttons with 4px corners, visible underline/focus and restrained active feedback.
- **Project entries:** prefer editorial rows, dividers and asymmetric columns. Cards are allowed only when a project is an independent navigable object; maximum 8px corner radius, flat surfaces, no ambient shadow.
- **Tags:** use plain comma-separated metadata or compact labels. Pills only for a truthful status such as “Producción” or “Repositorio privado”.
- **Diagrams:** simple lines, nodes and arrows representing real architecture. No fake dashboards, terminals, logs or code.
- **Icons:** one restrained outline family at 16–20px, only when meaning improves; never decorative AI, sparkles, brain or circuit icons.

## 5. Layout Principles

- Desktop-first 12-column grid inside a 1120–1200px container; 6 columns on tablet and one column on mobile.
- Use controlled asymmetry: narrow metadata column plus wider narrative, or an offset project index. Every element aligns to visible keylines.
- Section spacing 96–128px desktop and 64–88px mobile. Use an 8px spatial rhythm with 4px exceptions.
- The first viewport must expose name, role, concrete proposition, Santiago/location, email, projects access, CV, GitHub, LinkedIn and ES/EN.
- Projects carry more visual weight than technology lists. Do not hide core evidence behind tabs, carousels or hover.
- At widths below 768px all columns stack, essential content remains present, and no horizontal scrolling is allowed. Touch targets are at least 44px.

## 6. Motion & Interaction

- Motion communicates response or continuity only. Hover/focus feedback 90–120ms; small expansions 150–240ms using transform or opacity.
- No automatic cascade reveals, parallax, bouncing, typewriter loops, pulsing status dots, marquees or perpetual motion.
- All content is visible in initial HTML. Respect `prefers-reduced-motion` by removing non-essential movement.
- Focus uses a solid 2px Cold Turquoise ring with 3px offset and never relies on color alone.

## 7. Content & Evidence Rules

- Write specific, factual copy using active verbs. Every claim points to a project, decision or verifiable result.
- Private work is labelled “Trabajo profesional · Caso anonimizado” or “Trabajo para cliente · Caso anonimizado”. Never expose client names, private repositories, internal identifiers, prompts or sensitive screenshots.
- Do not invent metrics. The manufacturing platform has 255 unit tests in 57 files, verified on 2026-08-07. Production status, delivered status and repository visibility must follow `content/README.md`.
- Spanish is primary; English mirrors the same hierarchy and evidence under `/en/`.

## 8. Anti-Patterns (Banned)

No centered generic hero, eyebrow pill, multiple hero CTAs, gradients, glow, glassmorphism, blobs, background grid texture, bento-template composition, three equal feature cards, cards inside cards, oversized rounded corners, fake terminal, fake metrics, decorative code, stock or generated imagery, portrait, skill bars, logo clouds, custom cursor, scroll indicator, “passionate developer”, “innovative solutions”, “building the future”, or identical reveal animation on every section.
