import { Container } from '@/components/ui/Container';
import { eyebrow, sectionTitle } from '@/components/ui/styles';
import { WorkAreaCard } from '@/components/work-areas/WorkAreaCard';
import { cn } from '@/lib/cn';
import type { HomePageContent, Localized, WorkArea } from '@/types/content';

interface WorkAreasSectionProps {
  content: Localized<HomePageContent>['workAreas'];
  areas: Localized<WorkArea>[];
}

/** Bölümün çapası — sayfa içi bağlantılar için (ör. /tr#calisma-alanlari). */
const WORK_AREAS_ID = 'calisma-alanlari';

/** Ana sayfa — altı çalışma alanı kartı (TEMA tarzı; üzerine gelince renklenir, ikon çizilir). */
export function WorkAreasSection({ content, areas }: WorkAreasSectionProps) {
  return (
    <section id={WORK_AREAS_ID} aria-labelledby="work-areas-title" className="bg-surface-soft py-16 sm:py-20">
      <Container>
        <p className={cn(eyebrow, 'text-primary')}>{content.eyebrow}</p>
        <h2 id="work-areas-title" className={cn(sectionTitle, 'mt-3 max-w-3xl')}>
          {content.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink/75">{content.description}</p>

        {/* Mobilde yatay kayan şerit; geniş ekranda 6 sütun. Aralardaki 4px bej boşluk TEMA'daki gibi. */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 xl:grid-cols-6">
          {areas.map((area) => (
            <li key={area.id} className="w-64 shrink-0 snap-start sm:w-auto">
              <WorkAreaCard icon={area.icon} title={area.title} href={area.href} linkLabel={content.linkLabel} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
