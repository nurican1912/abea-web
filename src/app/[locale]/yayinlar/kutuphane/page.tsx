import type { Metadata } from 'next';

import { PublicationsView } from '@/components/sections/yayinlar/PublicationsView';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Yayınlar › Kütüphane
const PATH = '/yayinlar/kutuphane';

export async function generateMetadata({ params }: PageProps<'/[locale]/yayinlar/kutuphane'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function LibraryPage({ params }: PageProps<'/[locale]/yayinlar/kutuphane'>) {
  const locale = await resolveLocale(params);

  return <PublicationsView path={PATH} locale={locale} />;
}
