import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { card, eyebrow, sectionTitle } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Localized, Partner, PartnersPageContent, PressItem } from '@/types/content';

import { LogoSlots } from './LogoSlots';

interface MediaAndPressProps {
  content: Pick<Localized<PartnersPageContent>, 'media' | 'press'>;
  mediaPartners: Localized<Partner>[];
  press: Localized<PressItem>[];
}

/** Sayfada gösterilecek en az basın satırı (içerik gelene kadar yer tutucu). */
const MIN_PRESS_ROWS = 3;

/** Medya paydaşları (logo ızgarası) ve Basında Biz (haber listesi) — yan yana. */
export async function MediaAndPress({ content, mediaPartners, press }: MediaAndPressProps) {
  const t = await getTranslations('Partners');
  const placeholders = Math.max(0, MIN_PRESS_ROWS - press.length);

  return (
    <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
      <section aria-labelledby="media-title">
        <h2 id="media-title" className={sectionTitle}>
          {content.media.title}
        </h2>
        <LogoSlots
          partners={mediaPartners}
          minSlots={6}
          placeholderLabel={t('mediaLogo')}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"
          slotClassName="min-h-24"
        />
      </section>

      <section aria-labelledby="press-title">
        <h2 id="press-title" className={sectionTitle}>
          {content.press.title}
        </h2>
        <ul className={cn(card, 'mt-8 divide-y divide-line')}>
          {press.map((item) => (
            <li key={item.title} className="p-5">
              <p className={cn(eyebrow, 'text-xs text-primary')}>
                {item.outlet} · {item.date ?? t('datePlaceholder')}
              </p>
              <p className="mt-1 font-semibold">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </p>
            </li>
          ))}
          {Array.from({ length: placeholders }, (_, i) => (
            <li key={`placeholder-${i}`} aria-hidden className="p-5">
              <p className={cn(eyebrow, 'text-xs text-primary')}>
                {t('outletPlaceholder')} · {t('datePlaceholder')}
              </p>
              <p className="mt-1 font-semibold">{t('headlinePlaceholder')}</p>
            </li>
          ))}
        </ul>
        {/* Basın kiti dosyası henüz yok — gelince bağlantıya dönüşecek. */}
        <p className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-ink/60">
          {content.press.kitLabel}
          <ArrowRight aria-hidden className="size-4" />
        </p>
      </section>
    </Container>
  );
}
