import type { Metadata } from 'next';

import { FundersSection } from '@/components/sections/paydaslarimiz/FundersSection';
import { InstitutionalPartners } from '@/components/sections/paydaslarimiz/InstitutionalPartners';
import { MediaAndPress } from '@/components/sections/paydaslarimiz/MediaAndPress';
import { PartnerWithUs } from '@/components/sections/paydaslarimiz/PartnerWithUs';
import { getPartnersData } from '@/components/sections/paydaslarimiz/partners-data';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Paydaşlarımız — genel bakış (tüm bölümler)
const PATH = '/paydaslarimiz';

export async function generateMetadata({ params }: PageProps<'/[locale]/paydaslarimiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function PartnersPage({ params }: PageProps<'/[locale]/paydaslarimiz'>) {
  const locale = await resolveLocale(params);
  const { content, groups, funders, mediaPartners, press, email } = await getPartnersData(locale);

  return (
    <>
      <PageHeader title={content.title} description={content.description} />
      <div className="bg-surface-soft">
        <InstitutionalPartners content={content.institutional} groups={groups} />
        <FundersSection content={content.funders} funders={funders} />
        <MediaAndPress content={content} mediaPartners={mediaPartners} press={press} />
        <PartnerWithUs content={content.join} email={email} />
      </div>
    </>
  );
}
