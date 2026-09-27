import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavLinkView } from '@/lib/content';

import { eyebrow as eyebrowClass, sectionTitle } from './styles';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  /** Sağda (dar ekranda altta) "Tümü →" tarzı bağlantı. */
  link?: NavLinkView;
  /** Koyu zemin üstünde. */
  inverted?: boolean;
  className?: string;
}

/** Bölüm başı: küçük üst etiket + başlık (+ sağda bağlantı). `id`, bölümün `aria-labelledby`'si içindir. */
export function SectionHeading({ id, eyebrow, title, link, inverted, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-x-10 gap-y-4', className)}>
      <div className="max-w-3xl">
        <p className={cn(eyebrowClass, inverted ? 'text-brand' : 'text-primary')}>{eyebrow}</p>
        <h2 id={id} className={cn(sectionTitle, 'mt-3', inverted && 'text-white')}>
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className={cn(
            'group inline-flex min-h-11 items-center gap-2 font-display font-semibold underline decoration-brand decoration-2 underline-offset-8',
            inverted ? 'text-white hover:decoration-white' : 'hover:decoration-ink',
          )}
        >
          {link.label}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
