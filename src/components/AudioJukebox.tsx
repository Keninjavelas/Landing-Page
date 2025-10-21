'use client';

import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

type Genre = 'classical' | 'jazz' | 'piano';

const AUDIO_TRACKS: Record<Genre, string[]> = {
  classical: [
    '/audio/classical/track1.mp3',
    '/audio/classical/track2.mp3',
    '/audio/classical/track3.mp3',
  ],
  jazz: [
    '/audio/jazz/track1.mp3',
    '/audio/jazz/track2.mp3',
    '/audio/jazz/track3.mp3',
  ],
  piano: [
    '/audio/piano/track1.mp3',
    '/audio/piano/track2.mp3',
    '/audio/piano/track3.mp3',
  ],
};

export default function AudioJukebox() {
  const [genre, setGenre] = useState<Genre>('classical');
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const soundRef = useRef<Howl | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedGenre = localStorage.getItem('audioGenre') as Genre | null;
    const savedMuted = localStorage.getItem('audioMuted');
    
    if (savedGenre && AUDIO_TRACKS[savedGenre]) {
      setGenre(savedGenre);
    }
    if (savedMuted) {
      setIsMuted(savedMuted === 'true');
    }
  }, []);

  // Handle audio playback
  useEffect(() => {
    // Clean up previous sound
    if (soundRef.current) {
      soundRef.current.unload();
    }

    if (!isMuted) {
      const tracks = AUDIO_TRACKS[genre];
      const track = tracks[currentTrackIndex % tracks.length];

      const sound = new Howl({
        src: [track],
        html5: true,
        volume: 0.5,
        onend: () => {
          // Play next track
          setCurrentTrackIndex((prev) => prev + 1);
        },
        onloaderror: () => {
          console.warn(`Failed to load ${track}`);
        },
      });

      soundRef.current = sound;
      sound.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [genre, isMuted, currentTrackIndex]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('audioGenre', genre);
    localStorage.setItem('audioMuted', String(isMuted));
  }, [genre, isMuted]);

  const handleGenreChange = (newGenre: Genre) => {
    setGenre(newGenre);
    setCurrentTrackIndex(0);
    setIsMenuOpen(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-bg-darker border border-neon-cyan rounded text-neon-cyan font-mono text-sm hover:bg-neon-cyan hover:text-bg-dark transition-all duration-200"
          style={{
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
          }}
        >
          <span>♪</span>
          <span>{genre.toUpperCase()}</span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full mt-2 left-0 w-48 bg-bg-darker border border-neon-cyan rounded overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            }}
          >
            {(['classical', 'jazz', 'piano'] as Genre[]).map((g) => (
              <button
                key={g}
                onClick={() => handleGenreChange(g)}
                className={`w-full px-4 py-2 text-left font-mono text-sm transition-all duration-200 ${
                  genre === g
                    ? 'bg-neon-cyan text-bg-dark'
                    : 'text-neon-cyan hover:bg-neon-cyan hover:bg-opacity-20'
                }`}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
            
            <div className="border-t border-neon-cyan">
              <button
                onClick={toggleMute}
                className="w-full px-4 py-2 text-left font-mono text-sm text-neon-gold hover:bg-neon-gold hover:bg-opacity-20 transition-all duration-200"
              >
                {isMuted ? '🔇 Unmute' : '🔊 Mute'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
