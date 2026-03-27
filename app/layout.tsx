import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from './components/ThemeProvider';
import CursorGlow from './components/CursorGlow';
import SamuraiCursor from './components/SamuraiCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arjuncr.design'),
  title: 'Arjun CR — Lead UI/UX Designer | Enterprise & Fintech',
  description:
    'Arjun CR is a Lead UI/UX Designer with 12+ years experience in enterprise platforms, fintech products, and complex systems. Portfolio, case studies, and design thinking.',
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
    title: 'Arjun CR — Lead UI/UX Designer',
    description: '12+ years designing enterprise and fintech systems. Simplifying complexity with human-centered and AI-driven design.',
    url: 'https://arjuncr.design',
    siteName: 'Arjun CR Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Arjun CR — Lead UI/UX Designer' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun CR — Lead UI/UX Designer',
    description: '12+ years designing enterprise and fintech systems. Simplifying complexity with human-centered and AI-driven design.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://arjuncr.design',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '48x48' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="48x48" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {/* Prevent flash of wrong theme before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Arjun CR',
              url: 'https://arjuncr.design',
              jobTitle: 'Lead UI/UX Designer',
              sameAs: [
                'https://www.linkedin.com/in/arjuncr/',
                'https://dribbble.com/arjunuix',
                'https://www.behance.net/arjunwolfdesigns',
              ],
              description:
                'Lead UI/UX Designer with 12+ years experience in enterprise, fintech, and complex systems.',
            }),
          }}
        />
        <ThemeProvider>
          <CursorGlow />
          <SamuraiCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
