import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Bilgi Notları
const PATH = '/yayinlar/bilgi-notlari';

export async function generateMetadata({ params }: PageProps<'/[locale]/yayinlar/bilgi-notlari'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function BriefsPage({ params }: PageProps<'/[locale]/yayinlar/bilgi-notlari'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
