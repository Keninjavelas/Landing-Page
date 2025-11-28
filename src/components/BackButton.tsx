'use client';

export default function BackButton() {
  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="px-8 py-4 border-2 border-neon-gold bg-transparent hover:bg-neon-gold hover:bg-opacity-10 transition-all duration-300 rounded-lg"
    >
      <span className="text-neon-gold font-mono text-lg tracking-wider hover:text-glow">
        ← GO BACK
      </span>
    </button>
  );
}

