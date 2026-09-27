import type { Metadata } from 'next';

import { TeamAccordion } from '@/components/sections/ekibimiz/TeamAccordion';
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

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <Container className="space-y-14 py-12 sm:py-16">
          {boards.map((group) => (
            <section key={group.board} aria-labelledby={`board-${group.board}`}>
              <h2 id={`board-${group.board}`} className={sectionTitle}>
                {group.label}
              </h2>
              <div className="mt-8">
                <TeamAccordion members={group.members} />
              </div>
            </section>
          ))}
        </Container>
      </div>
    </>
  );
}
