import type { Metadata } from 'next';

import { PersonAccordion } from '@/components/people/PersonAccordion';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/i18n/locale';
import { getCollection, getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { Advisor } from '@/types/content';

// Hakkımızda › Danışma Kurulumuz
const PATH = '/hakkimizda/danisma-kurulumuz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/danisma-kurulumuz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function AdvisoryBoardPage({ params }: PageProps<'/[locale]/hakkimizda/danisma-kurulumuz'>) {
  const locale = await resolveLocale(params);
  const [page, parents, advisors] = await Promise.all([
    getPage(PATH, locale),
    getParents(PATH, locale),
    getCollection<Advisor>('advisory-board', locale),
  ]);

  // Ekibimiz'deki kartların aynısı: adın altında görev yerine kurum; LinkedIn varsa panelde logosu.
  // Sıra içerik dosyasındaki sıradır (ada göre alfabetik).
  const people = advisors.map(({ institution, linkedin, ...advisor }) => ({
    ...advisor,
    role: institution,
    links: linkedin ? [{ label: 'LinkedIn', url: linkedin }] : undefined,
  }));

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <Container className="py-12 sm:py-16">
          <PersonAccordion people={people} />
        </Container>
      </div>
    </>
  );
}
