---
title: Verificar accesibilidad, rendimiento, SEO y privacidad
status: closed
labels:
  - wayfinder:task
parent: ../map.md
assignee: codex
blocked_by:
  - 05-implementar-astro.md
---

## Question

¿Cumple la implementación WCAG 2.2 AA, navegación por teclado, reduced motion, equivalencia bilingüe, SEO internacional, privacidad de proyectos y objetivos Core Web Vitals antes de publicarse?

## Resolution comment

La implementación quedó verificada con una auditoría reproducible en
`../../../scripts/audit-site.mjs`, ejecutable mediante `npm run audit:site` sobre
el build servido por Wrangler. La prueba recorre los 14 documentos ES/EN,
incluidos ambos 404 reales, y las 12 rutas públicas en viewports de 320, 390, 768
y 1440 px.

- Axe no reportó violaciones WCAG 2.2 AA en ninguna página. También pasaron el
  skip link, 24 pasos consecutivos de teclado con foco visible, reduced motion,
  ausencia de overflow y navegación móvil.
- Se comprobó que cada página cambia al equivalente correcto en el otro idioma,
  publica `lang`, canonical y `hreflang` recíprocos, conserva un solo `h1` y no
  genera errores de consola ni solicitudes fallidas.
- Lighthouse 13 en perfil móvil obtuvo 99/100/100/100 para inicio ES, 99/100/100/100
  para inicio EN, 99/100/100/100 para CV ES y 100/100/100/100 para el caso ERP;
  el orden es rendimiento, accesibilidad, buenas prácticas y SEO.
- Los laboratorios midieron LCP entre 1,5 y 1,7 s, CLS entre 0 y 0,001 y TBT de
  0 ms, dentro de los objetivos de Google. INP requiere datos de usuarios reales
  al percentil 75 y se medirá después del despliegue; el TBT nulo y la ausencia de
  JavaScript cliente reducen el riesgo previo a publicación.
- El sitemap contiene las 12 URLs públicas y excluye los 404; los 16 destinos
  internos resuelven, los PDF del build coinciden byte a byte con los aprobados y
  no existe JavaScript cliente.
- El escaneo de privacidad no encontró identificadores privados, rutas locales ni
  orígenes externos fuera de GitHub y LinkedIn. Las cabeceras de CSP, aislamiento,
  permisos, referrer, MIME sniffing y framing, además de las políticas de caché
  para assets y PDF, fueron confirmadas en la vista local de Cloudflare.

La primera pasada detectó dos defectos reales y quedaron corregidos: contraste
insuficiente en pies de figura y el selector de idioma del rail apuntando al
inicio en lugar de la página equivalente. También se añadió un favicon explícito
para eliminar el único 404 de recursos que Lighthouse registraba.
