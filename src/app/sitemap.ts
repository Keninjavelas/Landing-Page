import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://landing-page-sandy-alpha-26.vercel.app';
  const pages = ['', 'home', 'about', 'projects', 'contact'];

  const routes: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each locale and page combination
  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = page ? `${baseUrl}/${locale}/${page}` : `${baseUrl}/${locale}`;
      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' || page === 'home' ? 'weekly' : 'monthly',
        priority: page === '' || page === 'home' ? 1 : 0.8,
      });
    });
  });

  // Add root redirect (though it redirects, include it for completeness)
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  return routes;
}

