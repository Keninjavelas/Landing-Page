'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/i18n/config';

interface KeyboardShortcutsProps {
  locale: Locale;
}

const shortcuts = [
  { key: '?', description: 'Show/hide keyboard shortcuts' },
  { key: 'H', description: 'Go to Home' },
  { key: 'A', description: 'Go to About' },
  { key: 'P', description: 'Go to Projects' },
  { key: 'C', description: 'Go to Contact' },
  { key: 'T', description: 'Toggle theme' },
  { key: 'ESC', description: 'Close dialogs/modals' },
];

export default function KeyboardShortcuts({ locale }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Toggle shortcuts help
      if (e.key === '?' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Close shortcuts with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Navigation shortcuts
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        router.push(`/${locale}/home`);
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        router.push(`/${locale}/about`);
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        router.push(`/${locale}/projects`);
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        router.push(`/${locale}/contact`);
      }

      // Theme toggle (T key)
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        const event = new CustomEvent('toggleTheme');
        window.dispatchEvent(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [locale, router, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-bg-dark bg-opacity-95 z-50 flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div
        className="max-w-2xl w-full border-2 border-neon-cyan p-8 rounded-lg bg-bg-darker"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="shortcuts-title"
            className="text-2xl text-neon-cyan font-mono"
          >
            [ KEYBOARD SHORTCUTS ]
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neon-pink hover:text-neon-cyan font-mono text-xl"
            aria-label="Close shortcuts"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between p-4 border border-neon-cyan border-opacity-30 rounded-lg"
            >
              <span className="text-text-secondary font-mono">
                {shortcut.description}
              </span>
              <kbd className="px-3 py-1 bg-bg-dark border border-neon-cyan rounded font-mono text-neon-cyan text-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-text-muted font-mono text-sm">
            Press <kbd className="px-2 py-1 bg-bg-dark border border-neon-cyan rounded text-neon-cyan">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}

