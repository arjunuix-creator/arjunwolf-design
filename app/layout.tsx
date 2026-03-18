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
  title: 'Arjun CR — Lead UI/UX Designer',
  description:
    'Lead UI/UX Designer with 12+ years crafting digital products where clarity, structure, and purpose meet. Specializing in fintech and enterprise UX.',
  keywords: ['UX Designer', 'UI Designer', 'Fintech Design', 'Enterprise UX', 'Design Leader'],
  openGraph: {
    title: 'Arjun CR — Lead UI/UX Designer',
    description: 'Designing digital experiences where human empathy meets simplicity.',
    type: 'website',
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
