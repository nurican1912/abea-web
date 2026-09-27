'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useRef } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavLinkView } from '@/lib/content';

import { panelId, triggerId } from './use-menu-state';

/** Bundan uzun menüler iki sütuna bölünür (ör. Hakkımızda: 8 öğe → 4 + 4). */
const TWO_COLUMN_MIN = 6;
/** Panelin ekran kenarına en fazla yaklaşabileceği mesafe (px). */
const VIEWPORT_GUTTER = 16;

interface MenuPanelProps {
  id: string;
  open: boolean;
  links: NavLinkView[];
  /**
   * Başlığın kendi sayfası — panelin en üstünde "Genel bakış →" satırı olur.
   * Dokunmatik ekranda başlığa ilk dokunuş paneli açtığı için sayfaya buradan gidilir.
   */
  overview?: NavLinkView;
  onNavigate: () => void;
}

const rowClass =
  'flex min-h-11 items-center border-l-[3px] px-4 py-2 text-[0.9375rem] leading-snug transition-colors hover:bg-surface-soft focus-visible:bg-surface-soft';

/** Masaüstünde bir menü başlığının altında açılan bağlantı paneli. */
export function MenuPanel({ id, open, links, overview, onNavigate }: MenuPanelProps) {
  const t = useTranslations('Topbar');
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

  const linkClass = (href: string) => {
    const active = pathname === href;
    return cn(
      // Soldaki ince turkuaz çizgi: üzerine gelince, klavye odağında ve aktif sayfada.
      rowClass,
      active ? 'border-l-brand bg-surface-soft font-semibold' : 'border-l-transparent hover:border-l-brand focus-visible:border-l-brand',
    );
  };

  return (
    <div
      id={panelId(id)}
      className={cn(
        // Tetikleyici (başlık / logo grubu) topbar yüksekliği kadar uzar; panel bu yüzden
        // hangi başlıktan açılırsa açılsın topbar'ın turkuaz alt çizgisinden sarkar
        // (panelin kendi üst şeridi yok — iki çizgi üst üste binip kalınlaşmasın).
        'absolute top-full left-0 z-50 transition duration-150 ease-out',
        open ? 'visible opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0',
      )}
    >
      <div
        ref={cardRef}
        role="group"
        aria-labelledby={triggerId(id)}
        className={cn(
          'max-w-[calc(100vw-2rem)] rounded-b-md border border-t-0 border-line bg-surface py-2 shadow-[0_16px_32px_-16px_rgb(14_42_56/0.22)]',
          twoColumns ? 'w-[30rem]' : 'w-80',
        )}
      >
        {overview && (
          <Link
            href={overview.href}
            onClick={onNavigate}
            aria-current={pathname === overview.href ? 'page' : undefined}
            className={cn(linkClass(overview.href), 'group/overview mb-1 justify-between border-b border-b-line font-semibold')}
          >
            {t('overview')}
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 text-muted transition-transform group-hover/overview:translate-x-0.5 group-hover/overview:text-ink"
            />
          </Link>
        )}
        <div className={cn(twoColumns && 'grid grid-cols-2')}>
          {columns.map((column, i) => (
            <ul key={i} className={cn(i > 0 && 'border-l border-line')}>
              {column.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={linkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
