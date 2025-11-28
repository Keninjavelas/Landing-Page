'use client';

import { useEffect, useRef, useState, useCallback, memo, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useRouter, useParams } from 'next/navigation';
import { type Locale } from '@/i18n/config';

const Robot3DScene = lazy(() => import('./Robot3D'));

type Point = { x: number; y: number };

interface Robot3DMascotProps {
  themeColor: string;
}

const STORAGE_KEY = 'robotMascotPosition';
const MARGIN = 16;
const NAV_HEIGHT = 72; // keep mascot below the nav bar
const MASCOT_SIZE = 192;
const DIALOGUE_DURATION = 4000;
const DIALOGUE_MIN_INTERVAL = 15000;
const DIALOGUE_MAX_INTERVAL = 30000;

const ROBOT_DIALOGUES = [
  'Analyzing quantum flux...',
  'Systems optimal! ���',
  'Beep boop! Hello human!',
  'Running diagnostics...',
  'All circuits functioning!',
  'Initiating creative mode...',
  'Neural networks synced!',
  'Processing creativity data...',
  'Innovation protocols active!',
  'Ready to assist! ⚡',
] as const;

function Robot3DMascot({ themeColor }: Robot3DMascotProps) {
  const [position, setPosition] = useState<Point | null>(null);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dialogue, setDialogue] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as Locale;
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleNameClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (locale) {
      router.push(`/${locale}/secret-game`);
    }
  }, [locale, router]);

  const clampWithinViewport = useCallback((p: Point): Point => {
    const maxX = Math.max(MARGIN, window.innerWidth - MASCOT_SIZE - MARGIN);
    const minY = NAV_HEIGHT + MARGIN; // don't overlap navigation
    const maxY = Math.max(minY, window.innerHeight - MASCOT_SIZE - MARGIN);
    return {
      x: Math.min(Math.max(MARGIN, p.x), maxX),
      y: Math.min(Math.max(minY, p.y), maxY),
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPosition(clampWithinViewport(JSON.parse(saved)));
        return;
      }
    } catch {}
    
    setPosition({
      x: window.innerWidth - MASCOT_SIZE - MARGIN,
      y: window.innerHeight - MASCOT_SIZE - MARGIN,
    });

    const handleResize = () => setPosition(p => (p ? clampWithinViewport(p) : p));
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [clampWithinViewport]);

  // Dialogue system (disabled if reduced motion preference is set)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const showRandomDialogue = () => {
      const i = Math.floor(Math.random() * ROBOT_DIALOGUES.length);
      setDialogue(ROBOT_DIALOGUES[i]);
      setShowDialogue(true);
      setTimeout(() => setShowDialogue(false), DIALOGUE_DURATION);
    };

    const initialTimeout = setTimeout(showRandomDialogue, 2500);
    const interval = setInterval(
      showRandomDialogue,
      Math.random() * (DIALOGUE_MAX_INTERVAL - DIALOGUE_MIN_INTERVAL) + DIALOGUE_MIN_INTERVAL
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [prefersReducedMotion]);

  const startDrag = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({ x: clientX - rect.left, y: clientY - rect.top });
    setIsDragging(true);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startDrag(e.clientX, e.clientY);
    },
    [startDrag]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches[0]) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [startDrag]
  );

  useEffect(() => {
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    const handleMove = (clientX: number, clientY: number) => {
      setPosition(p =>
        p
          ? {
              x: clamp(clientX - dragOffset.x, 0, window.innerWidth - MASCOT_SIZE),
              y: clamp(clientY - dragOffset.y, NAV_HEIGHT, window.innerHeight - MASCOT_SIZE),
            }
          : null
      );
    };

    const handleMouseMove = (e: MouseEvent) => isDragging && handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) =>
      isDragging && e.touches[0] && handleMove(e.touches[0].clientX, e.touches[0].clientY);

    const handleRelease = () => {
      setIsDragging(false);
      if (position) {
        const clamped = clampWithinViewport(position);
        setPosition(clamped);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clamped));
        } catch {}
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
  }, [isDragging, dragOffset, position, clampWithinViewport]);

  if (!position) return null;

  return (
    <div
      ref={containerRef}
  className="fixed w-48 h-48 z-40 transition-opacity"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        pointerEvents: 'auto',
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDragStart={(e) => e.preventDefault()}
    >
      {showDialogue && (
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-mono animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: themeColor,
            border: `2px solid ${themeColor}`,
            boxShadow: `0 0 20px ${themeColor}40`,
          }}
        >
          {dialogue}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: `8px solid ${themeColor}`,
            }}
          />
        </div>
      )}

      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-xl" style={{ backgroundColor: themeColor }} />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: !prefersReducedMotion }}
          frameloop={prefersReducedMotion ? 'demand' : 'always'}
          dpr={prefersReducedMotion ? 1 : [1, 2]}
        >
          <Suspense fallback={null}>
            <Robot3DScene themeColor={themeColor} />
          </Suspense>
        </Canvas>

        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono tracking-wider whitespace-nowrap opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
          style={{ color: themeColor }}
          onClick={handleNameClick}
          title="🎮 Click to play mini-game!"
        >
          ROBOT-3000
        </div>
      </div>
    </div>
  );
}

export default memo(Robot3DMascot);
