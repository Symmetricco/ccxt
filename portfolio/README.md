# Portfolio — jordipeguero.com

Portfolio/CV de Jordi Peguero Guardiola. Sin dependencias y sin build:
`site/index.html` es el sitio entero (HTML + CSS + JS en un solo archivo) y
`site/assets/` todo lo que necesita, tipografías incluidas.

**Publicar:** arrastra la carpeta `site` a `app.netlify.com/drop` (o Vercel),
añade el dominio `jordipeguero.com` y sigue las instrucciones de DNS del panel.
No hay paso de compilación.

**Ver en local:** abre `site/index.html` en el navegador. Para que carguen las
tipografías autoalojadas sin avisos de CORS, mejor sobre un servidor:

```bash
cd site && python3 -m http.server 8080
```

```
portfolio/
├─ CLAUDE.md              ← las reglas del proyecto. Léelo antes de tocar nada.
├─ site/                  ← esto es lo que se publica
│  ├─ index.html
│  └─ assets/
│     ├─ fonts/           ← woff2 autoalojados, subset latin (144 KB)
│     ├─ favicon.svg
│     ├─ og-jordipeguero.jpg     ← 1200×630, generado
│     └─ cv-jordi-peguero.pdf    ← generado desde el propio sitio
├─ og-card.html           ← plantilla de la tarjeta social
├─ build-assets.mjs       ← regenera la tarjeta y el PDF
├─ build-artifact.mjs     ← regenera artifact.html (previsualización en Claude)
└─ content/               ← el contenido aprobado, tal cual llegó
```

---

## Dirección de arte

Registro oscuro y cinematográfico, un solo mundo visual: no hay modo claro, y es
una decisión, no un olvido.

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#060403` | fondo, negro cálido |
| `--ink-raise` | `#0D0A08` | superficies elevadas |
| `--paper` | `#EDE7DE` | texto principal |
| `--paper-dim` | `#8A817A` | texto secundario (gris sesgado al ámbar) |
| `--ember` | `#E2932E` | acento único |

**Archivo** variable (eje de anchura 62–125) para display, en caja alta y
tracking negativo · **Instrument Sans** para cuerpo · **DM Mono** para
metadatos, índices y etiquetas. Autoalojadas: ninguna petición a terceros.

El ámbar aparece una vez por pantalla —el punto de «Disponible», la palabra
*terminada* del titular, el número de la fila activa, el subrayado de
«Hablemos»—. Si se reparte más, deja de significar nada.

## Movimiento

Todo a mano, sin librerías: contador de carga, revelados con
`IntersectionObserver`, manifiesto que se enciende palabra a palabra con el
scroll, ticker con inercia, raíl horizontal del recorrido scrubbeado por el
scroll vertical, cursor propio con etiqueta y placas que siguen al puntero.

`prefers-reduced-motion` lo desactiva todo. Sin JavaScript el sitio sigue siendo
legible entero (ver el `<noscript>`).

---

## Cómo se edita

**Textos** — están en el HTML, no en JSON: se editan donde se leen. `content/`
guarda el original aprobado como referencia; si cambias un texto en el sitio,
cámbialo también ahí.

**Fotos de los casos** — hoy los seis casos usan placas generadas con CSS
(gradientes propios de cada caso, más el trazo real de AUTEA en SVG). Para poner
una imagen real, añade `--img` a la placa del caso en el bloque `.archive`:

```html
<div class="plate plate--becloser" style="--img:url('assets/becloser-01.jpg')">
```

La foto entra como capa superior y tapa la placa generada, tanto en la ficha
como en la vista previa que sigue al cursor.

**Añadir o reordenar casos** — dos sitios, en el mismo orden: la fila en
`#index` y el `<article class="case">` en `#archive`. El JS los empareja **por
posición**, así que hay que renumerar `data-case`, `.row__num`,
`.sheet__kicker` y `.plate__idx`, y comprobar que cada fila abre su ficha.

## El PDF y la tarjeta social

No hay maquetación aparte: el sitio **es** el PDF. `@media print` reorganiza la
misma página como dossier A4 —CV en la primera hoja, las seis fichas detrás—.
El botón «Guardar como PDF» del pie lo imprime en vivo; `build-assets.mjs` lo
deja escrito en `assets/cv-jordi-peguero.pdf`, que es a donde apuntan los
enlaces de descarga.

```bash
node build-assets.mjs      # regenera og-jordipeguero.jpg y cv-jordi-peguero.pdf
```

**Tras cualquier cambio de contenido hay que regenerar el PDF.** Es su única
fuente y si no, se desincronizan.

---

## Reglas editoriales — leer antes de tocar el texto

Están en `CLAUDE.md` y en `content/notas-editoriales.md`. No son decisiones de
diseño: el impago de royalties de Bottle Flip Challenge no aparece en ningún
material público, 2013–2018 se presenta como trabajo real, «Barcelona» siempre
completo, y la frase de origen personal de Bottle Flip se queda.

## Pendiente

- [ ] **Cuatro casos del brief sin contenido**: Camel Territorio música, Abertis
      Logística, 123 Jump y Sovnd. Hacen falta sus textos y el orden definitivo
      de los diez.
- [ ] **Fotografías reales.** Prioridad: Bottle Flip Challenge, BeCloser, Betlink.
- [ ] **Versión en inglés** (`site/en/index.html`) con conmutador ES/EN,
      `hreflang` y `canonical`.
- [ ] **Teléfono** en el bloque de contacto.
- [ ] Año exacto de AUTEA: hoy la ficha dice «Andorra» donde iría el año.
- [ ] Confirmar si Symmetric Co. sigue activo (aparece en el recorrido, 2021).
- [ ] El hilo de los tres saltos técnicos (visión por computador 2008, realidad
      aumentada 2011, IA generativa 2023) todavía no se cuenta: faltan los casos
      que lo sostienen.
- [ ] Visto bueno al titular «Del concepto a la pieza terminada», a la entradilla
      y al manifiesto: son nuevos, escritos para el posicionamiento neutro.
