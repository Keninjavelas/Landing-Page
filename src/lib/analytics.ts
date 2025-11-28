/**
 * Analytics utility functions
 * Supports multiple analytics providers
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Fallback console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { category, action, label, value });
  }
}

export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
      page_title: title,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Page View:', { url, title });
  }
}

export function trackContactFormSubmission() {
  trackEvent('Contact', 'Form Submission', 'Contact Form');
}

export function trackThemeToggle(theme: string) {
  trackEvent('UI', 'Theme Toggle', theme);
}

export function trackNavigation(page: string) {
  trackEvent('Navigation', 'Page View', page);
}

export function trackSocialShare(platform: string) {
  trackEvent('Social', 'Share', platform);
}

export function trackDownload(type: string) {
  trackEvent('Download', 'File Download', type);
}

