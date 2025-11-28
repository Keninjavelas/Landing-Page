import Link from 'next/link';
import { defaultLocale } from '@/i18n/config';
import BackButton from '@/components/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-neon-pink font-mono mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl text-neon-cyan font-mono mb-4">
            PAGE NOT FOUND
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${defaultLocale}/home`}
            className="px-8 py-4 border-2 border-neon-cyan bg-transparent hover:bg-neon-cyan hover:bg-opacity-10 transition-all duration-300 rounded-lg"
          >
            <span className="text-neon-cyan font-mono text-lg tracking-wider hover:text-glow">
              ▸ GO HOME
            </span>
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
}

