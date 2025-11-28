import type { Metadata } from 'next';
import './globals-minimal.css';

export const metadata: Metadata = {
  title: 'Retro-Futuristic Portfolio',
  description: 'A production-ready, mobile-first portfolio landing page with retro-futuristic aesthetic and immersive visual effects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
