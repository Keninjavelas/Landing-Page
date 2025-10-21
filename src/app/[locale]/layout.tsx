import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import '../globals.css';
import PageFlipContainer from '@/components/PageFlipContainer';
import MascotFollower from '@/components/MascotFollower';
import AudioJukebox from '@/components/AudioJukebox';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Retro-Futuristic Portfolio | Surveillance System',
  description: 'A production-ready, mobile-first portfolio landing page with retro-futuristic aesthetic and immersive visual effects.',
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="antialiased">
        <AudioJukebox />
        <Navigation locale={locale} />
        <PageFlipContainer>
          <main className="min-h-screen pt-20 pb-32 px-4 md:px-8">
            {children}
          </main>
        </PageFlipContainer>
        <MascotFollower themeColor="#00ffff" />
      </body>
    </html>
  );
}
