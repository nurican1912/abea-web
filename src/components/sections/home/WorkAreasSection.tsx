import { Container } from '@/components/ui/Container';
import { eyebrow, sectionTitle } from '@/components/ui/styles';
import { WorkAreaCard, type AreaTone } from '@/components/work-areas/WorkAreaCard';
import { cn } from '@/lib/cn';
import type { HomePageContent, Localized, WorkArea } from '@/types/content';

interface WorkAreasSectionProps {
  content: Localized<HomePageContent>['workAreas'];
  areas: Localized<WorkArea>[];
}

/*
 * DEMO: iki kart stili alt alta — "tek renk" ve "alan renkleri". Hoca seçince
 * `TONES` tek elemana iner, etiketler (`demoVariants`) kalkar.
 */
const TONES: AreaTone[] = ['single', 'area'];

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

        <div className="mt-12 space-y-12">
          {TONES.map((tone) => (
            <div key={tone}>
              <p className="mb-4 inline-flex rounded-full border border-dashed border-line bg-surface px-3 py-1 text-sm font-semibold text-muted">
                {content.demoVariants[tone]}
              </p>
              {/* Mobilde yatay kayan şerit; geniş ekranda 6 sütun. Aralardaki 4px bej boşluk TEMA'daki gibi. */}
              <ul className="-mx-4 flex snap-x snap-mandatory gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 xl:grid-cols-6">
                {areas.map((area) => (
                  <li key={area.id} className="w-64 shrink-0 snap-start sm:w-auto">
                    <WorkAreaCard
                      id={area.id}
                      icon={area.icon}
                      title={area.title}
                      href={area.href}
                      linkLabel={content.linkLabel}
                      tone={tone}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
