import type { Metadata } from 'next';

import { AboutSection } from '@/components/sections/home/AboutSection';
import { FeaturedProject } from '@/components/sections/home/FeaturedProject';
import { HomeHero } from '@/components/sections/home/HomeHero';
import { JoinSection } from '@/components/sections/home/JoinSection';
import { LatestPublications } from '@/components/sections/home/LatestPublications';
import { PartnersStrip } from '@/components/sections/home/PartnersStrip';
import { ValuesSection } from '@/components/sections/home/ValuesSection';
import { WorkAreasSection } from '@/components/sections/home/WorkAreasSection';
import { resolveLocale } from '@/i18n/locale';
import { getCollection, getNavigation, getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type {
  HomePageContent,
  MembershipPageContent,
  Partner,
  PartnerGroup,
  Publication,
  Value,
  WorkArea,
} from '@/types/content';

// Ana sayfa — bölüm sırası ve kuralları: MIMARI.md → 5.4 Ana Sayfa
const PATH = '/';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const [page, membership, navigation, areas, values, publications, partnerGroups, funders] = await Promise.all([
    getPage<HomePageContent>(PATH, locale),
    getPage<MembershipPageContent>('/hakkimizda/uyelik-ve-gonulluluk', locale),
    getNavigation(locale),
    getCollection<WorkArea>('work-areas', locale),
    getCollection<Value>('values', locale),
    getCollection<Publication>('publications', locale),
    getCollection<PartnerGroup>('partners', locale),
    getCollection<Partner>('funders', locale),
  ]);

  const partners = [...partnerGroups.flatMap((group) => group.partners), ...funders];

  return (
    <>
      {/* 1 */}
      <HomeHero
        title={page.hero.title}
        lead={page.hero.lead}
        aboutLink={page.hero.aboutLink}
        scrollHint={page.hero.scrollHint}
      />
      {/* 2 */}
      <AboutSection content={page.about} />
      {/* 3 */}
      <WorkAreasSection content={page.workAreas} areas={areas} />
      {/* 4 */}
      <FeaturedProject content={page.featuredProject} />
      {/* 5 */}
      <ValuesSection content={page.values} values={values} />
      {/* 6 */}
      <LatestPublications content={page.publications} publications={publications} />
      {/* 7 */}
      <PartnersStrip content={page.partners} partners={partners} />
      {/* 8 — son çağrı en altta */}
      <JoinSection content={page.join} paths={membership.paths} cta={navigation.cta} />
    </>
  );
}
