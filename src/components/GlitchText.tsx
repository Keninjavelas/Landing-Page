'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { type Locale } from '@/i18n/config';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  enableSecretGame?: boolean;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01₿∞§¶•ªº∆∏π';

export default function GlitchText({ 
  children, 
  className = '', 
  as: Tag = 'h1',
  enableSecretGame = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as Locale;

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(children);
      return;
    }

    const originalText = children;
    
    // Continuous glitch effect while hovering
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            // Randomly glitch 30% of characters
            if (Math.random() < 0.3) {
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            return originalText[index];
          })
          .join('')
      );
    }, 50); // Update every 50ms for continuous effect

    return () => clearInterval(interval);
  }, [isHovering, children]);

  const handleClick = () => {
    if (enableSecretGame && locale) {
      router.push(`/${locale}/secret-game`);
    }
  };

  return (
    <Tag
      className={`glitch-text ${className} ${enableSecretGame ? 'cursor-pointer select-none' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-block',
        transition: 'all 0.3s ease',
        pointerEvents: enableSecretGame ? 'auto' : undefined,
        userSelect: enableSecretGame ? 'none' : undefined,
        ...(isHovering && enableSecretGame && {
          textShadow: `
            2px 2px 0 rgba(255, 0, 255, 0.7),
            -2px -2px 0 rgba(0, 255, 255, 0.7),
            0 0 20px currentColor,
            0 0 40px currentColor
          `,
          transform: 'scale(1.05)',
          filter: 'brightness(1.2)',
        }),
        ...(isHovering && !enableSecretGame && {
          textShadow: `
            2px 2px 0 rgba(255, 0, 255, 0.7),
            -2px -2px 0 rgba(0, 255, 255, 0.7),
            0 0 20px currentColor
          `,
          transform: 'scale(1.02)',
        })
      }}
      title={enableSecretGame && isHovering ? '🎮 Click to play!' : undefined}
    >
      {displayText}
    </Tag>
  );
}
