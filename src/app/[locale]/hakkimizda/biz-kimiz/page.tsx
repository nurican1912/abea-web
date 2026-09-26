import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Biz Kimiz
const PATH = '/hakkimizda/biz-kimiz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/biz-kimiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function WhoWeArePage({ params }: PageProps<'/[locale]/hakkimizda/biz-kimiz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
