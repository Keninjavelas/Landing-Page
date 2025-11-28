'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

type ThemeToggleProps = {
  variant?: 'floating' | 'inline';
  className?: string;
};

export default function ThemeToggle({ variant = 'floating', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleToggle = () => toggleTheme();
    window.addEventListener('toggleTheme', handleToggle);
    return () => window.removeEventListener('toggleTheme', handleToggle);
  }, [toggleTheme]);

  const common = `border-2 rounded-lg font-mono transition-all duration-300 flex items-center gap-2 ${className}`;
  const themeColors = theme === 'futuristic'
    ? 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-bg-dark'
    : 'border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-bg-dark';

  if (variant === 'inline') {
    return (
      <button
        onClick={toggleTheme}
        className={`px-3 py-2 pointer-events-auto ${common} ${themeColors}`}
        aria-label="Toggle theme"
        title={theme === 'futuristic' ? 'Switch to Retro' : 'Switch to Futuristic'}
      >
        <span className="text-lg">{theme === 'futuristic' ? '🎨' : '🚀'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-24 right-4 z-50 px-4 py-3 bg-bg-darker shadow-lg pointer-events-auto ${common} ${themeColors}`}
      style={{
        boxShadow:
          theme === 'futuristic'
            ? '0 0 20px rgba(0, 255, 255, 0.5)'
            : '0 0 20px rgba(255, 165, 0, 0.5)',
      }}
      aria-label="Toggle theme"
      title={theme === 'futuristic' ? 'Switch to Retro' : 'Switch to Futuristic'}
    >
      <span className="text-lg">{theme === 'futuristic' ? '🎨' : '🚀'}</span>
      <span className="hidden sm:inline">
        {theme === 'futuristic' ? 'RETRO MODE' : 'FUTURE MODE'}
      </span>
    </button>
  );
}

