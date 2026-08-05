// Build gate. One broken rule on this page destroys the credibility play.
//
// The dash rule is the important one. CUNIN types an EN DASH (U+2013) after a
// negation prefix -- verified from their own Instagram bio ("For the IM–perfects.")
// and a post caption ("Stay MIS–READ"). Not a hyphen, not an em dash. Their poster
// artwork reads as a longer dash, but a glyph in a JPEG can't be measured, so we
// match the character they demonstrably type.
import { readFileSync } from 'node:fs';

const EN = '–';
const EM = '—';
const PREFIX = /\b(UN|MIS|DIS|IM)([–—-])([A-Za-z])/g;

const src = readFileSync(process.argv[2] ?? 'index.html', 'utf8');
const text = src.replace(/<script[\s\S]*?<\/script>/g, '')
                .replace(/<style[\s\S]*?<\/style>/g, '');

let fail = 0;
const bad = (m) => { console.error('FAIL ' + m); fail = 1; };

// 1. A negation prefix must be followed by an en dash, never a hyphen or em dash.
for (const m of text.matchAll(PREFIX)) {
  if (m[2] === EN) continue;
  bad(`"${m[1]}${m[2]}${m[3]}" uses ${m[2] === EM ? 'an em dash' : 'a hyphen'}; needs en dash`);
}

// 2. An en dash may ONLY follow a negation prefix. It is not a prose dash.
for (const m of text.matchAll(new RegExp(`(\\w{0,3})${EN}`, 'g'))) {
  if (!/(UN|MIS|DIS|IM)$/i.test(m[1])) bad(`stray en dash after "${m[1]}"`);
}

// 3. Ordinary compounds keep a plain hyphen.
for (const w of ['PRE', 'MONTH', 'FIRST', 'LOCK', 'TO']) {
  for (const d of [EN, EM]) {
    if (text.includes(w + d)) bad(`ordinary compound "${w}${d}" should use a hyphen`);
  }
}

// 4. No green anywhere: green beside the accent red reads as a clearance-sale palette.
for (const m of src.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
  const [r, g, b] = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16));
  if (g > 110 && g > r + 45 && g > b + 45) bad(`green-family colour: #${m[1]}`);
}

// 5. No non-zero border-radius.
for (const m of src.matchAll(/border-radius:\s*([^;}]+)/g)) {
  if (!/^0(px|rem|%)?$/.test(m[1].trim())) bad(`non-zero border-radius: ${m[1].trim()}`);
}

console.log(fail ? '\n✗ LINT FAILED' : '✓ lint clean — dash rule, palette and radius all hold');
process.exit(fail);
