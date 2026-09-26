import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Politika Belgelerimiz
const PATH = '/hakkimizda/politika-belgelerimiz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/politika-belgelerimiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function PoliciesPage({ params }: PageProps<'/[locale]/hakkimizda/politika-belgelerimiz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
