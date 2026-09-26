import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Danışma Kurulumuz
const PATH = '/hakkimizda/danisma-kurulumuz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/danisma-kurulumuz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function AdvisoryBoardPage({ params }: PageProps<'/[locale]/hakkimizda/danisma-kurulumuz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
