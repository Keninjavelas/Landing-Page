'use client';

import { type Locale } from '@/i18n/config';
import { useClientTranslation } from '@/i18n/client';
import GlitchText from '@/components/GlitchText';
import Link from 'next/link';
import ResumeDownload from '@/components/ResumeDownload';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useClientTranslation(locale);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center py-8 md:py-12 lg:py-16">
        {/* Main Title */}
        <div className="mb-8 md:mb-10 space-y-6">
          <div className="space-y-6">
            <h1 className="text-xl md:text-2xl text-sepia font-mono tracking-[0.3em] uppercase">
              <span className="futuristic-text">[ SYSTEM ONLINE ]</span>
              <span className="retro-text">[ BOOT SEQUENCE COMPLETE ]</span>
            </h1>
            <GlitchText 
              className="text-6xl md:text-8xl lg:text-9xl text-amber-500 font-bold leading-tight"
              enableSecretGame={true}
            >
              {t('home.title')}
            </GlitchText>
          </div>
          <h2 className="text-xl md:text-3xl text-neon-cyan font-mono tracking-wider mt-10">
            {t('home.role').toUpperCase()}
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-4xl mb-8 md:mb-12">
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed px-4 md:px-8">
            {t('home.description')}
          </p>
          <div className="mt-6 px-4 md:px-8">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-lg border border-neon-cyan border-opacity-30">
              <span className="text-neon-green text-xl">●</span>
              <span className="text-text-secondary font-mono text-sm">{t('home.availability')}</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
          <Link 
            href={`/${locale}/projects`}
            className="group px-8 py-4 border-2 border-neon-cyan hover:bg-neon-cyan hover:bg-opacity-10 transition-all duration-200 rounded-lg"
          >
            <span className="text-neon-cyan font-mono text-lg tracking-wider">
              ▸ {t('home.cta.projects').toUpperCase()}
            </span>
          </Link>
          <Link 
            href={`/${locale}/contact`}
            className="group px-8 py-4 border-2 border-neon-gold hover:bg-neon-gold hover:bg-opacity-10 transition-all duration-200 rounded-lg"
          >
            <span className="text-neon-gold font-mono text-lg tracking-wider">
              ▸ {t('home.cta.contact').toUpperCase()}
            </span>
          </Link>
        </div>
        
        {/* Additional Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-12">
          <ResumeDownload />
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12 md:py-16 border-t border-neon-cyan border-opacity-30">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl text-neon-cyan font-mono tracking-wider mb-4">
            [ {t('home.skills.title').toUpperCase()} ]
          </h3>
          <p className="text-text-secondary text-lg">
            {t('home.skills.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { name: 'React', category: 'Frontend Library', color: 'neon-cyan', icon: '⚛️' },
            { name: 'Next.js', category: 'React Framework', color: 'neon-gold', icon: '▲' },
            { name: 'Java', category: 'Programming Language', color: 'neon-pink', icon: '☕' },
            { name: 'C/C++', category: 'System Programming', color: 'neon-green', icon: '⚙️' },
            { name: 'Python', category: 'Programming Language', color: 'neon-cyan', icon: '🐍' },
            { name: 'TypeScript', category: 'Programming Language', color: 'neon-gold', icon: '📘' },
            { name: 'AWS', category: 'Cloud Platform', color: 'neon-green', icon: '☁️' },
            { name: 'Blockchain', category: 'Emerging Tech', color: 'neon-pink', icon: '⛓️' },
          ].map((tech) => {
            const colorClasses = {
              'neon-cyan': 'border-neon-cyan text-neon-cyan',
              'neon-gold': 'border-neon-gold text-neon-gold',
              'neon-green': 'border-neon-green text-neon-green',
              'neon-pink': 'border-neon-pink text-neon-pink',
            };
            const colorClass = colorClasses[tech.color as keyof typeof colorClasses];
            return (
              <div
                key={tech.name}
                className={`group border ${colorClass.split(' ')[0]} p-6 rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-200`}
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className={`text-2xl md:text-3xl font-bold ${colorClass.split(' ')[1]} mb-2 transition-all`}>
                  {tech.name}
                </div>
                <div className="text-xs text-text-secondary font-mono uppercase tracking-wider">
                  {tech.category}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 border-t border-neon-cyan border-opacity-30">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl text-neon-gold font-mono tracking-wider mb-4">
            [ QUICK ACCESS ]
          </h3>
          <p className="text-text-secondary">
            Explore my work and get in touch
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link
            href={`/${locale}/projects`}
            className="group p-6 border-2 border-neon-cyan rounded-lg hover:bg-opacity-70 transition-all duration-200"
          >
            <div className="text-4xl mb-3">💼</div>
            <h4 className="text-xl text-neon-cyan font-mono mb-2">Portfolio</h4>
            <p className="text-text-secondary text-sm">View my latest projects and case studies</p>
          </Link>
          <Link
            href={`/${locale}/about`}
            className="group p-6 border-2 border-neon-gold rounded-lg hover:bg-opacity-70 transition-all duration-200"
          >
            <div className="text-4xl mb-3">👨‍💻</div>
            <h4 className="text-xl text-neon-gold font-mono mb-2">About Me</h4>
            <p className="text-text-secondary text-sm">Learn about my skills and experience</p>
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="group p-6 border-2 border-neon-pink rounded-lg hover:bg-opacity-70 transition-all duration-200"
          >
            <div className="text-4xl mb-3">📧</div>
            <h4 className="text-xl text-neon-pink font-mono mb-2">Contact</h4>
            <p className="text-text-secondary text-sm">Let&apos;s discuss your next project</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
