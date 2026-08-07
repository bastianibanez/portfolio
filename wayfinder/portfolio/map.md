---
title: Crear y publicar el portafolio profesional de Bastián
status: closed
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
- [Preparar el contenido bilingüe y los artefactos de proyecto](tickets/04-preparar-contenido.md) — Copy ES/EN, CV web, metadatos y cuatro diagramas saneados quedaron listos; se corrigieron los estados privados de GroupFit/go-agent y la evidencia de pruebas de manufactura.
- [Regenerar los CV PDF bilingües de una página](tickets/08-regenerar-cv.md) — Los CV ES/EN quedaron generados en A4 con el contenido aprobado, enlaces activos, texto seleccionable, metadatos de idioma y composición Dossier de sistemas.
- [Implementar el portafolio en Astro](tickets/05-implementar-astro.md) — El sitio estático bilingüe quedó construido con inicio, CV y cuatro casos por idioma, contenido tipado, cero JavaScript cliente y configuración de Workers Static Assets.
- [Verificar accesibilidad, rendimiento, SEO y privacidad](tickets/06-verificar-calidad.md) — Las 14 páginas pasan WCAG automatizado, teclado, responsive, SEO bilingüe, privacidad y cabeceras; Lighthouse móvil obtuvo 99–100 en rendimiento y 100 en las otras categorías, con LCP ≤ 1,7 s, CLS ≤ 0,001 y TBT 0 ms.
- [Publicar bastianibanez.com en Cloudflare](tickets/07-publicar-cloudflare.md) — El portafolio quedó publicado mediante Workers Static Assets y Custom Domain, con HTTPS forzado, `www` canónico, rutas y query preservadas y auditoría pública completa; Lighthouse obtuvo 100 en las cuatro categorías verificadas.

## Not yet specified

- Ninguno para la versión 1 publicada.

## Out of scope

- CMS, autenticación, área privada o base de datos en la primera versión.
- Formulario de contacto y automatización de email en la primera versión.
- Retrato personal y light mode.
- Publicar nombres, URLs, prompts, métricas no verificadas o información sensible de clientes y proyectos privados.
- Cambiar la visibilidad de repositorios privados para alimentar el portafolio; GroupFit y go-agent se presentarán sin enlace de código en esta versión.
- Cloudflare Web Analytics en la versión 1; la medición inicial se limita a auditorías técnicas para conservar cero JavaScript cliente.
- Islas React o rutas dinámicas sin un requisito interactivo concreto.
