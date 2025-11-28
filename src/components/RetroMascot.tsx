'use client';
import { useEffect, useState, useRef, useLayoutEffect, useCallback, memo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { type Locale } from '@/i18n/config';

interface RetroMascotProps {
  themeColor: string;
}

const STORAGE_KEY = 'retroMascotPosition' as const;
const MARGIN = 16;
const NAV_HEIGHT = 72;
const MASCOT_SIZE = 192;
const BLINK_DURATION = 150;
const BLINK_INTERVAL = 12000; // Reduced frequency for performance

function RetroMascot({ themeColor }: RetroMascotProps) {
  const [blinkState, setBlinkState] = useState(false);
  const [frameIndex] = useState(0); // Static frame for performance
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Respect system reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as Locale;

  const handleNameClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (locale) {
      router.push(`/${locale}/secret-game`);
    }
  }, [locale, router]);

  // Memoized clamp function
  const clampWithinViewport = useCallback((pos: { x: number; y: number }) => {
    const maxX = Math.max(0, window.innerWidth - MASCOT_SIZE - MARGIN);
    const minY = NAV_HEIGHT + MARGIN;
    const maxY = Math.max(minY, window.innerHeight - MASCOT_SIZE - MARGIN);
    return {
      x: Math.min(Math.max(MARGIN, pos.x), maxX),
      y: Math.min(Math.max(minY, pos.y), maxY),
    };
  }, []);

  // Set initial position (restore from localStorage, else bottom-left) and keep clamped on resize
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { x: number; y: number };
        setPosition(clampWithinViewport(parsed));
      } else {
        // Default to bottom-left to avoid overlapping right-side controls
        setPosition({
          x: MARGIN,
          y: window.innerHeight - MASCOT_SIZE - MARGIN,
        });
      }
    } catch {
      setPosition({ x: MARGIN, y: window.innerHeight - MASCOT_SIZE - MARGIN });
    }

    const handleResize = () => {
      setPosition((pos) => (pos ? clampWithinViewport(pos) : pos));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [clampWithinViewport]);

  // Simplified blink - less frequent for performance
  useEffect(() => {
    if (prefersReducedMotion) return;
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      blinkTimeoutRef.current = setTimeout(() => setBlinkState(false), BLINK_DURATION);
    }, BLINK_INTERVAL);
    return () => {
      clearInterval(blinkInterval);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [prefersReducedMotion]);

  // Optimized SVG sprite - removed heavy effects
  const RetroSprite = memo(function RetroSprite({ blink, frame, color }: { blink: boolean; frame: number; color: string }) {
    return (
      <>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full relative z-10"
          style={{ imageRendering: 'pixelated' }}
        >
          <g transform="translate(30, 20)">
            <path
              d="M 10,30 Q 10,10 30,10 Q 50,10 50,30 L 50,60 
                 L 45,55 L 40,60 L 35,55 L 30,60 L 25,55 L 20,60 L 15,55 L 10,60 Z"
              fill={color}
              stroke="#000"
              strokeWidth="2"
            />
            {blink ? (
              <>
                <line x1="14" y1="30" x2="26" y2="30" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                <line x1="34" y1="30" x2="46" y2="30" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="20" cy="28" rx="6" ry="8" fill="#fff" />
                <circle cx="21" cy="30" r="3" fill="#000" />
                <ellipse cx="40" cy="28" rx="6" ry="8" fill="#fff" />
                <circle cx="41" cy="30" r="3" fill="#000" />
              </>
            )}
            <circle cx="25" cy="45" r="1.5" fill="#000" />
            <circle cx="30" cy="47" r="1.5" fill="#000" />
            <circle cx="35" cy="45" r="1.5" fill="#000" />
            <ellipse cx="18" cy="20" rx="4" ry="6" fill="#fff" opacity="0.4" />
            <ellipse cx="42" cy="20" rx="4" ry="6" fill="#fff" opacity="0.4" />
          </g>
          <circle cx="15" cy="30" r="3" fill={color} opacity="0.7" />
          <circle cx="105" cy="50" r="3" fill={color} opacity="0.7" />
          <circle cx="15" cy="80" r="3" fill={color} opacity="0.7" />
          <circle cx="105" cy="90" r="3" fill={color} opacity="0.7" />
          <text
            x="60"
            y="110"
            textAnchor="middle"
            fill={color}
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {(frame * 100).toString().padStart(4, '0')}
          </text>
        </svg>
      </>
    );
  });

  // Optimized dragging handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, []);

  useEffect(() => {
    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition(pos =>
        pos
          ? {
              x: clamp(e.clientX - dragOffset.x, 0, window.innerWidth - MASCOT_SIZE),
              y: clamp(e.clientY - dragOffset.y, NAV_HEIGHT, window.innerHeight - MASCOT_SIZE),
            }
          : null
      );
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      setPosition(pos =>
        pos
          ? {
              x: clamp(e.touches[0].clientX - dragOffset.x, 0, window.innerWidth - MASCOT_SIZE),
              y: clamp(e.touches[0].clientY - dragOffset.y, NAV_HEIGHT, window.innerHeight - MASCOT_SIZE),
            }
          : null
      );
    };
    
    const handleRelease = () => {
      setIsDragging(false);
      // Persist on release
      if (position) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
        } catch {
          // Ignore storage errors
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseup', handleRelease);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleRelease);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleRelease);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleRelease);
    };
  }, [isDragging, dragOffset, position]);

  if (!position) return null;

  return (
    <div
      ref={containerRef}
  className="fixed z-40 select-none transition-opacity"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        pointerEvents: 'auto',
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Main character */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        <RetroSprite blink={blinkState} frame={frameIndex} color={themeColor} />
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono tracking-wider uppercase cursor-pointer hover:scale-110 transition-transform" 
          style={{ color: themeColor, textShadow: `0 0 10px ${themeColor}, 0 0 20px ${themeColor}50`, letterSpacing: '0.2em', pointerEvents: 'auto' }}
          onClick={handleNameClick}
          title="🎮 Click to play mini-game!"
        >
          ★ ARCADE MODE ★
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-bold" style={{ color: themeColor, textShadow: `0 0 8px ${themeColor}` }}><span className="animate-pulse">1UP</span></div>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(RetroMascot);
