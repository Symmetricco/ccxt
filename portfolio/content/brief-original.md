# Portfolio Jordi Peguero — Brief de contexto para el rediseño

_Preparado agosto 2026 · para retomar en Claude Code y/o Claude Design_

---

## 0. Nombre del proyecto (pendiente, sin prisa)

Aún sin decidir. Candidatos rápidos para cuando te apetezca cerrarlo — o ignóralos y sigue con "portfolio" a secas hasta que surja algo mejor trabajando en ello:

- **Zas Lab / Portfolio** — directo, institucional
- **25 años, un pipeline** — juega con tu recorrido + tu forma de trabajar hoy
- **Marca y Producto** — literal, sin metáfora

No es bloqueante para empezar a trabajar. El nombre del proyecto no tiene por qué coincidir con el nombre de dominio ni con nada público.

---

## 1. Qué es esto

Portfolio personal de Jordi Peguero Guardiola — Director Creativo especializado en marca y producto digital. Sirve para tres cosas a la vez:

1. **Candidatura** — lo que ve un reclutador o una empresa cuando busca "Jordi Peguero" o cuando le compartes el link.
2. **Prueba de trabajo** — seis casos reales con proceso documentado (no solo imágenes bonitas).
3. **Fuente única del PDF descargable** — el PDF se genera a partir del mismo contenido, para que no haya dos versiones que puedan desincronizarse.

---

## 2. Estado actual — qué existe ya

En `current-site/` tienes el HTML+CSS+JS completo de la V1, funcional, que ya está en uso (enlazado desde LinkedIn). En `current-pdf/` está el HTML fuente del PDF y el PDF generado. En `content/` está **el mismo contenido, pero extraído en JSON/Markdown limpio** — úsalo como fuente de verdad de texto en vez de tener que leerlo del HTML.

**La V1 fue diseñada por Claude (yo), desde un brief, sin ver tu identidad real de Zas Lab.** Esto es importante y es la razón principal de este rediseño — ver punto 4.

---

## 3. Sistema de diseño actual (V1 — punto de partida, no dogma)

- **Paleta:** ink `#16181D` (casi negro azulado) · paper `#F5F5F0` (blanco roto) · indigo `#3245FF` (acento primario) · amber `#E2932E` (acento secundario) · sage `#4B7A78` (terciario)
- **Tipografía:** Fraunces (display, serif con carácter) · Inter (cuerpo) · IBM Plex Mono (utilidad — fechas, etiquetas, metadatos)
- **Motivo central:** una "regla de medición" — ticks y líneas finas, como herramienta de diseño — usada como navegación lateral en la web, como línea de tiempo horizontal, y en la portada de LinkedIn. Es el hilo visual que conecta CV, web, PDF y LinkedIn hoy.
- **Formato de caso:** cada proyecto se cuenta como ficha de spec — Encargo → Qué hice → Resultado — no como galería de imágenes.

Todo esto es válido como punto de partida, pero **ninguno de estos tokens viene de tu marca real**. Los inventé para evitar los clichés visuales típicos de una IA (crema+serif+terracota, negro+neón, periódico denso), no porque supiera cómo es Zas Lab.

---

## 4. Lo que falta — y es el objetivo de este rediseño

**4.1 — Identidad real de Zas Lab.** En tu banner de LinkedIn hay un logo: un hexágono con una "Z" en trazo blanco sobre fondo oscuro circular, y el wordmark "ZAS LAB" en mayúsculas condensadas con el subtítulo "COMM SINLESS". No tengo el archivo original (SVG/PNG/AI) de esa marca — solo lo vi en una captura de pantalla. **Primer paso real: localiza el archivo fuente de ese logo** (o de cualquier sistema de marca de Zas Lab que ya exista) y a partir de ahí decide si el portfolio hereda esa identidad, la evoluciona, o si prefieres una marca personal distinta a la de Zas Lab para tu candidatura (son decisiones distintas: Zas Lab es tu estudio, esto es tu currículum — pueden compartir sistema o no).

**4.2 — Imágenes reales de los casos.** Hoy solo **Bottle Flip Challenge** tiene fotografía real (están en `current-site/assets/`). Los otros cinco casos (BeCloser, Betlink, Iris Boessenkool, AUTEA, Grup Salvador) son solo tipografía y color. Capturas de pantalla de BeCloser y Betlink, o el key visual de alguno, elevarían el conjunto entero.

**4.3 — Decisión sobre el origen personal de Bottle Flip Challenge.** El caso incluye actualmente esta frase, ya confirmada por ti para quedarse:
> "La idea nació en el peor año, acompañando a mi hijo al colegio. Vi el gesto repetido en cada patio y decidí construir algo a partir de él."

Al rediseñar, decide si este tono (más personal, más de marca-humana) se extiende a otros casos o se queda como excepción puntual en este.

---

## 5. Restricción técnica a tener en cuenta

El PDF actual (`current-pdf/pdf-source.html` → `portfolio-jordi-peguero.pdf`) se generó con `wkhtmltopdf` **sin acceso a internet** en el entorno donde yo trabajo, así que usa fuentes del sistema (DejaVu Serif, Liberation Sans/Mono) en vez de Fraunces/Inter/IBM Plex Mono reales. Si Claude Code genera el PDF desde tu ordenador (con internet), no tiene esa restricción — puede usar las fuentes reales vía Google Fonts o fuentes locales que instales, y el resultado será más fiel a la web.

---

## 6. Checklist de arranque sugerido

- [ ] Recuperar o crear el archivo fuente del logo de Zas Lab
- [ ] Decidir: ¿el portfolio hereda la marca de Zas Lab o es una identidad personal aparte?
- [ ] Revisar el sistema de diseño V1 (sección 3) — qué se conserva, qué se descarta
- [ ] Reunir imágenes reales de BeCloser y Betlink como mínimo (las de mayor prioridad)
- [ ] Rediseñar manteniendo el contenido de `content/casos.json` (no hace falta reescribir los textos, ya están aprobados)
- [ ] Regenerar el PDF a partir del nuevo diseño, con fuentes reales
- [ ] Revisar que "Barcelona" siga apareciendo escrito (no abreviado) — es intencional, ver nota en `content/notas-editoriales.md`

---

## 7. Lo que NO debe cambiar (acordado con Jordi, no son libres decisiones de diseño)

- El dato de royalties no cobrados de Bottle Flip Challenge **no va en ningún material público** — ver `content/notas-editoriales.md`.
- El hueco 2013–2018 se presenta como trabajo real (Grup Salvador + Bottle Flip Challenge), no como vacío a disimular.
- "Barcelona" siempre escrito completo, nunca abreviado como "BCN" — es una decisión deliberada para búsquedas y lectura rápida, no un descuido de espacio.
