'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MascotFollowerProps {
  themeColor: string;
}

export default function MascotFollower({ themeColor }: MascotFollowerProps) {
  const angleDeg = useMotionValue(0);
  const angleSpring = useSpring(angleDeg, {
    stiffness: 150,
    damping: 20,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the core position (fixed at bottom center)
      const coreX = window.innerWidth / 2;
      const coreY = window.innerHeight - 80; // 80px from bottom

      // Calculate delta from core to mouse
      const deltaX = e.clientX - coreX;
      const deltaY = e.clientY - coreY;

      // Calculate angle in radians, then convert to degrees
      const angleRad = Math.atan2(deltaY, deltaX);
      const angle = angleRad * (180 / Math.PI) + 90; // +90 to adjust for initial rotation

      angleDeg.set(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [angleDeg]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      {/* Core Container */}
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border-2 opacity-60"
          style={{
            borderColor: themeColor,
            boxShadow: `0 0 20px ${themeColor}`,
          }}
        />

        {/* Inner Core */}
        <div
          className="absolute inset-4 rounded-full opacity-80"
          style={{
            backgroundColor: themeColor,
            boxShadow: `0 0 30px ${themeColor}, inset 0 0 20px rgba(255,255,255,0.5)`,
          }}
        />

        {/* Rotating Satellite */}
        <motion.div
          className="absolute inset-0"
          style={{ rotate: angleSpring }}
        >
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 0 15px ${themeColor}`,
            }}
          />
        </motion.div>

        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <div
              className="absolute left-1/2 top-0 w-px h-full -translate-x-1/2 opacity-30"
              style={{ backgroundColor: themeColor }}
            />
            <div
              className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 opacity-30"
              style={{ backgroundColor: themeColor }}
            />
          </div>
        </div>

        {/* Center Dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            backgroundColor: themeColor,
            boxShadow: `0 0 10px ${themeColor}`,
          }}
        />
      </div>

      {/* Label */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono tracking-wider whitespace-nowrap"
        style={{ color: themeColor }}
      >
        TRACKER ONLINE
      </div>
    </div>
  );
}
