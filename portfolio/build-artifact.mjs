/**
 * site/index.html es la fuente única.
 * Este script genera artifact.html: el mismo documento adaptado al publicador
 * de Artifacts, que no admite <!doctype>/<html>/<head>/<body> ni archivos locales.
 *
 * Tres diferencias respecto al sitio publicado:
 *   · las tipografías se piden a Google Fonts en vez de a assets/fonts/
 *   · el título se acorta al nombre (en el sitio lleva el cargo, por SEO)
 *   · la descarga del CV pasa a imprimir, porque el PDF no viaja con el HTML
 *
 *   node portfolio/build-artifact.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, 'site/index.html'), 'utf8');

const pick = (re, label) => {
  const m = src.match(re);
  if (!m) throw new Error('No encuentro ' + label + ' en site/index.html');
  return m[0];
};

const GOOGLE_FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' +
  'family=Archivo:wdth,wght@62..125,100..900&family=DM+Mono&family=Instrument+Sans:wght@400..700&display=swap">';

const style = pick(/<style>[\s\S]*?<\/style>/, 'el bloque <style>');
let body = pick(/<body>[\s\S]*<\/body>/, 'el <body>')
  .replace(/^<body>\n?/, '')
  .replace(/<\/body>$/, '');

// el PDF no viaja con el artifact: la descarga se convierte en imprimir
const before = body;
body = body.replaceAll('href="assets/cv-jordi-peguero.pdf" download data-cv', 'href="#" data-print data-cv');
if (body === before) throw new Error('No he encontrado ningún enlace de descarga del CV que adaptar');

const out = ['<title>Jordi Peguero</title>', GOOGLE_FONTS, style, body].join('\n');
writeFileSync(join(here, 'artifact.html'), out);
console.log('artifact.html · ' + out.length + ' bytes');
