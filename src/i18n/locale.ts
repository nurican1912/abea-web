import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { routing, type Locale } from './routing';

/**
 * Sayfa ve layout'ların ilk satırı: adresteki dili doğrular ve
 * next-intl'e bildirir (sayfaların statik üretilebilmesi için gerekli).
 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  return locale;
}
