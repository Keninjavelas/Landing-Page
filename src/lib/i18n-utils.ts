/**
 * Internationalization utility functions
 */

import { type Locale } from '@/i18n/config';

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatNumber(number: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale).format(number);
}

export function formatCurrency(amount: number, locale: Locale, currency = 'USD'): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Get text direction for locale (LTR or RTL)
 */
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  // Add RTL locales here if needed
  const rtlLocales: Locale[] = [];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

