'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-4 z-50 w-12 h-12 bg-bg-darker border-2 border-neon-cyan rounded-full text-neon-cyan font-mono text-xl hover:bg-neon-cyan hover:text-bg-dark transition-all duration-300 flex items-center justify-center shadow-lg"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

