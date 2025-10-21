'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { defaultLocale, type Locale } from './config';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: ['en', 'es', 'fr', 'de'],
    defaultNS: 'common',
    ns: ['common'],
    fallbackNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: runsOnServerSide,
    },
  });

export function useClientTranslation(
  locale: Locale,
  ns: string = 'common',
  options: { keyPrefix?: string } = {}
) {
  const { i18n, t } = i18next;

  if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale);
  }

  return {
    t,
    i18n,
  };
}
