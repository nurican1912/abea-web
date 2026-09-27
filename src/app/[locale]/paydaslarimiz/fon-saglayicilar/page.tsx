import type { Metadata } from 'next';

import { FundersSection } from '@/components/sections/paydaslarimiz/FundersSection';
import { PartnerWithUs } from '@/components/sections/paydaslarimiz/PartnerWithUs';
import { getPartnersData } from '@/components/sections/paydaslarimiz/partners-data';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Paydaşlarımız › Fon Sağlayıcılar
const PATH = '/paydaslarimiz/fon-saglayicilar';

export async function generateMetadata({ params }: PageProps<'/[locale]/paydaslarimiz/fon-saglayicilar'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function FundersPage({ params }: PageProps<'/[locale]/paydaslarimiz/fon-saglayicilar'>) {
  const locale = await resolveLocale(params);
  const [page, parents, { content, funders, email }] = await Promise.all([
    getPage(PATH, locale),
    getParents(PATH, locale),
    getPartnersData(locale),
  ]);

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <FundersSection content={content.funders} funders={funders} />
        <PartnerWithUs content={content.join} email={email} />
      </div>
    </>
  );
}
