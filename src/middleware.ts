import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

export function middleware(request: NextRequest) {
  // Skip for RSC requests (_rsc parameter)
  if (request.nextUrl.searchParams.has('_rsc')) {
    return;
  }
  
  const { pathname } = request.nextUrl;
  
  // Skip static assets (audio files, images, PDFs, etc.)
  if (pathname.startsWith('/audio/') || 
      pathname.startsWith('/images/') ||
      pathname.match(/\.(mp3|wav|ogg|jpg|jpeg|png|gif|svg|ico|webp|pdf)$/)) {
    return;
  }
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Default to English
    const locale = defaultLocale;
    
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static assets like audio files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|audio/).*)'],
};
