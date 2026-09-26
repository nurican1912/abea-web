import type { Metadata } from 'next';

import { PublicationsView } from '@/components/sections/yayinlar/PublicationsView';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Yayınlar › Bilgi Notları
const PATH = '/yayinlar/bilgi-notlari';

export async function generateMetadata({ params }: PageProps<'/[locale]/yayinlar/bilgi-notlari'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function BriefsPage({ params }: PageProps<'/[locale]/yayinlar/bilgi-notlari'>) {
  const locale = await resolveLocale(params);

  return <PublicationsView path={PATH} locale={locale} />;
}
