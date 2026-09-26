import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Okul Öncesi Afet Farkındalık Çalışmaları
const PATH = '/calismalarimiz/okul-oncesi';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/okul-oncesi'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function EarlyChildhoodPage({ params }: PageProps<'/[locale]/calismalarimiz/okul-oncesi'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
