import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import type { WorkAreaIconName } from '@/types/content';

import { WorkAreaIcon } from './WorkAreaIcon';

interface WorkAreaCardProps {
  icon: WorkAreaIconName;
  title: string;
  href: AppPathname;
  linkLabel: string;
}

/** TEMA tarzı dikey kart: üstte başlık, ortada ikon, altta "Çalışmaları inceleyin". Üzerine gelince turkuazla dolar. */
export function WorkAreaCard({ icon, title, href, linkLabel }: WorkAreaCardProps) {
  return (
    <Link
      href={href}
      // Dokunmatikte "hover" yok: basılınca (active) anında turkuaz olur; gri dokunma vurgusu kapalı.
      className="area-card group flex h-full min-h-80 flex-col bg-surface p-6 transition-colors duration-300 [-webkit-tap-highlight-color:transparent] hover:bg-brand focus-visible:bg-brand active:bg-brand active:transition-none xl:p-5"
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
