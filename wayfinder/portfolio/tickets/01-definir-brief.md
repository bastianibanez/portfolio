---
title: Definir el brief de producto y posicionamiento
status: closed
labels:
  - wayfinder:grilling
parent: ../map.md
assignee: codex
blocked_by: []
---

## Question

¿Qué resultado debe producir el portafolio, para qué audiencia, con qué posicionamiento, contenido, lenguaje visual y restricciones técnicas?

## Resolution comment

El portafolio priorizará reclutadores de Chile y mantendrá alcance internacional. Su posicionamiento será **Software Engineer · Full-Stack & Applied AI**, sin etiqueta de seniority y con la condición de estudiante presentada como contexto factual.

Será bilingüe, español por defecto e inglés en `/en/`. Tendrá una estructura híbrida: portada con proyectos, experiencia, extracto de CV y contacto; página web de CV; descarga del CV PDF; y casos de estudio individuales.

Los cuatro casos principales serán:

1. **Agente de operaciones ERP con IA** — caso profesional anonimizado basado en `juan-core`; flagship.
2. **Plataforma operacional para manufactura** — caso freelance anonimizado y entregado a producción.
3. **GroupFit** — producto público end-to-end con optimización matemática.
4. **go-agent** — agente/framework en Go con arquitectura hexagonal.

`env-manager`/`env-manager-js` aparecerán como librerías secundarias y el sitio industrial B2B como entrega freelance breve.

La estética será dark, sobria, minimalista y técnica, sin retrato ni gradientes. El acento será `#2DD4BF`. La identidad surgirá de tipografía, retícula, ritmo y evidencia real; se evitarán glows, glassmorphism, bento decorativo, pills sin semántica, terminales falsas, métricas vanidosas, copy genérico y animaciones generalizadas.

La implementación usará Astro estático sobre Cloudflare Workers Static Assets en `bastianibanez.com`. El CTA principal será un `mailto:` a `ibanezmbastian@gmail.com`. No habrá formulario ni CMS en v1.

El CV de una página y la versión extensa fueron regenerados sin fotografía; la versión breve será la descarga principal.
