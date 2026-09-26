import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Afet Risk Azaltma Farkındalık Çalışmaları
const PATH = '/calismalarimiz/afet-risk-azaltma';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/afet-risk-azaltma'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function DisasterRiskReductionPage({ params }: PageProps<'/[locale]/calismalarimiz/afet-risk-azaltma'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
