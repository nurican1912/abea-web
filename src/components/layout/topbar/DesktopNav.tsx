'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavigationView } from '@/lib/content';
import { isNavGroup } from '@/types/content';

import { MenuPanel } from './MenuPanel';
import { panelId, triggerId, type MenuState } from './use-menu-state';

interface DesktopNavProps {
  items: NavigationView['main'];
  menu: MenuState;
}

const itemClass =
  'inline-flex h-11 items-center gap-1 rounded-lg px-2.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors hover:bg-surface-soft hover:text-brand-deep xl:px-3 xl:text-base';

/** Geniş ekran (lg ve üstü) yatay menü. Başlıklar sayfaya gitmez, alt menüyü açar. */
export function DesktopNav({ items, menu }: DesktopNavProps) {
  const t = useTranslations('Topbar');
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label={t('mainNav')} className="hidden lg:block">
      <ul className="flex items-center">
        {items.map((item) => {
          const active = isActive(item.href);

          if (!isNavGroup(item)) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(itemClass, active && 'text-brand-deep')}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const id = item.href.slice(1);
          const open = menu.openId === id;
          return (
            <li key={item.href} className="relative" {...menu.bind(id)}>
              <button
                type="button"
                id={triggerId(id)}
                aria-expanded={open}
                aria-controls={panelId(id)}
                onClick={() => menu.toggle(id)}
                className={cn(itemClass, (active || open) && 'text-brand-deep')}
              >
                {item.label}
                <ChevronDown aria-hidden className={cn('size-4 transition-transform', open && 'rotate-180')} />
              </button>
              <MenuPanel id={id} open={open} links={item.children} onNavigate={menu.close} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
