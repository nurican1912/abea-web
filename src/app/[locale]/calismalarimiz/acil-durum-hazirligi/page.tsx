import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › Acil Durum Hazırlığı ve İyileşme
const PATH = '/calismalarimiz/acil-durum-hazirligi';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/acil-durum-hazirligi'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function EmergencyPreparednessPage({ params }: PageProps<'/[locale]/calismalarimiz/acil-durum-hazirligi'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
