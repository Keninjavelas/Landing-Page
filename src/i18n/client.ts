'use client';

import { useEffect, useMemo, useState } from 'react';
import { defaultLocale, type Locale } from './config';

type Translations = Record<string, unknown>;
const cache = new Map<string, Translations>();
const defaultCacheKey = `${defaultLocale}:common`;

class SimpleI18n {
  language: Locale = defaultLocale;
  resolvedLanguage: Locale = defaultLocale;
  changeLanguage = (lng: Locale) => {
    this.language = lng;
    this.resolvedLanguage = lng;
  };
}

const i18n = new SimpleI18n();

export function useClientTranslation(
  locale: Locale,
  ns: string = 'common',
  options: { keyPrefix?: string } = {}
) {
  const [dict, setDict] = useState<Translations>(() => cache.get(`${locale}:${ns}`) ?? {});
  const [defaultDict, setDefaultDict] = useState<Translations>(() => cache.get(defaultCacheKey) ?? {});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      i18n.changeLanguage(locale);

      // Load selected locale
      const key = `${locale}:${ns}`;
      if (!cache.get(key)) {
        try {
          const mod = (await import(`./locales/${locale}/${ns}.json`)) as unknown;
          const data = ((mod as { default?: unknown }).default ?? mod) as Translations;
          cache.set(key, data);
        } catch (e) {
          console.warn(`[i18n] Failed to load ${locale}/${ns}.json`, e);
          cache.set(key, {});
        }
      }

      // Load default locale for fallback
      if (!cache.get(defaultCacheKey)) {
        try {
          const mod = (await import(`./locales/${defaultLocale}/${ns}.json`)) as unknown;
          const data = ((mod as { default?: unknown }).default ?? mod) as Translations;
          cache.set(defaultCacheKey, data);
        } catch (e) {
          console.warn(`[i18n] Failed to load default ${defaultLocale}/${ns}.json`, e);
          cache.set(defaultCacheKey, {});
        }
      }

      if (!cancelled) {
        setDict(cache.get(key) as Translations);
        setDefaultDict(cache.get(defaultCacheKey) as Translations);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [locale, ns]);

  const t = useMemo(() => {
    const prefix = options.keyPrefix ? `${options.keyPrefix}.` : '';
    return (key: string) => {
      const path = (prefix + key).split('.');
      let cur: unknown = dict;
      for (const k of path) {
        if (typeof cur === 'object' && cur !== null && k in (cur as Record<string, unknown>)) {
          cur = (cur as Record<string, unknown>)[k];
        } else {
          // Missing key: warn in dev and fallback to default locale
          if (typeof window !== 'undefined') {
            console.warn(`[i18n] Missing translation for '${prefix + key}' in locale '${locale}'.`);
          }
          // Try default locale
          let curDefault: unknown = defaultDict;
          for (const k2 of path) {
            if (typeof curDefault === 'object' && curDefault !== null && k2 in (curDefault as Record<string, unknown>)) {
              curDefault = (curDefault as Record<string, unknown>)[k2];
            } else {
              return prefix ? `${prefix}${key}` : key;
            }
          }
          return typeof curDefault === 'string' ? curDefault : (prefix ? `${prefix}${key}` : key);
        }
      }
      return typeof cur === 'string' ? cur : key;
    };
  }, [dict, defaultDict, options.keyPrefix, locale]);

  return { t, i18n };
}
