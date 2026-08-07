---
title: Crear y publicar el portafolio profesional de Bastián
status: open
labels:
  - wayfinder:map
tracker: local-markdown
---

## Destination

Diseñar, implementar y publicar en `bastianibanez.com` un portafolio bilingüe que convierta visitas de reclutadores —principalmente de Chile y secundariamente internacionales— en contacto directo por email, y que demuestre con evidencia el posicionamiento **Software Engineer · Full-Stack & Applied AI**.

## Notes

- Este esfuerzo incluye ejecución: diseño en Stitch, implementación, verificación y despliegue; no termina solamente en una especificación.
- Dirección visual: dark mode, sobria, minimalista, editorial y técnica; sin gradientes, retrato, glow, glassmorphism, terminales falsas ni otros AI-isms.
- Paleta base: fondo negro/grafito, blanco roto y acento turquesa frío `#2DD4BF`, reservado para interacción, foco y pequeños indicadores.
- Arquitectura: Astro estable más reciente, sitio estático y bilingüe (`/` en español, `/en/` en inglés), desplegado mediante Cloudflare Workers Static Assets.
- Estructura híbrida: inicio, `/cv`, descarga del CV de una página y páginas individuales para casos de estudio.
- Contacto: enlace directo a `ibanezmbastian@gmail.com`; sin formulario ni Resend.
- Usar `wayfinder` para mantener este mapa; usar las skills de Stitch para el prototipo y la implementación visual; usar las guías de Cloudflare, accesibilidad y rendimiento al construir y desplegar.
- Los casos privados y freelance deben anonimizar clientes, repositorios, datos, capturas y detalles operacionales sensibles.

## Decisions so far

- [Definir el brief de producto y posicionamiento](tickets/01-definir-brief.md) — Portafolio bilingüe para reclutadores, con posicionamiento Full-Stack & Applied AI, cuatro casos principales, estética editorial dark y arquitectura Astro/Cloudflare.
- [Generar cuatro direcciones visuales en Stitch](tickets/02-generar-direcciones-stitch.md) — Se eligió Dossier de sistemas: rail lateral, registros editoriales técnicos, jerarquía tipográfica fuerte y acento turquesa funcional; el marco violeta de Stitch no forma parte del diseño.
- [Refinar el Dossier de sistemas seleccionado](tickets/03-elegir-direccion.md) — Se consolidó la portada en español con cuatro proyectos factuales, evidencia vinculada, rutas de CV y adaptación móvil; es la referencia definitiva para implementación.

## Not yet specified

- Si la primera versión incorporará Cloudflare Web Analytics o se medirá únicamente mediante métricas técnicas de producción.
- Qué elementos interactivos futuros justificarán islas React o rutas dinámicas en Workers.
- Qué capturas, diagramas y artefactos saneados representarán mejor los casos privados una vez elegida la dirección visual.
- Si habrá una actualización posterior del contenido del CV para alinearlo completamente con el nuevo posicionamiento bilingüe.

## Out of scope

- CMS, autenticación, área privada o base de datos en la primera versión.
- Formulario de contacto y automatización de email en la primera versión.
- Retrato personal y light mode.
- Publicar nombres, URLs, prompts, métricas no verificadas o información sensible de clientes y proyectos privados.
