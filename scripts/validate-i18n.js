const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const locales = fs.readdirSync(localesDir).filter((d) => fs.statSync(path.join(localesDir, d)).isDirectory());
const ns = 'common';

function readJson(locale) {
  const file = path.join(localesDir, locale, `${ns}.json`);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) {
    console.error(`[i18n] Failed to read ${file}:`, e.message);
    return {};
  }
}

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const defaultLocale = 'en';
const base = flatten(readJson(defaultLocale));

let hasIssues = false;
for (const locale of locales) {
  if (locale === defaultLocale) continue;
  const data = flatten(readJson(locale));
  const missing = Object.keys(base).filter((k) => !(k in data));
  const extra = Object.keys(data).filter((k) => !(k in base));

  if (missing.length || extra.length) {
    hasIssues = true;
    console.log(`\nLocale '${locale}':`);
    if (missing.length) {
      console.log(`  Missing (${missing.length}):`);
      missing.slice(0, 50).forEach((k) => console.log(`    - ${k}`));
      if (missing.length > 50) console.log(`    ...and ${missing.length - 50} more`);
    }
    if (extra.length) {
      console.log(`  Extra (${extra.length}):`);
      extra.slice(0, 50).forEach((k) => console.log(`    - ${k}`));
      if (extra.length > 50) console.log(`    ...and ${extra.length - 50} more`);
    }
  }
}

if (!hasIssues) {
  console.log('All locales are consistent with the default locale.');
  process.exit(0);
} else {
  process.exit(1);
}