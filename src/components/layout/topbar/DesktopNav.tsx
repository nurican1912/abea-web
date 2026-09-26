'use client';

import { useTranslations } from 'next-intl';

import { stripeUnderline } from '@/components/ui/styles';
import { Link, usePathname } from '@/i18n/navigation';
import type { NavigationView } from '@/lib/content';
import { isNavGroup } from '@/types/content';

import { MenuPanel } from './MenuPanel';
import { panelId, triggerId, type MenuState } from './use-menu-state';

interface DesktopNavProps {
  items: NavigationView['main'];
  menu: MenuState;
}

// Başlıklar: logonun yazı tipi, büyük harf. En az 44×44 px tıklama alanı.
const itemClass =
  'group inline-flex h-11 min-w-11 items-center font-display text-[0.9375rem] font-semibold tracking-[0.03em] whitespace-nowrap uppercase';

/**
 * Geniş ekran (lg ve üstü) yatay menü. Her başlık kendi genel bakış sayfasına
 * gider; alt menüsü olanlar ayrıca açılır panel açar (bkz. `linkTrigger`).
 */
export function DesktopNav({ items, menu }: DesktopNavProps) {
  const t = useTranslations('Topbar');
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label={t('mainNav')} className="hidden h-full lg:block">
      <ul className="flex h-full items-center gap-4 xl:gap-7">
        {items.map((item) => {
          const active = isActive(item.href);
          const current = pathname === item.href ? 'page' : undefined;

          if (!isNavGroup(item)) {
            return (
              <li key={item.href} className="flex h-full items-center">
                <Link href={item.href} aria-current={current} data-active={active} className={itemClass}>
                  <span className={stripeUnderline}>{item.label}</span>
                </Link>
              </li>
            );
          }

          const id = item.href.slice(1);
          const open = menu.openId === id;
          return (
            <li key={item.href} className="relative flex h-full items-center" {...menu.bind(id)}>
              <Link
                href={item.href}
                id={triggerId(id)}
                aria-expanded={open}
                aria-controls={panelId(id)}
                aria-current={current}
                data-active={active}
                className={itemClass}
                {...menu.linkTrigger(id)}
              >
                <span className={stripeUnderline}>{item.label}</span>
              </Link>
              <MenuPanel
                id={id}
                open={open}
                overview={{ label: item.label, href: item.href }}
                links={item.children}
                onNavigate={menu.close}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
