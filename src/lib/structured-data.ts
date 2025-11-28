/**
 * Structured Data (JSON-LD) for SEO
 */

export interface PersonStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  email: string;
  sameAs: string[];
  address: {
    '@type': string;
    addressCountry: string;
  };
}

export function getPersonStructuredData(): PersonStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aryan Kapoor',
    jobTitle: 'Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and Node.js. Creating innovative web experiences with modern technology and creative design.',
    url: 'https://your-portfolio-domain.com',
    email: 'aryankapoor0303@gmail.com',
    sameAs: [
      'https://github.com/Keninjavelas',
      'https://www.linkedin.com/in/aryan-kapoor-80546b2b8/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };
}

export interface WebSiteStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

export function getWebSiteStructuredData(): WebSiteStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aryan Kapoor Portfolio',
    description: 'Full-stack developer portfolio showcasing modern web development projects',
    url: 'https://your-portfolio-domain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://your-portfolio-domain.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface PortfolioStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  creator: {
    '@type': string;
    name: string;
  };
}

export function getPortfolioStructuredData(): PortfolioStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Aryan Kapoor Portfolio',
    description: 'Portfolio of web development projects and case studies',
    url: 'https://your-portfolio-domain.com',
    creator: {
      '@type': 'Person',
      name: 'Aryan Kapoor',
    },
  };
}

