'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const scrollProgress = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-neon-cyan transition-all duration-150 z-50"
      style={{
        width: `${progress}%`,
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}

