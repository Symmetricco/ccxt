# Portfolio — Jordi Peguero Guardiola

Portfolio/CV de una sola página. Sin dependencias, sin build: `index.html` es
todo el sitio (HTML + CSS + JS en un solo archivo). Lo único externo son las
tipografías de Google Fonts.

```
portfolio/
├─ index.html          ← el sitio. Fuente única de todo.
├─ artifact.html       ← generado; el mismo sitio sin <html>/<head>/<body>
├─ build-artifact.mjs  ← node portfolio/build-artifact.mjs
├─ assets/             ← fotos de los casos (hoy vacío)
└─ content/            ← el contenido aprobado, tal cual llegó
   ├─ casos.json
   ├─ timeline.json
   ├─ notas-editoriales.md
   └─ brief-original.md
```

Para verlo: abre `index.html` en el navegador. No hace falta servidor.

---

## Dirección de arte

Registro oscuro y cinematográfico, un solo mundo visual (no hay modo claro:
es una decisión, no un olvido).

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#060403` | fondo, negro cálido |
| `--ink-raise` | `#0D0A08` | superficies elevadas |
| `--paper` | `#EDE7DE` | texto principal |
| `--paper-dim` | `#8A817A` | texto secundario (gris sesgado al ámbar) |
| `--ember` | `#E2932E` | acento único |

- **Archivo** variable (eje de anchura 62–125) para display, en caja alta y
  tracking negativo.
- **Instrument Sans** para cuerpo.
- **DM Mono** para metadatos, índices y etiquetas.

El acento ámbar aparece en un sitio por pantalla: el estado «Disponible», la
palabra *interfaz* del titular, el número de la fila activa, el subrayado de
«Hablemos». Si se reparte más, deja de significar nada.

## Movimiento

Todo a mano, sin librerías: contador de carga, revelados con
`IntersectionObserver`, manifiesto que se enciende palabra a palabra con el
scroll, ticker con inercia, raíl horizontal del recorrido scrubbeado por el
scroll vertical, cursor propio con etiqueta y placas que siguen al puntero.

`prefers-reduced-motion` desactiva todo y deja el contenido estático. Sin
JavaScript el sitio sigue siendo legible entero (ver el `<noscript>`).

---

## Cómo se edita

**Textos** — están en el HTML, no en JSON. Se editan donde se leen. `content/`
guarda el original aprobado como referencia; si cambias un texto en el sitio,
cámbialo también ahí para que no se desincronicen.

**Fotos de los casos** — hoy los seis casos usan placas generadas con CSS
(gradientes por caso, más el trazo real de AUTEA en SVG), no fotos. Para poner
una imagen real basta añadir la variable `--img` a la placa del caso, en el
bloque `<div class="archive">`:

```html
<div class="plate plate--becloser" style="--img:url('assets/becloser-01.jpg')">
```

La foto entra como capa superior y tapa la placa generada, tanto en la ficha
como en la vista previa que sigue al cursor. Prioridad según el brief:
**BeCloser y Betlink** primero.

**Añadir un caso** — dos sitios: la fila en `#index` y el `<article class="case">`
en `#archive`, en el mismo orden. El JS los empareja por posición.

## El PDF

No hay generador aparte: el sitio **es** el PDF. `Guardar como PDF` en el pie
(o `Cmd/Ctrl + P`) aplica una hoja de impresión que reorganiza la misma página
como dossier A4 de 8 páginas — CV en la primera, las seis fichas completas
detrás. Una sola fuente, imposible que se desincronicen.

Para generarlo desde línea de comandos con las tipografías reales:

```js
await page.pdf({ path: 'portfolio-jordi-peguero.pdf', format: 'A4',
                 margin: { top:'16mm', bottom:'16mm', left:'15mm', right:'15mm' } });
```

---

## Reglas editoriales — leer antes de tocar el texto

De `content/notas-editoriales.md`. No son decisiones de diseño:

1. **El impago de royalties de Bottle Flip Challenge no aparece en ningún
   material público.** No está en el sitio ni en el PDF. No añadirlo sin
   confirmación expresa de Jordi.
2. **2013–2018 se presenta como trabajo real**, no como hueco a justificar.
3. **«Barcelona» siempre escrito completo**, nunca «BCN».
4. **La frase de origen personal de Bottle Flip Challenge se queda** tal cual,
   como cita destacada en su ficha.

## Pendiente

- [ ] Fotografías reales de BeCloser y Betlink (lo que más subiría el conjunto).
- [ ] Año exacto de AUTEA — hoy la ficha dice «Andorra» donde iría el año,
      porque el año no está confirmado.
- [ ] Identidad de Zas Lab: decidir si el portfolio hereda su marca o se queda
      como identidad personal aparte. Hoy es identidad personal.
- [ ] Confirmar si Symmetric Co. sigue activo (aparece en el recorrido, 2021).
- [ ] Texto del manifiesto («Llevo veinticinco años…») y el «Acerca de»: son
      nuevos, escritos para este rediseño. Pendientes del visto bueno de Jordi.
