import { type Locale } from '@/i18n/config';
import GlitchText from '@/components/GlitchText';

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  await params;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <GlitchText className="text-4xl md:text-6xl text-neon-green mb-4">
          ESTABLISH CONNECTION
        </GlitchText>
        <h2 className="text-lg md:text-xl text-sepia font-mono">
          SECURE COMMUNICATION CHANNEL
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="border border-neon-green p-8 rounded bg-bg-darker bg-opacity-50">
          <h3 className="text-xl text-neon-green mb-6 font-mono">[ TRANSMIT MESSAGE ]</h3>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-text-secondary font-mono text-sm mb-2">
                AGENT ID
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-bg-dark border border-neon-green rounded text-neon-green font-mono focus:outline-none focus:ring-2 focus:ring-neon-green"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-text-secondary font-mono text-sm mb-2">
                ENCRYPTED CHANNEL
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-bg-dark border border-neon-green rounded text-neon-green font-mono focus:outline-none focus:ring-2 focus:ring-neon-green"
                placeholder="agent@secure.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-text-secondary font-mono text-sm mb-2">
                CLASSIFIED MESSAGE
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 bg-bg-dark border border-neon-green rounded text-neon-green font-mono focus:outline-none focus:ring-2 focus:ring-neon-green resize-none"
                placeholder="Enter your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-neon-green text-bg-dark font-mono font-bold rounded hover:bg-opacity-90 transition-all"
              style={{
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
              }}
            >
              ▸ TRANSMIT
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="border border-neon-cyan p-6 rounded bg-bg-darker bg-opacity-50">
            <h3 className="text-lg text-neon-cyan mb-4 font-mono">[ DIRECT CHANNELS ]</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-text-muted font-mono mb-1">EMAIL</div>
                <a
                  href="mailto:contact@example.com"
                  className="text-neon-cyan hover:text-neon-gold transition-colors"
                >
                  contact@example.com
                </a>
              </div>
              <div>
                <div className="text-xs text-text-muted font-mono mb-1">GITHUB</div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-cyan hover:text-neon-gold transition-colors"
                >
                  github.com/yourusername
                </a>
              </div>
              <div>
                <div className="text-xs text-text-muted font-mono mb-1">LINKEDIN</div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-cyan hover:text-neon-gold transition-colors"
                >
                  linkedin.com/in/yourprofile
                </a>
              </div>
            </div>
          </div>

          <div className="border border-neon-gold p-6 rounded bg-bg-darker bg-opacity-50">
            <h3 className="text-lg text-neon-gold mb-4 font-mono">[ LOCATION ]</h3>
            <p className="text-text-secondary">
              <span className="text-neon-gold font-mono">SECTOR:</span> Earth<br />
              <span className="text-neon-gold font-mono">TIMEZONE:</span> UTC+0<br />
              <span className="text-neon-gold font-mono">STATUS:</span> <span className="text-neon-green">ACTIVE</span>
            </p>
          </div>

          <div className="border border-sepia p-6 rounded bg-bg-darker bg-opacity-50">
            <h3 className="text-lg text-sepia mb-2 font-mono">[ RESPONSE TIME ]</h3>
            <p className="text-text-secondary text-sm">
              All transmissions are monitored 24/7. Expect a response within
              <span className="text-sepia font-bold"> 24-48 hours</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-12 p-6 border-2 border-neon-green rounded bg-neon-green bg-opacity-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-neon-green text-2xl">🔒</span>
          <h3 className="text-lg text-neon-green font-mono">SECURE CONNECTION ESTABLISHED</h3>
        </div>
        <p className="text-text-secondary text-sm">
          All communications are encrypted using quantum-resistant protocols.
          Your data is protected by advanced surveillance systems.
        </p>
      </div>
    </div>
  );
}
