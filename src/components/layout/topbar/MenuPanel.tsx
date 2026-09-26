'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavigationView } from '@/lib/content';

import { panelId, triggerId } from './use-menu-state';

type NavLinkView = NavigationView['logoMenu'][number];

interface MenuPanelProps {
  id: string;
  open: boolean;
  links: NavLinkView[];
  align?: 'start' | 'center';
  onNavigate: () => void;
}

/** Masaüstünde bir menü başlığının altında açılan bağlantı listesi. */
export function MenuPanel({ id, open, links, align = 'center', onNavigate }: MenuPanelProps) {
  const pathname = usePathname();

  return (
    <div
      id={panelId(id)}
      aria-labelledby={triggerId(id)}
      className={cn(
        // pt-3: başlık ile panel arasındaki boşluk da fareyle "içeride" sayılsın
        'absolute top-full z-50 pt-3 transition duration-150 ease-out',
        align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0',
        open ? 'visible opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0',
      )}
    >
      <ul className="w-72 rounded-md border border-t-[3px] border-line border-t-brand bg-surface py-2 shadow-[0_16px_32px_-16px_rgb(14_42_56/0.22)]">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  // Soldaki ince turkuaz çizgi: üzerine gelince ve aktif sayfada görünür.
                  'block border-l-[3px] px-4 py-2.5 text-[0.9375rem] leading-snug transition-colors hover:bg-surface-soft',
                  active ? 'border-l-brand bg-surface-soft font-semibold' : 'border-l-transparent hover:border-l-brand',
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
