import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Kurumsal Paydaşlar
const PATH = '/paydaslarimiz/kurumsal';

export async function generateMetadata({ params }: PageProps<'/[locale]/paydaslarimiz/kurumsal'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function InstitutionalPartnersPage({ params }: PageProps<'/[locale]/paydaslarimiz/kurumsal'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
