import type { Metadata } from 'next';

import { StoryTimeline } from '@/components/sections/hikayemiz/StoryTimeline';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { StoryPageContent } from '@/types/content';

// Hikâyemiz — 2007'den bugüne, yıl yıl kaydırmalı zaman çizelgesi
const PATH = '/hikayemiz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hikayemiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function OurStoryPage({ params }: PageProps<'/[locale]/hikayemiz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage<StoryPageContent>(PATH, locale);

  return (
    <>
      <PageHeader title={page.title} description={page.description} />
      <StoryTimeline milestones={page.milestones} />
    </>
  );
}
