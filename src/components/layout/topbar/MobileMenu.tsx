'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavigationView } from '@/lib/content';
import { isNavGroup } from '@/types/content';

export const MOBILE_MENU_ID = 'mobile-menu';

interface MobileMenuProps {
  open: boolean;
  navigation: NavigationView;
  onClose: () => void;
}

const DESKTOP_QUERY = '(min-width: 64rem)'; // Tailwind `lg`

/** lg altındaki ekranlarda tam ekran menü; başlıklar akordeon olarak açılır. */
export function MobileMenu({ open, navigation, onClose }: MobileMenuProps) {
  const t = useTranslations('Topbar');
  const pathname = usePathname();

  // Açıkken: sayfa kaydırılmasın, Esc kapatsın, ekran genişlerse kendiliğinden kapansın.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => desktop.matches && onClose();

    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [open, onClose]);

  const linkClass = (href: string) =>
    cn(
      'flex min-h-11 items-center border-l-[3px] px-3 text-base transition-colors hover:bg-surface-soft',
      pathname === href ? 'border-l-brand bg-surface-soft font-semibold' : 'border-l-transparent',
    );

  return (
    <div
      id={MOBILE_MENU_ID}
      className={cn(
        'fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto overscroll-contain bg-surface transition-[opacity,visibility] duration-200 lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <Container className="flex min-h-full flex-col pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <nav aria-label={t('mainNav')}>
          <ul className="divide-y divide-line">
            {navigation.main.map((item) =>
              isNavGroup(item) ? (
                <li key={item.href}>
                  <details className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold tracking-[0.04em] uppercase [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="pb-3">
                      {/* Başlığın kendi sayfası — dokunmatikte başlık yalnızca listeyi açar. */}
                      <li>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={pathname === item.href ? 'page' : undefined}
                          className={cn(linkClass(item.href), 'justify-between font-semibold')}
                        >
                          {t('overview')}
                          <ArrowRight aria-hidden className="size-4 shrink-0 text-muted" />
                        </Link>
                      </li>
                      {item.children.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            aria-current={pathname === link.href ? 'page' : undefined}
                            className={linkClass(link.href)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="flex min-h-14 items-center font-display text-lg font-semibold tracking-[0.04em] uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            {navigation.logoMenu.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onClose} className="flex min-h-14 items-center text-base text-muted">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-8">
          <ButtonLink href={navigation.cta.href} variant="cta" onClick={onClose} className="flex w-full">
            {navigation.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
