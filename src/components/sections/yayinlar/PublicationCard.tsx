import { card, eyebrow } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Localized, Publication } from '@/types/content';

export interface PublicationLabels {
  type: string;
  area: string;
  date: string;
  cover: string;
}

interface PublicationCardProps {
  publication: Localized<Publication>;
  labels: PublicationLabels;
}

/** Yayın kartı: kapak + tür / alan etiketi + başlık + tarih. */
export function PublicationCard({ publication, labels }: PublicationCardProps) {
  const title = publication.file ? (
    <a href={publication.file} className="underline-offset-4 hover:underline">
      {publication.title}
    </a>
  ) : (
    publication.title
  );

  return (
    <article className={cn(card, 'flex h-full flex-col overflow-hidden')}>
      <div className="flex aspect-[16/7] items-center justify-center bg-surface-muted">
        {publication.cover ? (
          // Kapak görselleri geldiğinde next/image ile değiştirilecek (bkz. MIMARI.md → media.ts).
          // eslint-disable-next-line @next/next/no-img-element
          <img src={publication.cover} alt="" className="size-full object-cover" />
        ) : (
          <span className={cn(eyebrow, 'text-xs text-muted')}>[{labels.cover}]</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className={cn(eyebrow, 'text-xs text-primary')}>{labels.type}</span>
          <span className={cn(eyebrow, 'text-xs text-muted')}>{labels.area}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight font-semibold">{title}</h3>
        <p className="mt-auto pt-3 text-sm text-muted">
          {labels.date} · PDF
        </p>
      </div>
    </article>
  );
}
