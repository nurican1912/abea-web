import type { Metadata } from 'next';

import { HomeHero } from '@/components/sections/home/HomeHero';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { HomePageContent } from '@/types/content';

// Ana sayfa
const PATH = '/';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const page = await getPage<HomePageContent>(PATH, locale);

  return <HomeHero title={page.hero.title} lead={page.hero.lead} />;
}
