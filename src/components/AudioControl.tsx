'use client';

import { useState, useEffect, useRef } from 'react';

type Genre = 'jazz' | 'piano';

// Audio file paths - simplified structure
const AUDIO_TRACKS: Record<Genre, string> = {
  jazz: '/audio/jazz.mp3',
  piano: '/audio/piano.mp3',
};

export default function AudioControl() {
  const [genre, setGenre] = useState<Genre>('jazz');
  const [isMuted, setIsMuted] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Ensure component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Click outside to close menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle audio playback with native HTML5 Audio
  useEffect(() => {
    if (!isMounted) return;
    
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      
      audioRef.current.addEventListener('error', (e) => {
        const audio = e.target as HTMLAudioElement;
        console.warn(`⚠️ Audio unavailable - this is normal if files aren't set up yet`);
        console.warn(`Source: ${audio.src}`);
        console.warn(`Error: ${audio.error?.message || 'Unknown error'}`);
        // Auto-mute on error to prevent repeated errors
        setIsMuted(true);
      });
      
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log(`✅ Audio loaded successfully: ${audioRef.current?.src}`);
      });
    }

    const audio = audioRef.current;
    const track = AUDIO_TRACKS[genre];

    if (!isMuted) {
      console.log(`🎵 Attempting to play: ${track}`);
      
      // Check if file exists first
      fetch(track, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            console.error(`❌ Audio file not found: ${track} (Status: ${response.status})`);
            setIsMuted(true);
            return;
          }
          console.log(`✅ Audio file exists: ${track}`);
          
          // Set source and type explicitly
          audio.src = track;
          audio.setAttribute('type', 'audio/mpeg');
          audio.load();
          
          audio.play()
            .then(() => {
              console.log(`▶️ Audio playing: ${track}`);
            })
            .catch((error) => {
              console.error(`❌ Failed to play:`, error);
              console.error('This might be due to browser autoplay policy');
            });
        })
        .catch(error => {
          console.error(`❌ Failed to check audio file:`, error);
          setIsMuted(true);
        });
    } else {
      audio.pause();
    }

    return () => {
      if (audio && !isMuted) {
        audio.pause();
      }
    };
  }, [genre, isMuted, isMounted]);

  const handleGenreChange = (newGenre: Genre) => {
    setGenre(newGenre);
    setIsMenuOpen(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative pointer-events-auto" ref={menuRef}>
      {/* Compact Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex items-center gap-2 px-3 py-2 border rounded font-mono text-sm transition-all duration-200 pointer-events-auto ${
          isMuted 
            ? 'border-text-muted text-text-muted hover:bg-text-muted hover:bg-opacity-20' 
            : 'border-neon-gold text-neon-gold hover:bg-neon-gold hover:bg-opacity-20 animate-pulse'
        }`}
        aria-label="Audio settings"
        title={isMuted ? 'Click to enable music' : 'Music playing'}
      >
        <span>{isMuted ? '🔇' : '♪'}</span>
        <span className="hidden lg:inline">{isMuted ? 'MUTED' : genre.toUpperCase()}</span>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-40 bg-bg-darker border border-neon-gold rounded overflow-hidden z-50 pointer-events-auto"
          style={{
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
          }}
        >
          {(['jazz', 'piano'] as Genre[]).map((g) => (
            <button
              key={g}
              onClick={() => handleGenreChange(g)}
              className={`w-full px-4 py-2 text-left font-mono text-sm transition-all duration-200 pointer-events-auto ${
                genre === g
                  ? 'bg-neon-gold bg-opacity-20 text-neon-gold'
                  : 'text-neon-gold hover:bg-neon-gold hover:bg-opacity-10'
              }`}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
          
          <div className="border-t border-neon-gold">
            <button
              onClick={toggleMute}
              className="w-full px-4 py-2 text-left font-mono text-sm text-neon-gold hover:bg-neon-gold hover:bg-opacity-10 transition-all duration-200 pointer-events-auto"
            >
              {isMuted ? '🔇 Unmute' : '🔊 Mute'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
