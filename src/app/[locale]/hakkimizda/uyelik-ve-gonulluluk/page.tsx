import type { Metadata } from 'next';

import { ApplicationForm } from '@/components/sections/uyelik-ve-gonulluluk/ApplicationForm';
import { Faq } from '@/components/sections/uyelik-ve-gonulluluk/Faq';
import { ParticipationPaths } from '@/components/sections/uyelik-ve-gonulluluk/ParticipationPaths';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { MembershipPageContent } from '@/types/content';

// Hakkımızda › Üyelik & Gönüllülük
const PATH = '/hakkimizda/uyelik-ve-gonulluluk';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/uyelik-ve-gonulluluk'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function MembershipPage({ params }: PageProps<'/[locale]/hakkimizda/uyelik-ve-gonulluluk'>) {
  const locale = await resolveLocale(params);
  const [page, parents] = await Promise.all([getPage<MembershipPageContent>(PATH, locale), getParents(PATH, locale)]);

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <ParticipationPaths paths={page.paths} />
        <ApplicationForm content={page.form} />
        <Faq content={page.faq} />
      </div>
    </>
  );
}
