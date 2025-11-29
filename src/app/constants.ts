/**
 * Application-wide constants
 */

export const PAGES = ['home', 'about', 'projects', 'contact'] as const;
export type Page = typeof PAGES[number];

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 550,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const TOUCH_TARGET_MIN_SIZE = 44; // Minimum touch target size in pixels (WCAG)

export const DEBOUNCE_DELAY = 300;

export const LOCAL_STORAGE_KEYS = {
  theme: 'portfolioTheme',
  audioGenre: 'audioGenre',
  audioMuted: 'audioMuted',
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/aryankapoor',
  linkedin: 'https://linkedin.com/in/aryankapoor',
  twitter: 'https://twitter.com/aryankapoor',
} as const;

export const CONTACT_EMAIL = 'aryankapoor0303@gmail.com';
export const PORTFOLIO_URL = 'https://landing-page-sandy-alpha-26.vercel.app';

export const RESPONSE_TIME_HOURS = 24;
export const BUSINESS_HOURS = {
  weekdays: { start: '9:00 AM', end: '6:00 PM', timezone: 'EST' },
  weekends: 'Available for emergencies',
} as const;

