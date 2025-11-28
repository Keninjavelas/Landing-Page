'use client';

import { type Locale } from '@/i18n/config';
import { useClientTranslation } from '@/i18n/client';
import GlitchText from '@/components/GlitchText';
import { useParams } from 'next/navigation';

export default function AboutPage() {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useClientTranslation(locale);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-10 text-center">
        <div className="mb-10">
          <h1 className="text-xl md:text-2xl text-sepia font-mono tracking-[0.3em] uppercase mb-6">
            [ DEVELOPER PROFILE ]
          </h1>
          <GlitchText className="text-5xl md:text-7xl text-amber-500 mb-8">
            {t('home.title')}
          </GlitchText>
          <h2 className="text-xl md:text-2xl text-neon-cyan font-mono tracking-wider">
            {t('about.subtitle').toUpperCase()}
          </h2>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-10 border-t border-neon-gold border-opacity-30">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl text-neon-pink mb-8 font-mono">{t('about.heading').toUpperCase()}</h3>
          <p className="text-lg text-sepia mb-6 leading-relaxed">
            {t('about.description')}
          </p>
          <p className="text-lg text-sepia mb-6 leading-relaxed">
            {t('about.paragraph2')}
          </p>
          <p className="text-lg text-sepia mb-8 leading-relaxed">
            {t('about.paragraph3')}
          </p>
          
          <h3 className="text-2xl md:text-3xl text-neon-pink mb-8 font-mono">TECHNICAL EXPERTISE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-neon-cyan p-6 bg-bg-darker">
              <h4 className="text-xl text-neon-cyan mb-4 font-mono">FRONTEND & WEB</h4>
              <ul className="space-y-2 text-sepia">
                <li>• React & Next.js</li>
                <li>• TypeScript & JavaScript</li>
                <li>• Tailwind CSS</li>
                <li>• Three.js & React Three Fiber</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div className="border border-neon-cyan p-6 bg-bg-darker">
              <h4 className="text-xl text-neon-cyan mb-4 font-mono">BACKEND & CLOUD</h4>
              <ul className="space-y-2 text-sepia">
                <li>• Node.js & Express</li>
                <li>• Python & Flask</li>
                <li>• MongoDB & PostgreSQL</li>
                <li>• REST API Design</li>
                <li>• AWS Cloud Services</li>
              </ul>
            </div>
            <div className="border border-neon-cyan p-6 bg-bg-darker">
              <h4 className="text-xl text-neon-cyan mb-4 font-mono">PROGRAMMING</h4>
              <ul className="space-y-2 text-sepia">
                <li>• Java & C/C++</li>
                <li>• Python & JavaScript</li>
                <li>• Shell Scripting (Bash)</li>
                <li>• TypeScript</li>
                <li>• SQL</li>
              </ul>
            </div>
            <div className="border border-neon-cyan p-6 bg-bg-darker">
              <h4 className="text-xl text-neon-cyan mb-4 font-mono">EMERGING TECH</h4>
              <ul className="space-y-2 text-sepia">
                <li>• Quantum Computing</li>
                <li>• Blockchain Technology</li>
                <li>• Cloud Architecture</li>
                <li>• DevOps & CI/CD</li>
                <li>• Git & Version Control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl text-neon-cyan mb-4 font-mono">
            [ TECHNICAL EXPERTISE ]
          </h3>
          <p className="text-text-secondary text-lg">
            Technologies and tools I work with daily
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              category: 'Frontend', 
              skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
              color: 'neon-cyan'
            },
            { 
              category: 'Backend', 
              skills: ['Node.js', 'Express', 'Python', 'Flask', 'MongoDB'],
              color: 'neon-gold'
            },
            { 
              category: 'Cloud & DevOps', 
              skills: ['AWS', 'Git', 'Shell Scripting', 'Vercel', 'CI/CD'],
              color: 'neon-green'
            },
            { 
              category: 'Languages', 
              skills: ['Java', 'C/C++', 'Python', 'JavaScript', 'TypeScript'],
              color: 'neon-pink'
            },
          ].map((group) => {
            const borderClasses = {
              'neon-cyan': 'border-neon-cyan',
              'neon-gold': 'border-neon-gold',
              'neon-green': 'border-neon-green',
              'neon-pink': 'border-neon-pink',
            };
            const textClasses = {
              'neon-cyan': 'text-neon-cyan',
              'neon-gold': 'text-neon-gold',
              'neon-green': 'text-neon-green',
              'neon-pink': 'text-neon-pink',
            };
            return (
            <div
              key={group.category}
              className={`border ${borderClasses[group.color as keyof typeof borderClasses]} p-6 rounded-lg bg-bg-darker bg-opacity-30 hover:bg-opacity-70 transition-all duration-300 text-center`}
            >
              <div className={`${textClasses[group.color as keyof typeof textClasses]} font-mono text-lg mb-4 font-semibold`}>
                {group.category}
              </div>
              <div className="space-y-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-text-secondary text-sm py-1 hover:text-neon-cyan transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </section>


    </div>
  );
}
