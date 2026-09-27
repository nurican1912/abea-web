'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState, useSyncExternalStore } from 'react';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/cn';
import type { NavigationView } from '@/lib/content';

import { DesktopNav } from './DesktopNav';
import { LanguageSwitch } from './LanguageSwitch';
import { MOBILE_MENU_ID, MobileMenu } from './MobileMenu';
import { TopbarLogo } from './TopbarLogo';
import { useMenuState } from './use-menu-state';

/** Sayfa biraz kaydırılınca topbar'ın altına ince bir gölge düşer. */
function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('scroll', onChange, { passive: true });
      return () => window.removeEventListener('scroll', onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

/**
 * Sitenin üst çubuğu.
 *
 *   [logo]  Hakkımızda ▾  Çalışmalarımız ▾  Yayınlar ▾  Hikâyeler  Paydaşlarımız ▾     TR|EN  [Üye / Gönüllü Ol]  (👤)
 *
 * lg altında menü hamburger'e katlanır; "Üye / Gönüllü Ol" xl'den itibaren
 * çubukta, daha dar ekranlarda mobil menünün altında yer alır.
 */
export function Topbar({ navigation }: { navigation: NavigationView }) {
  const t = useTranslations('Topbar');
  const menu = useMenuState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        // Not: backdrop-filter kullanılmaz — mobil menünün `fixed` konumunu bozar.
        // Alttaki turkuaz çizgi `after` ile çizilir: yükseklik değişmez, açılır paneller ona yapışık açılır.
        'sticky top-0 z-40 bg-surface transition-shadow duration-200 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand',
        (scrolled || mobileOpen) && 'shadow-[0_2px_16px_-8px_rgb(14_42_56/0.18)]',
      )}
    >
      <Container className="flex h-16 items-center gap-2 lg:h-20 lg:gap-4 xl:gap-8">
        <TopbarLogo />
        <DesktopNav items={navigation.main} menu={menu} />

        <div className="ml-auto flex items-center gap-1 xl:gap-3">
          <LanguageSwitch />
          <ButtonLink href={navigation.cta.href} variant="cta" className="ml-2 hidden lg:inline-flex xl:ml-4">
            {navigation.cta.label}
          </ButtonLink>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setMobileOpen((open) => !open)}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-surface-soft lg:hidden"
          >
            {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </Container>

      <MobileMenu open={mobileOpen} navigation={navigation} onClose={closeMobile} />
    </header>
  );
}
