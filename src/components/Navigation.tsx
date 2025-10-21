'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales, type Locale } from '@/i18n/config';

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
  
  const currentPage = pathname.split('/').pop() || 'home';

  const changeLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-bg-darker bg-opacity-95 border-b border-neon-cyan backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href={`/${locale}/home`}
          className="text-2xl font-bold text-neon-cyan font-mono tracking-tighter hover:text-glow-strong transition-all"
        >
          ◈ SYSTEM
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${locale}/${page}`}
                className={`font-mono text-sm uppercase tracking-wider transition-all duration-200 ${
                  currentPage === page
                    ? 'text-neon-cyan text-glow'
                    : 'text-text-secondary hover:text-neon-gold'
                }`}
              >
                {page}
              </Link>
            ))}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="px-3 py-2 text-lg border border-neon-cyan rounded hover:bg-neon-cyan hover:bg-opacity-20 transition-all"
            >
              {flagEmojis[locale]}
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-bg-darker border border-neon-cyan rounded overflow-hidden shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
              >
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={changeLocale(loc)}
                    onClick={() => setIsLangMenuOpen(false)}
                    className={`block px-4 py-2 text-center hover:bg-neon-cyan hover:bg-opacity-20 transition-all ${
                      locale === loc ? 'bg-neon-cyan bg-opacity-10' : ''
                    }`}
                  >
                    {flagEmojis[loc]} {loc.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-4 flex gap-4 justify-center">
        {pages.map((page) => (
          <Link
            key={page}
            href={`/${locale}/${page}`}
            className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              currentPage === page
                ? 'text-neon-cyan text-glow'
                : 'text-text-secondary'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
    </nav>
  );
}
