import type { Metadata } from 'next';

import { SectionOverview } from '@/components/layout/SectionOverview';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız — genel bakış
const PATH = '/calismalarimiz';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function OurWorkPage({ params }: PageProps<'/[locale]/calismalarimiz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <SectionOverview path={PATH} locale={locale} page={page} />;
}
