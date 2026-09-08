/**
 * Genera los dos assets que se derivan del propio sitio:
 *   assets/og-jordipeguero.jpg   tarjeta 1200x630 para redes
 *   assets/cv-jordi-peguero.pdf  el dossier A4, desde la hoja de impresión
 *
 *   node portfolio/build-assets.mjs
 *
 * Requiere playwright. El sitio es la fuente única: el PDF no se maqueta
 * aparte, sale de site/index.html con @media print.
 */
import { chromium } from 'playwright';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const exe = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

// — tarjeta social —
const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await card.goto(pathToFileURL(join(here, 'og-card.html')).href, { waitUntil: 'load' });
await card.evaluate(() => document.fonts.ready);
await card.waitForTimeout(400);
await card.screenshot({ path: join(here, 'site/assets/og-jordipeguero.jpg'), type: 'jpeg', quality: 86 });
console.log('· assets/og-jordipeguero.jpg  1200x630');

// — dossier PDF —
const site = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await site.goto(pathToFileURL(join(here, 'site/index.html')).href, { waitUntil: 'load' });
await site.evaluate(() => document.fonts.ready);
await site.waitForTimeout(600);
await site.pdf({
  path: join(here, 'site/assets/cv-jordi-peguero.pdf'),
  format: 'A4', printBackground: false,
  margin: { top: '16mm', bottom: '16mm', left: '15mm', right: '15mm' },
});
console.log('· assets/cv-jordi-peguero.pdf');

await browser.close();
