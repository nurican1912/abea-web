import type { Metadata } from 'next';

import { TeamAccordion } from '@/components/sections/ekibimiz/TeamAccordion';
import { TeamGrid } from '@/components/sections/ekibimiz/TeamGrid';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { sectionTitle } from '@/components/ui/styles';
import { resolveLocale } from '@/i18n/locale';
import { getCollection, getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { Board, TeamMember, TeamPageContent } from '@/types/content';

// Hakkımızda › Ekibimiz
const PATH = '/hakkimizda/ekibimiz';

const BOARDS: Board[] = ['yonetim', 'denetim', 'etik'];

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/ekibimiz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function OurTeamPage({ params }: PageProps<'/[locale]/hakkimizda/ekibimiz'>) {
  const locale = await resolveLocale(params);
  const [page, parents, members] = await Promise.all([
    getPage<TeamPageContent>(PATH, locale),
    getParents(PATH, locale),
    getCollection<TeamMember>('team-members', locale),
  ]);

  // Kurullar sırayla; her kurulda önce asil, sonra yedek üyeler. Üyesi olmayan kurul gösterilmez.
  const boards = BOARDS.map((board) => ({
    board,
    label: page.boards[board],
    members: members
      .filter((member) => member.board === board)
      .toSorted((a, b) => Number(a.status === 'yedek') - Number(b.status === 'yedek')),
  })).filter((group) => group.members.length > 0);

  /*
   * DEMO: iki tasarım alt alta — hoca seçince biri ve etiketler kalkar.
   * Şimdilik yalnızca bir üye (Murad Tiryakioğlu) girildi.
   */
  const variants = [
    { key: 'accordion', label: page.demoVariants.accordion, render: TeamAccordion },
    { key: 'grid', label: page.demoVariants.grid, render: TeamGrid },
  ] as const;

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <Container className="space-y-20 py-12 sm:py-16">
          {variants.map(({ key, label, render: Variant }) => (
            <section key={key} aria-label={label}>
              <p className="mb-8 inline-flex border border-dashed border-line bg-surface px-3 py-1 text-sm font-semibold text-muted">
                {label}
              </p>
              <div className="space-y-14">
                {boards.map((group) => (
                  <div key={group.board}>
                    <h2 className={sectionTitle}>{group.label}</h2>
                    <div className="mt-8">
                      <Variant members={group.members} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </Container>
      </div>
    </>
  );
}
