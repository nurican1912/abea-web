import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Ekibimiz
const PATH = '/hakkimizda/ekibimiz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/ekibimiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function OurTeamPage({ params }: PageProps<'/[locale]/hakkimizda/ekibimiz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
