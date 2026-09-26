import type { Metadata } from 'next';

import { PublicationsView } from '@/components/sections/yayinlar/PublicationsView';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Yayınlar › Politika Notları
const PATH = '/yayinlar/politika-notlari';

export async function generateMetadata({ params }: PageProps<'/[locale]/yayinlar/politika-notlari'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function PolicyBriefsPage({ params }: PageProps<'/[locale]/yayinlar/politika-notlari'>) {
  const locale = await resolveLocale(params);

  return <PublicationsView path={PATH} locale={locale} />;
}
