// Build gate. One broken rule on this page destroys the credibility play.
import { readFileSync } from 'node:fs';
const src = readFileSync('index.html', 'utf8');
const text = src.replace(/<script[\s\S]*?<\/script>/g, '')
                .replace(/<style[\s\S]*?<\/style>/g, '');
let fail = 0;
const bad = (m) => { console.error('FAIL ' + m); fail = 1; };

// 1. Em-dash may ONLY follow a negation prefix.
const OK = ['UN', 'MIS', 'DIS', 'IM', 'Em', 'em', 'un'];
for (const m of text.matchAll(/([A-Za-z]+)—/g)) {
  if (!OK.includes(m[1])) bad(`em-dash after non-negation prefix: "${m[1]}—"`);
}
// 2. Negation prefixes in display copy must NOT use a plain hyphen.
for (const m of text.matchAll(/\b(UN|MIS|DIS|IM)-([A-Z]{2,})/g)) {
  bad(`negation prefix using hyphen: "${m[0]}" (should be em-dash)`);
}
// 3. Ordinary compounds must NOT use an em-dash.
for (const c of ['PRE—ORDER', 'MONTH—TO', 'FIRST—COME', 'LOCK—IN']) {
  if (text.includes(c)) bad(`ordinary compound using em-dash: "${c}"`);
}
// 4. No green anywhere: green + our red reads as a clearance-sale palette.
for (const m of src.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
  const [r, g, b] = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16));
  if (g > 110 && g > r + 45 && g > b + 45) bad(`green-family colour: #${m[1]}`);
}
// 5. No border-radius above 0.
for (const m of src.matchAll(/border-radius:\s*([^;}]+)/g)) {
  if (!/^0(px|rem|%)?$/.test(m[1].trim())) bad(`non-zero border-radius: ${m[1].trim()}`);
}
console.log(fail ? '\n✗ LINT FAILED' : '✓ lint clean — em-dash rule, palette and radius all hold');
process.exit(fail);
