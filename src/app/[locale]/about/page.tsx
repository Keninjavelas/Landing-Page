import { type Locale } from '@/i18n/config';
import GlitchText from '@/components/GlitchText';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  await params;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <GlitchText className="text-4xl md:text-6xl text-neon-gold mb-4">
          AGENT PROFILE
        </GlitchText>
        <h2 className="text-lg md:text-xl text-sepia font-mono">
          CLEARANCE LEVEL: MAXIMUM
        </h2>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="border border-neon-gold p-8 rounded bg-bg-darker bg-opacity-50">
          <h3 className="text-2xl text-neon-gold mb-4 font-mono">[ CLASSIFIED DOSSIER ]</h3>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            Experienced software engineer specializing in cutting-edge web technologies
            and immersive user experiences. Expert in React, TypeScript, Next.js, and
            modern frontend architectures.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            Committed to building production-ready applications with exceptional
            performance, accessibility, and visual design. Passionate about creating
            unique digital experiences that blend retro aesthetics with futuristic
            functionality.
          </p>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-2xl text-neon-cyan mb-6 font-mono">[ TECHNICAL CAPABILITIES ]</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
              { category: 'Animation', skills: ['Framer Motion', 'GSAP', 'Three.js', 'WebGL'] },
              { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
              { category: 'Tools', skills: ['Git', 'Docker', 'Jest', 'CI/CD'] },
            ].map((group) => (
              <div
                key={group.category}
                className="border border-neon-cyan p-6 rounded bg-bg-darker bg-opacity-30 hover:bg-opacity-60 transition-all"
              >
                <div className="text-neon-cyan font-mono text-sm mb-3">{group.category}</div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neon-cyan bg-opacity-10 text-neon-cyan text-sm rounded border border-neon-cyan border-opacity-30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-6 border border-sepia rounded bg-bg-darker bg-opacity-30">
            <div className="text-3xl font-bold text-sepia mb-2">5+</div>
            <div className="text-sm text-text-secondary font-mono">YEARS ACTIVE</div>
          </div>
          <div className="text-center p-6 border border-neon-gold rounded bg-bg-darker bg-opacity-30">
            <div className="text-3xl font-bold text-neon-gold mb-2">50+</div>
            <div className="text-sm text-text-secondary font-mono">PROJECTS</div>
          </div>
          <div className="text-center p-6 border border-neon-green rounded bg-bg-darker bg-opacity-30">
            <div className="text-3xl font-bold text-neon-green mb-2">100%</div>
            <div className="text-sm text-text-secondary font-mono">DEDICATION</div>
          </div>
        </div>
      </div>
    </div>
  );
}
