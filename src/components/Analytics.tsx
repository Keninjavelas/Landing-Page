'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { trackPageView } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && pathname && typeof window !== 'undefined') {
      trackPageView(pathname, document.title);
    }
  }, [pathname, mounted]);

  // Only load analytics in production and when mounted
  if (!mounted || process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

