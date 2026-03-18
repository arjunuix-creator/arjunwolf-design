import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SamuraiCursor from './components/SamuraiCursor';
import CursorGlow from './components/CursorGlow';
import LoadingIntro from './components/LoadingIntro';
import AgentWolfLoader from './components/AgentWolfLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arjuncr.design'),
  title: 'Arjun CR – Lead UI/UX Designer | Enterprise & Fintech',
  description:
    '12+ years designing enterprise platforms, fintech products, and AI-driven systems. Portfolio of Arjun CR — Lead UI/UX Designer.',
  keywords: [
    'UI UX Designer', 'Product Designer', 'Fintech UX', 'Enterprise UX',
    'Arjun CR', 'Design Leader', 'UX Portfolio', 'AI Design',
  ],
  authors: [{ name: 'Arjun CR', url: 'https://arjuncr.design' }],
  creator: 'Arjun CR',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Arjun CR – Lead UI/UX Designer | Enterprise & Fintech',
    description: '12+ years designing enterprise platforms, fintech products, and AI-driven systems.',
    url: 'https://arjuncr.design',
    siteName: 'Arjun CR Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Arjun CR – Lead UI/UX Designer' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun CR – Lead UI/UX Designer',
    description: '12+ years designing enterprise platforms and fintech products.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://arjuncr.design',
  },
  icons: {
    icon:        '/icon.svg',
    shortcut:    '/icon.svg',
    apple:       '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased overflow-x-hidden">
        <LoadingIntro />

        {/* Grain texture overlay — fixed, full-screen, non-interactive */}
        <div
          aria-hidden="true"
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          9998,
            pointerEvents:   'none',
            opacity:         0.04,
            mixBlendMode:    'overlay',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize:   '300px 300px',
          }}
        />
        <AgentWolfLoader />
        <CursorGlow />
        <SamuraiCursor />
        {children}
      </body>
    </html>
  );
}
