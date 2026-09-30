'use client';

import { useEffect, useRef, useState } from 'react';

import { LogoReplay } from '@/components/logo/LogoReplay';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import type { Localized, LogoPart, LogoStoryPart } from '@/types/content';

interface LogoStorySectionProps {
  sections: Localized<LogoStoryPart>[];
  logoLabel: string;
}

/** Bir bölüm, üst kenarı ekranın ortasına geldiğinde "okunan bölüm" olur. */
function useActiveSection(count: number, refs: React.RefObject<(HTMLElement | null)[]>) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.5;
      let current = 0;
      refs.current.forEach((element, i) => {
        if (element && element.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count, refs]);

  return active;
}

/**
 * Logomuzun Hikâyesi — solda (telefonda üstte) sabit duran logo, sağda
 * hikâye. Okunan bölüm logonun hangi parçasını anlatıyorsa o parça öne
 * çıkar, diğerleri soluklaşır: nokta → halkalar → dikey çizgiler → "d" → yazı.
 */
export function LogoStorySection({ sections, logoLabel }: LogoStorySectionProps) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const active = useActiveSection(sections.length, refs);
  const focus: LogoPart = sections[active]?.part ?? 'all';

  return (
    <div className="bg-surface-soft">
      <Container className="pb-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* Telefonda topbar'ın altına yapışan ince şerit; geniş ekranda solda sabit sütun. */}
          <div className="sticky top-16 z-10 -mx-4 border-b border-line bg-surface-soft px-4 py-3 sm:-mx-6 sm:px-6 lg:top-28 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0">
            <LogoReplay
              label={logoLabel}
              focus={focus}
              className="flex-row justify-between gap-4 lg:flex-col lg:gap-8"
              logoClassName="w-32 sm:w-40 lg:w-full lg:max-w-[440px]"
            />
          </div>

          <div>
            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                ref={(element) => {
                  refs.current[i] = element;
                }}
                aria-labelledby={`${section.id}-title`}
                className={cn(
                  'scroll-mt-36 border-b border-line py-10 last:border-b-0 lg:scroll-mt-0 lg:flex lg:min-h-[65vh] lg:flex-col lg:justify-center lg:border-b-0 lg:py-12',
                  // Geniş ekranda okunmayan bölümler hafifçe geri çekilir.
                  'transition-opacity duration-500 motion-reduce:transition-none',
                  i === active ? 'lg:opacity-100' : 'lg:opacity-35',
                )}
              >
                <p className="font-display text-sm font-semibold tracking-[0.12em] text-primary tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2
                  id={`${section.id}-title`}
                  className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] font-semibold text-balance"
                >
                  {section.title}
                </h2>
                <div className="mt-5 max-w-[60ch] space-y-4 text-lg text-ink/85">
                  {section.blocks.map((block, j) =>
                    block.type === 'quote' ? (
                      <p key={j} className="border-l-4 border-brand pl-4 font-display text-2xl leading-snug font-semibold text-ink">
                        {block.text}
                      </p>
                    ) : (
                      <p key={j}>{block.text}</p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
