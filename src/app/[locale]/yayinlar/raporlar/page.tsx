import type { Metadata } from 'next';

import { PublicationsView } from '@/components/sections/yayinlar/PublicationsView';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Yayınlar › Raporlar
const PATH = '/yayinlar/raporlar';

export async function generateMetadata({ params }: PageProps<'/[locale]/yayinlar/raporlar'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function ReportsPage({ params }: PageProps<'/[locale]/yayinlar/raporlar'>) {
  const locale = await resolveLocale(params);

  return <PublicationsView path={PATH} locale={locale} />;
}
