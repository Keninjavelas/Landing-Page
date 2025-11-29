import type { Metadata } from 'next';
import { locales, type Locale, isValidLocale } from '@/i18n/config';
import '../globals-minimal.css';
import PageFlipContainer from '@/components/PageFlipContainer';
import Navigation from '@/components/Navigation';
import ThemeWrapper from '@/components/ThemeWrapper';
import SkipToContent from '@/components/SkipToContent';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import StructuredData from '@/components/StructuredData';
import Analytics from '@/components/Analytics';
import SuppressExtensionErrors from '@/components/SuppressExtensionErrors';
import { lazy, Suspense } from 'react';

// Lazy load non-critical components
const ScrollToTop = lazy(() => import('@/components/ScrollToTop'));
const ReadingProgress = lazy(() => import('@/components/ReadingProgress'));
const ServiceWorker = lazy(() => import('@/components/ServiceWorker'));

export const metadata: Metadata = {
  metadataBase: new URL('https://landing-page-sandy-alpha-26.vercel.app'),
  title: 'Aryan Kapoor | Full-Stack Developer',
  description: 'Full-stack developer specializing in React, Next.js, and Node.js. Creating innovative web experiences with modern technology and creative design.',
  keywords: ['Aryan Kapoor', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Aryan Kapoor' }],
  creator: 'Aryan Kapoor',
  openGraph: {
    title: 'Aryan Kapoor | Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and Node.js. Creating innovative web experiences.',
    url: 'https://landing-page-sandy-alpha-26.vercel.app',
    siteName: 'Aryan Kapoor Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Kapoor | Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and Node.js. Creating innovative web experiences.',
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const resolvedLocale: Locale = isValidLocale(locale) ? locale : 'en';

  return (
    <html lang={resolvedLocale}>
      <body className="antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeWrapper locale={resolvedLocale}>
            <SkipToContent />
            <SuppressExtensionErrors />
            <Analytics />
            <StructuredData />
            <Navigation locale={resolvedLocale} />
            <PageFlipContainer>
              <main id="main-content" className="min-h-screen pt-20 pb-32 px-4 md:px-8">
                {children}
              </main>
            </PageFlipContainer>
            <Suspense fallback={null}>
              <ReadingProgress />
              <ScrollToTop />
              <ServiceWorker />
            </Suspense>
          </ThemeWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
