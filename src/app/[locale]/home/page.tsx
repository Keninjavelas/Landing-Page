import { type Locale } from '@/i18n/config';
import GlitchText from '@/components/GlitchText';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  await params;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        {/* Main Title */}
        <div className="mb-8">
          <GlitchText className="text-5xl md:text-7xl text-neon-cyan mb-4">
            SURVEILLANCE SYSTEM
          </GlitchText>
          <h2 className="text-xl md:text-2xl text-sepia font-mono tracking-widest">
            [ MONITORING DATA STREAMS ]
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-12">
          <p className="text-text-secondary text-lg leading-relaxed">
            Welcome to the <span className="text-neon-gold">Retro-Futuristic Portfolio</span>.
            Navigate through the secure channels to access classified information.
            All communications are encrypted and monitored.
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-8">
          <div className="border border-neon-cyan p-6 rounded bg-bg-darker bg-opacity-50 hover:bg-opacity-80 transition-all">
            <div className="text-3xl font-bold text-neon-cyan mb-2">04</div>
            <div className="text-sm text-text-secondary font-mono">ACTIVE SECTORS</div>
          </div>
          <div className="border border-neon-gold p-6 rounded bg-bg-darker bg-opacity-50 hover:bg-opacity-80 transition-all">
            <div className="text-3xl font-bold text-neon-gold mb-2">06</div>
            <div className="text-sm text-text-secondary font-mono">ARCHIVED MISSIONS</div>
          </div>
          <div className="border border-neon-green p-6 rounded bg-bg-darker bg-opacity-50 hover:bg-opacity-80 transition-all">
            <div className="text-3xl font-bold text-neon-green mb-2">99%</div>
            <div className="text-sm text-text-secondary font-mono">SYSTEM INTEGRITY</div>
          </div>
          <div className="border border-sepia p-6 rounded bg-bg-darker bg-opacity-50 hover:bg-opacity-80 transition-all">
            <div className="text-3xl font-bold text-sepia mb-2">24/7</div>
            <div className="text-sm text-text-secondary font-mono">SURVEILLANCE</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <div className="inline-block border-2 border-neon-cyan px-2 py-1 rounded">
            <span className="text-neon-cyan font-mono text-sm animate-pulse">
              ▸ SYSTEM READY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
