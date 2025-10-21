'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageFlipContainerProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
    },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
    },
  }),
};

export default function PageFlipContainer({ children }: PageFlipContainerProps) {
  const pathname = usePathname();
  const [direction, setDirection] = useState(0);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    // Determine direction based on page order
    const pages = ['home', 'about', 'projects', 'contact'];
    const currentPage = pathname.split('/').pop() || 'home';
    const prevPage = prevPath.split('/').pop() || 'home';
    
    const currentIndex = pages.indexOf(currentPage);
    const prevIndex = pages.indexOf(prevPage);
    
    setDirection(currentIndex > prevIndex ? 1 : -1);
    setPrevPath(pathname);
  }, [pathname, prevPath]);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
