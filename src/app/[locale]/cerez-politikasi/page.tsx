import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Çerez Politikası
const PATH = '/cerez-politikasi';

export async function generateMetadata({ params }: PageProps<'/[locale]/cerez-politikasi'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function CookiePolicyPage({ params }: PageProps<'/[locale]/cerez-politikasi'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
