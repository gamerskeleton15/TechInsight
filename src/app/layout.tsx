import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import NavbarContainer from '@/components/NavbarContainer';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleTagManager from '@/components/GoogleTagManager';

/** Inter — UI text (headings, body, navigation) */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
});

/** JetBrains Mono — code blocks and monospace text */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

/** The production URL. Override with NEXT_PUBLIC_SITE_URL (e.g. https://techinsight.com). */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://techinsight.site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'TechInsight - Where engineers share what they\'s learned',
  description:
    'Practical threads from working engineers: backend, platform, and ML. No fluff, no hype — just hard-won knowledge you can apply today.',
  icons: {
    icon: '/techinsight-logo.svg',
    shortcut: '/techinsight-logo.svg',
    apple: '/techinsight-logo.svg',
  },
  // JSON-LD structured data — helps Google surface the publication name,
  // logo and sitelinks in search results.
  openGraph: {
    title: 'TechInsight',
    description:
      'Practical threads from working engineers: backend, platform, and ML. No fluff, no hype — just hard-won knowledge you can apply today.',
    type: 'website',
    siteName: 'TechInsight',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/techinsight-logo.svg`,
        width: 320,
        height: 72,
        alt: 'TechInsight',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechInsight',
    description:
      'Practical threads from working engineers: backend, platform, and ML. No fluff, no hype — just hard-won knowledge you can apply today.',
    images: [`${SITE_URL}/techinsight-logo.svg`],
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'TechInsight',
      url: SITE_URL,
      logo: `${SITE_URL}/techinsight-icon.svg`,
      sameAs: [
        // Add social profiles here when they exist, e.g.
        // 'https://github.com/gamerskeleton15/techinsight',
      ],
      description:
        'Practical threads from working engineers: backend, platform, and ML. No fluff, no hype — just hard-won knowledge you can apply today.',
    }),
  },
};

/**
 * Viewport config — required for mobile (especially Android WebView, which
 * otherwise falls back to a fixed ~980px desktop viewport and renders the
 * page too large, then scales it down). Width=device-width tells the browser
 * to size the layout to the actual screen.
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0A0E1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark max-w-full overflow-x-clip">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts are handled by Tailwind/next/font. */}

        {/* Google Tag Manager */}
        <GoogleTagManager />
      </head>
      <body className={`bg-background text-foreground antialiased max-w-full overflow-x-hidden ${inter.variable} ${jetbrainsMono.variable}`}>
        {/* Matching <noscript> iframe for Google Tag Manager — must sit
            immediately after <body> so the preview/debugger works for
            users without JavaScript. */}
        {process.env.NEXT_PUBLIC_GTM_ID &&
          process.env.NODE_ENV === 'production' && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/gtm.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          )}
        <NavbarContainer />
        <main className="min-h-screen pb-16">{children}</main>
        <Footer />
        <GoogleAnalytics />
        {/* Google AdSense: loaded only when a publisher ID is configured.
            The client ID is public by design, so it comes from
            NEXT_PUBLIC_ADSENSE_CLIENT. Swap in your real ID before going live. */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}