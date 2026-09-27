import { getTranslations } from 'next-intl/server';

import { PublicationCard } from '@/components/sections/yayinlar/PublicationCard';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SHOW_EMPTY_SECTIONS } from '@/config/demo';
import type { HomePageContent, Localized, Publication } from '@/types/content';

interface LatestPublicationsProps {
  content: Localized<HomePageContent>['publications'];
  publications: Localized<Publication>[];
}

const COUNT = 3;

/** Dosyası ve tarihi olmayan yayın yer tutucudur (içerik henüz gelmedi). */
const isPlaceholder = (p: Localized<Publication>) => !p.file && !p.date;

/** 6 · Son yayınlar: en yeni üç yayın. Gerçek yayın yoksa bölüm gizlenir (demo hariç). */
export async function LatestPublications({ content, publications }: LatestPublicationsProps) {
  const real = publications.filter((p) => !isPlaceholder(p));
  if (real.length === 0 && !SHOW_EMPTY_SECTIONS) return null;

  const t = await getTranslations('Publications');
  const latest = (real.length ? real : publications)
    .toSorted((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, COUNT);

  return (
    <section aria-labelledby="publications-title" className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading id="publications-title" eyebrow={content.eyebrow} title={content.title} link={content.link} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {latest.map((p) => (
            <li key={p.id}>
              <PublicationCard
                publication={p}
                labels={{
                  type: t(`types.${p.type}`),
                  area: t('area', { id: p.area }),
                  date: p.date ?? t('datePlaceholder'),
                  cover: t('cover'),
                }}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
