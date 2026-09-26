'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavigationView } from '@/lib/content';

import { MenuPanel } from './MenuPanel';
import { panelId, triggerId, type MenuState } from './use-menu-state';

const MENU_ID = 'logo';

interface LogoMenuProps {
  links: NavigationView['logoMenu'];
  menu: MenuState;
}

/**
 * Sol üstteki logo. Tıklayınca ana sayfaya gider; altında (masaüstünde)
 * "Logomuzun Hikâyesi" menüsü açılır. Açılış animasyonunun sembolü buraya iner.
 */
export function LogoMenu({ links, menu }: LogoMenuProps) {
  const t = useTranslations('Topbar');
  const open = menu.openId === MENU_ID;

  return (
    // Logo bağlantısı (→ ana sayfa) ve menü düğmesi (→ Logomuzun Hikâyesi) iki ayrı kontrol;
    // görsel olarak tek grup: ok logoya yapışık durur.
    <div className="group/logo relative flex h-full shrink-0 items-center" {...menu.bind(MENU_ID)}>
      <Link href="/" aria-label={t('home')} className="inline-flex min-w-11 justify-center rounded-md p-1">
        {/* Kutunun oranı sembolünkiyle aynı (241.5 : 315) — animasyon tam bu kutuya iner. */}
        <span data-intro-target className="block aspect-[241.5/315] h-11 lg:h-14">
          <AbeaLogo variant="mark" idPrefix="abea-topbar" className="block size-full text-brand" />
        </span>
      </Link>

      <button
        type="button"
        id={triggerId(MENU_ID)}
        aria-label={t('logoMenu')}
        aria-expanded={open}
        aria-controls={panelId(MENU_ID)}
        onClick={() => menu.toggle(MENU_ID)}
        // 44×44 dokunma alanı; negatif boşlukla ikon logoya yaklaşır.
        className="-ml-2 hidden size-11 items-center justify-center rounded-md text-muted transition-colors group-hover/logo:text-ink hover:text-ink lg:inline-flex"
      >
        <ChevronDown aria-hidden className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <MenuPanel id={MENU_ID} open={open} links={links} onNavigate={menu.close} />
    </div>
  );
}
