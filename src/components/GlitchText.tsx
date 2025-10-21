'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

export default function GlitchText({ 
  children, 
  className = '', 
  as: Tag = 'h1' 
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(children);
      return;
    }

    let iteration = 0;
    const originalText = children;
    
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return originalText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            // Scramble from right to left
            if (index >= originalText.length - iteration) {
              return originalText[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('');
      });

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovering, children]);

  return (
    <Tag
      className={`glitch-text ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </Tag>
  );
}
