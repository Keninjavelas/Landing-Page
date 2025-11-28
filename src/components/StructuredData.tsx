'use client';

import { useEffect, useState } from 'react';
import { getPersonStructuredData, getWebSiteStructuredData, getPortfolioStructuredData } from '@/lib/structured-data';

export default function StructuredData() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const personData = getPersonStructuredData();
    const websiteData = getWebSiteStructuredData();
    const portfolioData = getPortfolioStructuredData();

    // Add structured data to document head
    const addScript = (id: string, data: object) => {
      if (document.getElementById(id)) return;
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addScript('structured-data-person', personData);
    addScript('structured-data-website', websiteData);
    addScript('structured-data-portfolio', portfolioData);
  }, [mounted]);

  return null;
}

