import type { Metadata } from 'next';

import { MediaAndPress } from '@/components/sections/paydaslarimiz/MediaAndPress';
import { getPartnersData } from '@/components/sections/paydaslarimiz/partners-data';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Paydaşlarımız › Medya Paydaşları
const PATH = '/paydaslarimiz/medya';

export async function generateMetadata({ params }: PageProps<'/[locale]/paydaslarimiz/medya'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function MediaPartnersPage({ params }: PageProps<'/[locale]/paydaslarimiz/medya'>) {
  const locale = await resolveLocale(params);
  const [page, parents, { content, mediaPartners, press }] = await Promise.all([
    getPage(PATH, locale),
    getParents(PATH, locale),
    getPartnersData(locale),
  ]);

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <MediaAndPress content={content} mediaPartners={mediaPartners} press={press} />
      </div>
    </>
  );
}
