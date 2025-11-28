'use client';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import type { Locale } from '@/i18n/config';
import { lazy, Suspense } from 'react';

// Lazy load components
const KeyboardShortcuts = lazy(() => import('./KeyboardShortcuts'));
const Robot3DMascot = lazy(() => import('./Robot3DMascot'));
const RetroMascot = lazy(() => import('./RetroMascot'));

// ⚠️ WARNING: Mascots may cause performance issues
// RetroMascot has heavy animations that can cause lag
// Robot3DMascot loads Three.js which is ~150KB
function ThemedMascot() {
  const { theme } = useTheme();
  return (
    <Suspense fallback={null}>
      {theme === 'retro' ? (
        <RetroMascot themeColor="#ff6600" />
      ) : (
        <Robot3DMascot themeColor="#00ffff" />
      )}
    </Suspense>
  );
}

export default function ThemeWrapper({ 
  children,
  locale 
}: { 
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <ThemeProvider>
      {children}
      <ThemedMascot />
      {locale && (
        <Suspense fallback={null}>
          <KeyboardShortcuts locale={locale} />
        </Suspense>
      )}
    </ThemeProvider>
  );
}

