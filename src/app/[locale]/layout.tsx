import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Semi_Condensed } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Footer } from '@/components/layout/footer/Footer';
import { Topbar } from '@/components/layout/topbar/Topbar';
import { IntroBootScript } from '@/components/logo/IntroBootScript';
import { LogoIntro } from '@/components/logo/LogoIntro';
import { resolveLocale } from '@/i18n/locale';
import { routing } from '@/i18n/routing';
import { getNavigation } from '@/lib/content';

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

// Kelime markasının ve başlıkların yazı tipi (logoya en yakın açık kaynak font).
const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-sc',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#28ade5',
};

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: { default: t('siteName'), template: `%s | ${t('siteName')}` },
    description: t('description'),
    openGraph: { siteName: t('siteName'), locale: locale === 'tr' ? 'tr_TR' : 'en_US', type: 'website' },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const navigation = await getNavigation(locale);
  const t = await getTranslations({ locale, namespace: 'Topbar' });

  return (
    // Önyükleme betiği <html>'e sınıf ekler (js, intro-pending); React bunu uyuşmazlık saymasın.
    <html lang={locale} className={`${barlow.variable} ${barlowSemiCondensed.variable}`} suppressHydrationWarning>
      <body>
        <IntroBootScript />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            {t('skipToContent')}
          </a>
          <LogoIntro />
          <Topbar navigation={navigation} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
