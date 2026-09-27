import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import type { WorkAreaIconName } from '@/types/content';

import { WorkAreaIcon } from './WorkAreaIcon';

/** `single`: hepsi turkuazla dolar · `area`: her alan kendi rengiyle dolar. */
export type AreaTone = 'single' | 'area';

// Tailwind sınıfları derleme anında taranır — adlar tam yazılmalı.
const AREA_HOVER: Record<string, string> = {
  '01': 'hover:bg-area-01 focus-visible:bg-area-01',
  '02': 'hover:bg-area-02 focus-visible:bg-area-02',
  '03': 'hover:bg-area-03 focus-visible:bg-area-03',
  '04': 'hover:bg-area-04 focus-visible:bg-area-04',
  '05': 'hover:bg-area-05 focus-visible:bg-area-05',
  '06': 'hover:bg-area-06 focus-visible:bg-area-06',
};

interface WorkAreaCardProps {
  /** Renk için (area-01…06). */
  id: string;
  icon: WorkAreaIconName;
  title: string;
  href: AppPathname;
  linkLabel: string;
  tone: AreaTone;
}

/** TEMA tarzı dikey kart: üstte başlık, ortada ikon, altta "Çalışmaları inceleyin". */
export function WorkAreaCard({ id, icon, title, href, linkLabel, tone }: WorkAreaCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'area-card group flex h-full min-h-80 flex-col bg-surface p-6 transition-colors duration-300 xl:p-5',
        tone === 'single' ? 'hover:bg-brand focus-visible:bg-brand' : AREA_HOVER[id],
      )}
    >
      {/* 3 satırlık sabit yükseklik: başlıklar 2 ya da 3 satır olsa da ikonlar aynı hizada başlar. */}
      <h3 className="min-h-[3.75em] font-display text-2xl leading-tight font-semibold text-balance">{title}</h3>
      <WorkAreaIcon name={icon} className="mx-auto my-8 size-24 text-ink" />
      <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold whitespace-nowrap">
        {linkLabel}
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
