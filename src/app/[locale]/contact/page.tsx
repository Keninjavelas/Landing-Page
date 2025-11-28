'use client';

import { type Locale } from '@/i18n/config';
import { useClientTranslation } from '@/i18n/client';
import GlitchText from '@/components/GlitchText';
import ContactForm from '@/components/ContactForm';
import { useParams } from 'next/navigation';

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useClientTranslation(locale);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="mb-16">
          <h1 className="text-xl md:text-2xl text-sepia font-mono tracking-[0.3em] uppercase mb-6">
            [ COMMUNICATION PORTAL ]
          </h1>
          <GlitchText className="text-5xl md:text-7xl text-neon-green mb-8">
            {t('contact.title').toUpperCase()}
          </GlitchText>
          <h2 className="text-xl md:text-2xl text-neon-cyan font-mono tracking-wider">
            {t('contact.subtitle').toUpperCase()}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-6">
            {t('contact.description')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 border border-neon-cyan border-opacity-30 rounded-lg bg-bg-darker bg-opacity-50">
              <span className="text-neon-cyan text-sm font-mono">⚡ Quick Response</span>
            </div>
            <div className="px-4 py-2 border border-neon-gold border-opacity-30 rounded-lg bg-bg-darker bg-opacity-50">
              <span className="text-neon-gold text-sm font-mono">🌍 Remote Available</span>
            </div>
            <div className="px-4 py-2 border border-neon-green border-opacity-30 rounded-lg bg-bg-darker bg-opacity-50">
              <span className="text-neon-green text-sm font-mono">💼 Freelance Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="py-8 mb-8">
        <div className="max-w-4xl mx-auto border-2 border-amber-500 rounded-lg p-8 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl text-amber-500 font-mono mb-4">
              [ INTERNSHIP OPPORTUNITIES ]
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              I am actively seeking internship opportunities to gain hands-on experience and contribute to innovative projects. 
              Open to both <span className="text-amber-500 font-semibold">paid and unpaid</span> positions that offer valuable learning experiences.
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-6">
              Interested in cloud computing, web development, and emerging technologies. 
              Ready to bring enthusiasm, dedication, and a strong willingness to learn to your team.
            </p>
          </div>
          <div className="text-center">
            <a
              href="mailto:aryankapoor0303@gmail.com?subject=Internship Opportunity"
              className="inline-block px-8 py-4 border-2 border-amber-500 bg-amber-500 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 rounded-lg group"
            >
              <span className="text-amber-500 font-mono text-lg tracking-wider group-hover:text-glow">
                📩 SEND INTERNSHIP INQUIRY
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm locale={locale} />

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="border border-neon-cyan p-8 rounded-lg bg-bg-darker bg-opacity-30">
              <h3 className="text-2xl text-neon-cyan mb-6 font-mono text-center">
                [ CONTACT INFO ]
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="text-xs text-text-muted font-mono mb-1 uppercase">Email</div>
                    <a
                      href="mailto:aryankapoor0303@gmail.com"
                      className="text-neon-cyan hover:text-neon-gold transition-colors text-lg"
                    >
                      aryankapoor0303@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="text-xs text-text-muted font-mono mb-1 uppercase">Location</div>
                    <span className="text-neon-cyan text-lg">India (Remote Work Available)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-neon-gold p-8 rounded-lg bg-bg-darker bg-opacity-30">
              <h3 className="text-2xl text-neon-gold mb-6 font-mono text-center">
                [ SOCIAL LINKS ]
              </h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/Keninjavelas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-neon-gold border-opacity-30 rounded-lg hover:border-opacity-100 hover:bg-neon-gold hover:bg-opacity-10 transition-all group"
                >
                  <span className="text-2xl">💻</span>
                  <div>
                    <div className="text-neon-gold font-mono group-hover:text-glow">GitHub</div>
                    <div className="text-text-secondary text-sm">View my repositories</div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/aryan-kapoor-80546b2b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-neon-gold border-opacity-30 rounded-lg hover:border-opacity-100 hover:bg-neon-gold hover:bg-opacity-10 transition-all group"
                >
                  <span className="text-2xl">💼</span>
                  <div>
                    <div className="text-neon-gold font-mono group-hover:text-glow">LinkedIn</div>
                    <div className="text-text-secondary text-sm">Connect professionally</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="border border-neon-green p-8 rounded-lg bg-bg-darker bg-opacity-30">
              <h3 className="text-xl text-neon-green mb-4 font-mono text-center">
                [ RESPONSE TIME ]
              </h3>
              <p className="text-text-secondary text-center leading-relaxed tracking-wide">
                I usually respond to messages within 
                <span className="text-neon-green font-semibold"> 24 hours</span>. 
                For urgent matters, feel free to reach out via email directly.
              </p>
            </div>

            <div className="border border-neon-pink p-8 rounded-lg bg-bg-darker bg-opacity-30">
              <h3 className="text-xl text-neon-pink mb-4 font-mono text-center">
                [ SERVICES OFFERED ]
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-neon-pink">▸</span>
                  <span className="text-text-secondary text-sm">Full-Stack Web Development</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-pink">▸</span>
                  <span className="text-text-secondary text-sm">React & Next.js Applications</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-pink">▸</span>
                  <span className="text-text-secondary text-sm">API Development & Integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-pink">▸</span>
                  <span className="text-text-secondary text-sm">Database Design & Optimization</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-pink">▸</span>
                  <span className="text-text-secondary text-sm">UI/UX Design & Implementation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-pink">▸</span>
                  <span className="text-text-secondary text-sm">Cloud Deployment & DevOps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
