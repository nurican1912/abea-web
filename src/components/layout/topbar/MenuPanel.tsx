'use client';

import { useLayoutEffect, useRef } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavigationView } from '@/lib/content';

import { panelId, triggerId } from './use-menu-state';

type NavLinkView = NavigationView['logoMenu'][number];

/** Bundan uzun menüler iki sütuna bölünür (ör. Hakkımızda: 9 öğe → 5 + 4). */
const TWO_COLUMN_MIN = 6;
/** Panelin ekran kenarına en fazla yaklaşabileceği mesafe (px). */
const VIEWPORT_GUTTER = 16;

interface MenuPanelProps {
  id: string;
  open: boolean;
  links: NavLinkView[];
  /** Panelin üstündeki küçük bölüm etiketi (ör. "HAKKIMIZDA"). */
  title?: string;
  onNavigate: () => void;
}

/** Masaüstünde bir menü başlığının altında açılan bağlantı paneli. */
export function MenuPanel({ id, open, links, title, onNavigate }: MenuPanelProps) {
  const pathname = usePathname();
  const cardRef = useRef<HTMLDivElement>(null);

  const twoColumns = links.length >= TWO_COLUMN_MIN;
  const split = Math.ceil(links.length / 2);
  const columns = twoColumns ? [links.slice(0, split), links.slice(split)] : [links];

  // Panel başlığın sol kenarından açılır; ekranın sağından / solundan taşacaksa içeri kaydırılır.
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!open || !card) return;

    card.style.marginLeft = '0px';
    const rect = card.getBoundingClientRect();
    const overflowRight = rect.right - (window.innerWidth - VIEWPORT_GUTTER);
    const overflowLeft = VIEWPORT_GUTTER - rect.left;
    const shift = overflowRight > 0 ? -overflowRight : overflowLeft > 0 ? overflowLeft : 0;
    card.style.marginLeft = `${shift}px`;
  }, [open]);

  return (
    <div
      id={panelId(id)}
      className={cn(
        // pt-3: başlık ile panel arasındaki boşluk da fareyle "içeride" sayılsın
        'absolute top-full left-0 z-50 pt-3 transition duration-150 ease-out',
        open ? 'visible opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0',
      )}
    >
      <div
        ref={cardRef}
        role="group"
        aria-labelledby={triggerId(id)}
        className={cn(
          'max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-surface p-2 shadow-[0_18px_40px_-20px_rgb(14_42_56/0.3)]',
          twoColumns ? 'w-[28rem]' : 'w-80',
        )}
      >
        {title && (
          <p className="px-3 pt-1 pb-0.5 font-display text-xs font-semibold tracking-[0.1em] text-muted uppercase">{title}</p>
        )}
        <div className={cn(twoColumns && 'grid grid-cols-2 gap-2')}>
          {columns.map((column, i) => (
            <ul key={i} className={cn(i > 0 && 'border-l border-line pl-2')}>
              {column.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        // Soldaki ince turkuaz çizgi: üzerine gelince, klavye odağında ve aktif sayfada.
                        'flex min-h-11 items-center rounded-r-md border-l-[3px] px-3 py-2 text-[0.9375rem] leading-snug transition-colors hover:bg-surface-soft focus-visible:bg-surface-soft',
                        active
                          ? 'border-l-brand bg-surface-soft font-semibold'
                          : 'border-l-transparent hover:border-l-brand focus-visible:border-l-brand',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
