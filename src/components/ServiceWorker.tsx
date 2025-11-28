'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      !mounted ||
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Service Worker registered:', registration);
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Service Worker registration failed:', error);
        }
      });
  }, [mounted]);

  return null;
}

