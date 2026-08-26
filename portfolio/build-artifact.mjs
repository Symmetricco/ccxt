/**
 * index.html es la fuente única.
 * Este script genera artifact.html: el mismo documento sin el esqueleto
 * <!doctype>/<html>/<head>/<body>, que es lo que espera el publicador de Artifacts.
 *
 *   node portfolio/build-artifact.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, 'index.html'), 'utf8');

const pick = (re, label) => {
  const m = src.match(re);
  if (!m) throw new Error('No encuentro ' + label + ' en index.html');
  return m[0];
};

const title = pick(/<title>[\s\S]*?<\/title>/, 'el <title>');
const fonts = pick(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, 'el link de Google Fonts');
const style = pick(/<style>[\s\S]*?<\/style>/, 'el bloque <style>');
const body  = pick(/<body>[\s\S]*<\/body>/, 'el <body>')
  .replace(/^<body>\n?/, '')
  .replace(/<\/body>$/, '');

const out = [title, fonts, style, body].join('\n');
writeFileSync(join(here, 'artifact.html'), out);
console.log('artifact.html · ' + out.length + ' bytes');
