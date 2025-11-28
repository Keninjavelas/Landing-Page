'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'futuristic' | 'retro';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('futuristic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('portfolioTheme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portfolioTheme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'futuristic' ? 'retro' : 'futuristic'));
  };

  // Always provide context value, even during SSR
  // This prevents "useTheme must be used within a ThemeProvider" errors
  const contextValue: ThemeContextType = {
    theme: mounted ? theme : 'futuristic',
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

