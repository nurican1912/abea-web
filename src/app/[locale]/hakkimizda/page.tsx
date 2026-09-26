import type { Metadata } from 'next';

import { SectionOverview } from '@/components/layout/SectionOverview';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Hakkımızda — genel bakış
const PATH = '/hakkimizda';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function AboutPage({ params }: PageProps<'/[locale]/hakkimizda'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <SectionOverview path={PATH} locale={locale} page={page} />;
}
