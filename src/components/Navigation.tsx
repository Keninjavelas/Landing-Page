'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useTransition, useRef, useEffect } from 'react';
import { locales, type Locale } from '@/i18n/config';
import { useClientTranslation } from '@/i18n/client';
import MobileMenu from './MobileMenu';
import AudioControl from './AudioControl';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  locale: Locale;
}

const pages = ['home', 'about', 'projects', 'contact'];

const flagEmojis: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
};

export default function Navigation({ locale }: NavigationProps) {
  const pathname = usePathname();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { t } = useClientTranslation(locale);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  
  // Determine current page robustly: /{locale}/{page}? -> page; /{locale} -> home
  const segments = pathname.split('/').filter(Boolean);
  const currentPage = segments[1] ?? 'home';

  // Click outside to close language menu
  useEffect(() => {
    if (!isLangMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  // Change locale while preserving path, query, and hash
  const changeLocale = (newLocale: Locale) => {
    setIsLangMenuOpen(false);
    
    startTransition(() => {
      // Use URL to robustly preserve query and hash
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const parts = url.pathname.split('/').filter(Boolean);
        // Ensure we always have at least locale segment
        if (parts.length === 0) {
          url.pathname = `/${newLocale}`;
        } else {
          parts[0] = newLocale;
          url.pathname = `/${parts.join('/')}`;
        }
        const newPath = url.pathname + url.search + url.hash;
        
        // Use replace for instant navigation
        window.location.href = newPath;
      }
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-darker bg-opacity-95 border-b border-neon-cyan backdrop-blur-sm pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href={`/${locale}/home`}
          className="text-2xl font-bold text-amber-500 font-mono tracking-tighter hover:text-amber-400 transition-all pointer-events-auto"
          aria-label={t('home.title')}
        >
          ◈ ARYAN KAPOOR
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <div className="hidden md:flex gap-6">
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${locale}/${page}`}
                className={`font-mono text-sm uppercase tracking-wider transition-all duration-200 pointer-events-auto ${
                  currentPage === page
                    ? 'text-neon-cyan text-glow'
                    : 'text-text-secondary hover:text-neon-gold'
                }`}
              >
                {t(`nav.${page}`)}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <MobileMenu locale={locale} currentPage={currentPage} />

          {/* Audio Control */}
          <div className="pointer-events-auto">
            <AudioControl />
          </div>

          {/* Theme Toggle */}
          <div className="pointer-events-auto">
            <ThemeToggle variant="inline" className="px-2 py-2" />
          </div>

          {/* Language Selector */}
          <div className="relative hidden md:block pointer-events-auto" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              disabled={isPending}
              className={`px-3 py-2 text-lg border border-neon-cyan rounded hover:bg-neon-cyan hover:bg-opacity-20 transition-all pointer-events-auto ${
                isPending ? 'opacity-50 cursor-wait animate-pulse' : ''
              }`}
              aria-label="Select language"
            >
              {isPending ? '⏳' : flagEmojis[locale]}
            </button>

            {isLangMenuOpen && !isPending && (
              <div className="absolute top-full right-0 mt-2 bg-bg-darker border border-neon-cyan rounded overflow-hidden shadow-lg z-50 pointer-events-auto"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
              >
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => changeLocale(loc)}
                    className={`block w-full px-4 py-2 text-center hover:bg-neon-cyan hover:bg-opacity-20 transition-all pointer-events-auto ${
                      locale === loc ? 'bg-neon-cyan bg-opacity-10' : ''
                    }`}
                  >
                    {flagEmojis[loc]} {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
}
