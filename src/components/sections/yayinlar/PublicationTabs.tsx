import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import type { NavLinkView } from '@/lib/content';

import { PUBLICATIONS_PATH } from './publication-config';

interface PublicationTabsProps {
  /** Alt sayfalar (Bilgi Notları, Politika Notları…) — menüden gelir. */
  tabs: NavLinkView[];
  active: AppPathname;
}

/** Yayınlar sekmeleri. Her sekme ayrı bir sayfadır; dar ekranda yatay kayar. */
export async function PublicationTabs({ tabs, active }: PublicationTabsProps) {
  const t = await getTranslations('Publications');
  const all: NavLinkView = { label: t('all'), href: PUBLICATIONS_PATH };

  return (
    <nav aria-label={t('tabs')} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1">
        {[all, ...tabs].map((tab) => {
          const current = tab.href === active;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-12 items-center border-b-[3px] px-4 whitespace-nowrap transition-colors',
                  current ? 'border-brand font-semibold' : 'border-transparent text-ink/75 hover:border-line hover:text-ink',
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
