import type { Metadata } from 'next';

import { PublicationsView } from '@/components/sections/yayinlar/PublicationsView';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Yayınlar — Tümü
const PATH = '/yayinlar';

export async function generateMetadata({ params }: PageProps<'/[locale]/yayinlar'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function PublicationsPage({ params }: PageProps<'/[locale]/yayinlar'>) {
  const locale = await resolveLocale(params);

  return <PublicationsView path={PATH} locale={locale} />;
}
