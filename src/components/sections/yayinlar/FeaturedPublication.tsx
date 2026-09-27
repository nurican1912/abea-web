import { brandButton, eyebrow, outlineLightButton } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Localized, Publication } from '@/types/content';

import type { PublicationLabels } from './PublicationCard';

interface FeaturedPublicationProps {
  publication: Localized<Publication>;
  labels: PublicationLabels & { featured: string; downloadPdf: string; readSummary: string; reportCover: string };
}

/**
 * Öne çıkan yayın — koyu lacivert geniş kart.
 * Dosyası henüz yoksa butonlar görünür ama tıklanamaz (`aria-disabled`).
 */
export function FeaturedPublication({ publication, labels }: FeaturedPublicationProps) {
  const disabled = !publication.file;
  const inactive = 'pointer-events-none inline-flex';

  return (
    <article className="grid overflow-hidden rounded-xl bg-ink text-white md:grid-cols-[2fr_3fr]">
      <div className="flex min-h-48 items-center justify-center bg-primary md:min-h-80">
        <span className={cn(eyebrow, 'text-xs text-white/60')}>[{labels.reportCover}]</span>
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <p className={cn(eyebrow, 'text-xs text-brand')}>
          {labels.featured} · {labels.type} · {labels.date}
        </p>
        <h2 className="mt-4 font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.05] font-semibold text-balance">
          {publication.title}
        </h2>
        {publication.summary && <p className="mt-4 max-w-[55ch] text-white/80">{publication.summary}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          {disabled ? (
            <>
              <span aria-disabled="true" className={cn(brandButton, inactive)}>
                {labels.downloadPdf}
              </span>
              <span aria-disabled="true" className={cn(outlineLightButton, inactive)}>
                {labels.readSummary}
              </span>
            </>
          ) : (
            <a href={publication.file ?? undefined} download className={cn(brandButton, 'inline-flex')}>
              {labels.downloadPdf}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
