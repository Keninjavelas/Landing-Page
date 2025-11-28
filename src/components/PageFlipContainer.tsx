'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageFlipContainerProps {
  children: React.ReactNode;
}

export default function PageFlipContainer({ children }: PageFlipContainerProps) {
  const pathname = usePathname();
  const [direction, setDirection] = useState(1);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    // Determine direction based on page order
    const pages = ['home', 'about', 'projects', 'contact', 'secret-game'];
    
    // Extract page name (ignore locale)
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[1] || 'home';
    const prevSegments = prevPath.split('/').filter(Boolean);
    const prevPage = prevSegments[1] || 'home';
    
    // Only set direction if the actual page changed
    if (currentPage !== prevPage) {
      const currentIndex = pages.indexOf(currentPage);
      const prevIndex = pages.indexOf(prevPage);
      setDirection(currentIndex > prevIndex ? 1 : -1);
    }
    
    setPrevPath(pathname);
  }, [pathname, prevPath]);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <div key={pathname}>{children}</div>;
  }

  // Book page flip animation
  const pageVariants = {
    initial: {
      rotateY: direction > 0 ? -15 : 15,
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      rotateY: direction > 0 ? 15 : -15,
      opacity: 0,
      scale: 0.95,
    },
  };

  return (
    <div style={{ perspective: '1500px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
