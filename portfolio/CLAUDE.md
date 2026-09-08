# Portfolio de Jordi Peguero — jordipeguero.com

## Qué es esto

Portfolio personal de Jordi Peguero Guardiola, director creativo con 25 años de
trayectoria. El objetivo del sitio es **conseguir empleo**, no vender servicios
de estudio. Cada decisión de contenido y de copy debe servir a un reclutador o a
un responsable de contratación, no a un cliente potencial.

## Audiencias, por orden

1. Empresas medianas y agencias de Girona y Barcelona: responsable de
   comunicación y marketing, dirección de arte, diseño senior.
2. Empresas de iGaming, tecnología y producto en Barcelona (Creative Manager,
   dirección creativa in-house).
3. Empresas internacionales de IA creativa, que buscan trabajo hecho con IA
   explicado pieza a pieza.

## Posicionamiento

El sitio es **neutro a propósito**: no se ata a SaaS, ni a retail, ni a IA. El CV
toma partido según la oferta; el portfolio aporta pruebas y no debe contradecir a
ninguna versión del CV. Amplitud en la evidencia, personalidad en el oficio.

## Reglas de contenido

- Cada caso se cuenta como **problema → decisión → resultado**. Nunca como
  galería de imágenes bonitas.
- Nada de lenguaje de agencia vendiendo servicios. Primera persona, concreto.
- Si una pieza usó IA, se dice qué herramienta y qué hizo Jordi.
- **No inventar clientes, cifras, fechas ni resultados. Si falta un dato,
  preguntar.**
- Sin frases motivacionales ni relleno.

## Reglas editoriales heredadas — no negociables

Vienen de `content/notas-editoriales.md` y están confirmadas por Jordi:

1. El impago de royalties de Bottle Flip Challenge **no aparece en ningún
   material público**. Ni web, ni PDF, ni CV, ni LinkedIn.
2. El periodo **2013–2018 se presenta como trabajo real**, no como hueco a
   justificar.
3. **«Barcelona» siempre escrito completo**, nunca «BCN».
4. La frase de origen personal de Bottle Flip Challenge **se queda** tal cual,
   como cita destacada en su ficha.

## Stack

HTML, CSS y JS en un único archivo estático, más `assets/`. Sin frameworks, sin
build, sin dependencias. Las tipografías están autoalojadas en `assets/fonts/`
(subset latin, 144 KB). Prioridad: que cargue rápido y se vea bien en móvil.

## Estructura

```
portfolio/
├─ CLAUDE.md
├─ site/                  ← esto es lo que se publica. Arrastrar a Netlify/Vercel.
│  ├─ index.html          ← castellano · 10 casos
│  ├─ en/index.html       ← inglés · adaptado, no traducido
│  └─ assets/             ← carpeta única, en la raíz
│     ├─ camel-ar-discovr.jpg, abertis-*.jpg   (6 imágenes)
│     ├─ fonts/           ← woff2 autoalojados + fonts.css (disponibles, sin usar)
│     ├─ favicon.svg      ← disponible, sin enlazar
│     ├─ og-jordipeguero.jpg
│     └─ cv-jordi-peguero.pdf   ← generado desde el propio sitio
├─ og-card.html           ← plantilla de la tarjeta social
├─ build-assets.mjs       ← genera og + pdf
├─ build-artifact.mjs     ← genera artifact.html para previsualizar en Claude
└─ content/               ← el contenido aprobado, tal cual llegó
```

**Los diez casos, en orden:** Bottle Flip Challenge · Camel Territorio música ·
BeCloser · Abertis Logística · AUTEA · 123 Jump · Betlink · Sovnd ·
Iris Boessenkool · Grup Salvador.

## Bilingüe — la regla importante

Son **dos archivos completos e independientes**, sin JavaScript de intercambio ni
librerías de i18n. El conmutador es `.langsw`, al final de `.chrome__tr` en ambos.
`assets/` es única y está en la raíz: el inglés la referencia con `../assets/`.

**Cualquier caso nuevo o cambio de contenido hay que aplicarlo en los DOS
archivos.** Un sitio bilingüe desincronizado es peor que uno monolingüe. El texto
en inglés lo da Jordi: está escrito, no traducido, y no se traduce aquí.

## Estructura del HTML

- Índice de casos: botones `.row` con `data-case="N"`.
- Fichas: `article.case[data-slug]` dentro de `.archive`, en el **mismo orden**.
- Índice y fichas se corresponden **por posición**. Si tocas el orden, hay que
  renumerar `data-case`, `.row__num`, `.sheet__kicker` y `.plate__idx`, y
  verificar que cada fila abre la ficha correcta.
- Imágenes de caso: `<div class="plate" style="--img:url('assets/x.jpg')">`.
  Sin `--img`, el caso usa una placa generada con CSS.

## Comandos

```bash
node build-assets.mjs     # regenera la tarjeta social y el CV en PDF
node build-artifact.mjs   # regenera artifact.html
```

Tras cualquier cambio de contenido hay que **regenerar el PDF**: el sitio es su
única fuente y se desincronizan si no.

## No hacer

- No convertir esto en un proyecto de React ni añadir dependencias.
- No rediseñar sin que se pida. La identidad visual (negro cálido `#060403`,
  tipografía grande, acento ámbar `#E2932E`) está decidida.
- No traducir el sitio ni añadir selector de idioma sin pedirlo.
- No tocar el orden de los casos sin renumerar y verificar (ver arriba).

## Comprobación antes de dar por bueno cualquier cambio

- [ ] Cada fila del índice abre su ficha correspondiente.
- [ ] La numeración de índice, kicker y placa coincide.
- [ ] El sitio carga sin errores en consola.
- [ ] Se ve bien a 375 px.
- [ ] No hay texto en inglés mezclado con el castellano.
- [ ] El PDF se ha regenerado si cambió el contenido.
