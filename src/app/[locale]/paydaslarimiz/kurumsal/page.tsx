import type { Metadata } from 'next';

import { InstitutionalPartners } from '@/components/sections/paydaslarimiz/InstitutionalPartners';
import { PartnerWithUs } from '@/components/sections/paydaslarimiz/PartnerWithUs';
import { getPartnersData } from '@/components/sections/paydaslarimiz/partners-data';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Paydaşlarımız › Kurumsal Paydaşlar
const PATH = '/paydaslarimiz/kurumsal';

export async function generateMetadata({ params }: PageProps<'/[locale]/paydaslarimiz/kurumsal'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function InstitutionalPartnersPage({ params }: PageProps<'/[locale]/paydaslarimiz/kurumsal'>) {
  const locale = await resolveLocale(params);
  const [page, parents, { content, groups, email }] = await Promise.all([
    getPage(PATH, locale),
    getParents(PATH, locale),
    getPartnersData(locale),
  ]);

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <InstitutionalPartners content={content.institutional} groups={groups} />
        <PartnerWithUs content={content.join} email={email} />
      </div>
    </>
  );
}
