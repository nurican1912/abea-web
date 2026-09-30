import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import type { Localized, Milestone } from '@/types/content';

interface StoryTimelineProps {
  milestones: Localized<Milestone>[];
}

/** Aynı yıldaki dönüm noktaları tek yıl başlığı altında toplanır (2013'te iki tane var). */
function groupByYear(milestones: Localized<Milestone>[]) {
  const years: { year: string; items: Localized<Milestone>[] }[] = [];
  for (const milestone of milestones) {
    const last = years.at(-1);
    if (last?.year === milestone.year) last.items.push(milestone);
    else years.push({ year: milestone.year, items: [milestone] });
  }
  return years;
}

/**
 * Hikâyemiz — yıl yıl ilerleyen zaman çizelgesi. Kaydırırken yıl, kendi
 * dönüm noktaları bitene kadar kenarda (telefonda üstte) sabit durur.
 */
export async function StoryTimeline({ milestones }: StoryTimelineProps) {
  const t = await getTranslations('Story');

  return (
    <div className="bg-surface-soft">
      <Container className="py-12 sm:py-16 lg:py-24">
        <ol>
          {groupByYear(milestones).map(({ year, items }) => (
            <li key={year} className="grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
              {/* Yıl — telefonda topbar'ın altına, geniş ekranda solda yapışır. */}
              <div className="sticky top-16 z-10 -mx-4 bg-surface-soft px-4 py-3 sm:-mx-6 sm:px-6 lg:top-28 lg:mx-0 lg:self-start lg:px-0 lg:py-0">
                <p className="font-display text-5xl leading-none font-semibold text-primary tabular-nums lg:text-8xl">
                  {year}
                </p>
              </div>

              {/* Turkuaz çizgi yıllar boyunca kesintisiz iner; her dönüm noktasında bir nokta. */}
              <div className="space-y-12 border-l-2 border-brand pt-4 pb-16 pl-6 sm:pl-10 lg:pt-3 lg:pb-24 lg:pl-12">
                {items.map((item) => (
                  <article key={item.title} className="relative">
                    <span
                      aria-hidden
                      className="absolute top-3 -left-[calc(1.5rem+7px)] size-3 rounded-full bg-brand ring-4 ring-surface-soft sm:-left-[calc(2.5rem+7px)] lg:-left-[calc(3rem+7px)]"
                    />
                    <h2 className="max-w-2xl font-display text-[clamp(1.625rem,3.2vw,2.375rem)] leading-[1.15] font-semibold text-balance">
                      {item.title}
                    </h2>
                    {item.text && <p className="mt-4 max-w-[60ch] text-lg text-ink/80">{item.text}</p>}

                    <div className="relative mt-6 aspect-[3/2] max-w-2xl overflow-hidden rounded-xl bg-surface-muted">
                      {item.photo ? (
                        <Image
                          src={item.photo}
                          alt={item.photoAlt ?? item.title}
                          fill
                          sizes="(min-width: 1024px) 42rem, 90vw"
                          className="object-cover"
                        />
                      ) : (
                        // Fotoğraf gelene kadar yeri boş durur.
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-line text-sm text-muted">
                          <ImageIcon aria-hidden className="size-7" />
                          {t('photoSoon')}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
