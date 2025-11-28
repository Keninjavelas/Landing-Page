'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';

// Futuristic Space Shooter Game
function FuturisticGame({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerPos, setPlayerPos] = useState(50);
  const [bullets, setBullets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [enemies, setEnemies] = useState<{ id: number; x: number; y: number }[]>([]);
  const [nextBulletId, setNextBulletId] = useState(0);
  const [nextEnemyId, setNextEnemyId] = useState(0);
  const gameRef = React.useRef<HTMLDivElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  const shoot = useCallback(() => {
    if (!gameOver) {
      // Shoot from player position at bottom (5% from bottom)
      setBullets(prev => [...prev, { id: nextBulletId, x: playerPos, y: 5 }]);
      setNextBulletId(prev => prev + 1);
    }
  }, [playerPos, gameOver, nextBulletId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setPlayerPos(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerPos(prev => Math.min(95, prev + 5));
      } else if (e.key === ' ') {
        e.preventDefault();
        shoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, shoot]);

  // Spawn enemies
  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      setEnemies(prev => [...prev, { 
        id: nextEnemyId, 
        x: Math.random() * 90 + 5, 
        y: 0 
      }]);
      setNextEnemyId(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver, nextEnemyId]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // Move bullets upward
      setBullets(prev => prev
        .map(b => ({ ...b, y: b.y + 2 }))
        .filter(b => b.y < 100)
      );

      // Move enemies
      setEnemies(prev => {
        const newEnemies = prev
          .map(e => ({ ...e, y: e.y + 1 }))
          .filter(e => e.y < 100);

        // Check if any enemy reached bottom
        if (newEnemies.some(e => e.y >= 95)) {
          setGameOver(true);
        }

        return newEnemies;
      });

      // Check collisions
      setBullets(prevBullets => {
        let newBullets = [...prevBullets];
        setEnemies(prevEnemies => {
          let newEnemies = [...prevEnemies];
          
          prevBullets.forEach(bullet => {
            const hitEnemy = newEnemies.find(enemy => 
              Math.abs(enemy.x - bullet.x) < 5 && 
              Math.abs(enemy.y - bullet.y) < 5
            );
            
            if (hitEnemy) {
              newEnemies = newEnemies.filter(e => e.id !== hitEnemy.id);
              newBullets = newBullets.filter(b => b.id !== bullet.id);
              setScore(prev => prev + 100);
            }
          });
          
          return newEnemies;
        });
        
        return newBullets;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver]);

  const restart = () => {
    setScore(0);
    setGameOver(false);
    setPlayerPos(50);
    setBullets([]);
    setEnemies([]);
    setNextBulletId(0);
    setNextEnemyId(0);
  };

  return (
    <div 
      ref={gameRef}
      tabIndex={0}
      className="relative w-full h-full bg-gradient-to-b from-bg-dark via-purple-900 to-bg-dark overflow-hidden outline-none"
      style={{ cursor: 'default' }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Score */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-neon-cyan font-mono text-2xl z-10">
        SCORE: {score}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 px-4 py-2 border-2 border-neon-cyan text-neon-cyan font-mono hover:bg-neon-cyan hover:text-bg-dark transition-all z-10"
      >
        ← BACK
      </button>

      {/* Game area */}
      <div className="relative w-full h-full">
        {/* Player */}
        <div
          className="absolute bottom-[5%] w-8 h-8 transition-all duration-100"
          style={{ left: `${playerPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-full h-full bg-neon-cyan" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
            <div className="absolute inset-0 bg-neon-cyan blur-sm opacity-50" />
          </div>
        </div>

        {/* Bullets */}
        {bullets.map(bullet => (
          <div
            key={bullet.id}
            className="absolute w-1 h-4 bg-neon-cyan shadow-lg"
            style={{ 
              left: `${bullet.x}%`, 
              top: `${100 - bullet.y}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px #00ffff',
            }}
          />
        ))}

        {/* Enemies */}
        {enemies.map(enemy => (
          <div
            key={enemy.id}
            className="absolute w-8 h-8"
            style={{ left: `${enemy.x}%`, top: `${enemy.y}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-full h-full bg-neon-pink animate-pulse" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}>
              <div className="absolute inset-0 bg-neon-pink blur-sm opacity-50" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls hint */}
      {!gameOver && score === 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-neon-gold font-mono text-center animate-pulse">
          <div>← → to move</div>
          <div>SPACE to shoot</div>
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 bg-bg-dark bg-opacity-90 flex items-center justify-center z-20">
          <div className="text-center space-y-6">
            <div className="text-6xl text-neon-pink font-mono mb-4">GAME OVER</div>
            <div className="text-3xl text-neon-cyan font-mono">FINAL SCORE: {score}</div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-mono text-xl hover:bg-neon-cyan hover:text-bg-dark transition-all"
              >
                RESTART
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 border-2 border-neon-gold text-neon-gold font-mono text-xl hover:bg-neon-gold hover:text-bg-dark transition-all"
              >
                HOME
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Retro Snake Game
function RetroGame({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const gameRef = React.useRef<HTMLDivElement>(null);

  const gridSize = 20;

  // Auto-focus on mount
  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  const spawnFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    setFood(newFood);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setDirection(nextDirection);
      
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + nextDirection.x + gridSize) % gridSize,
          y: (head.y + nextDirection.y + gridSize) % gridSize,
        };

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10);
          spawnFood();
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [gameOver, nextDirection, food, spawnFood]);

  const restart = () => {
    setScore(0);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    spawnFood();
  };

  return (
    <div 
      ref={gameRef}
      tabIndex={0}
      className="relative w-full h-full bg-black overflow-hidden outline-none"
      style={{ cursor: 'default' }}
    >
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff6600 2px, #ff6600 4px)',
      }} />

      {/* Score */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-neon-gold font-mono text-2xl z-10 pixel-text">
        SCORE: {score}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 px-4 py-2 border-2 border-neon-gold text-neon-gold font-mono hover:bg-neon-gold hover:text-black transition-all z-10"
      >
        ← BACK
      </button>

      {/* Game board */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-neon-gold" style={{
        width: `${gridSize * 20}px`,
        height: `${gridSize * 20}px`,
      }}>
        {/* Grid */}
        <div className="absolute inset-0 grid" style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}>
          {[...Array(gridSize * gridSize)].map((_, i) => (
            <div key={i} className="border border-neon-gold border-opacity-10" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className="absolute transition-all duration-150"
            style={{
              left: `${segment.x * 20}px`,
              top: `${segment.y * 20}px`,
              width: '20px',
              height: '20px',
              backgroundColor: i === 0 ? '#ff6600' : '#ff8833',
              boxShadow: i === 0 ? '0 0 10px #ff6600' : 'none',
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute animate-pulse"
          style={{
            left: `${food.x * 20}px`,
            top: `${food.y * 20}px`,
            width: '20px',
            height: '20px',
            backgroundColor: '#ffff00',
            boxShadow: '0 0 15px #ffff00',
          }}
        />
      </div>

      {/* Controls hint */}
      {!gameOver && score === 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neon-gold font-mono text-center animate-pulse">
          <div>ARROW KEYS to move</div>
          <div>Eat the yellow pixels!</div>
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
          <div className="text-center space-y-6 border-4 border-neon-gold p-8">
            <div className="text-6xl text-neon-gold font-mono mb-4 pixel-text">GAME OVER</div>
            <div className="text-3xl text-neon-gold font-mono">SCORE: {score}</div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="px-8 py-4 border-2 border-neon-gold text-neon-gold font-mono text-xl hover:bg-neon-gold hover:text-black transition-all"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 border-2 border-neon-gold text-neon-gold font-mono text-xl hover:bg-neon-gold hover:text-black transition-all"
              >
                HOME
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SecretGamePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as Locale;
  const { theme } = useTheme();

  const handleBack = () => {
    router.push(`/${locale}/home`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg-dark">
      {theme === 'futuristic' ? (
        <FuturisticGame onBack={handleBack} />
      ) : (
        <RetroGame onBack={handleBack} />
      )}
    </div>
  );
}
