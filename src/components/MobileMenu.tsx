'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { PAGES, TOUCH_TARGET_MIN_SIZE } from '@/app/constants';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileMenuProps {
  locale: Locale;
  currentPage: string;
}

export default function MobileMenu({ locale, currentPage }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        style={{ minWidth: TOUCH_TARGET_MIN_SIZE, minHeight: TOUCH_TARGET_MIN_SIZE }}
      >
        <span
          className={`w-6 h-0.5 bg-neon-cyan transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-neon-cyan transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-neon-cyan transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-bg-darker bg-opacity-95 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <nav
          className="flex flex-col items-center justify-center h-full gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {PAGES.map((page) => (
            <Link
              key={page}
              href={`/${locale}/${page}`}
              className={`text-2xl font-mono uppercase tracking-wider transition-all px-6 py-3 rounded-lg ${
                currentPage === page
                  ? 'text-neon-cyan text-glow border-2 border-neon-cyan'
                  : 'text-text-secondary hover:text-neon-gold'
              }`}
              style={{ minHeight: TOUCH_TARGET_MIN_SIZE }}
              onClick={() => setIsOpen(false)}
            >
              {page}
            </Link>
          ))}

          {/* Theme Toggle in Mobile Menu */}
          <div className="mt-8 pt-8 border-t border-neon-cyan border-opacity-30">
            <div className="flex flex-col items-center gap-3">
              <span className="text-text-secondary text-sm font-mono uppercase tracking-wider">
                Theme
              </span>
              <ThemeToggle 
                variant="inline" 
                className="px-6 py-3 text-xl"
              />
              <span className="text-text-muted text-xs font-mono">
                {theme === 'futuristic' ? 'Switch to Retro' : 'Switch to Futuristic'}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

