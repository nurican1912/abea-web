import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { NavLinkView } from '@/lib/content';

interface BreadcrumbProps {
  /** Ana sayfa ile mevcut sayfa arasındaki başlıklar — ör. Ekibimiz için [Hakkımızda]. */
  parents: NavLinkView[];
  current: string;
}

const linkClass = 'rounded-sm text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-ink';

export async function Breadcrumb({ parents, current }: BreadcrumbProps) {
  const t = await getTranslations('Page');

  return (
    <nav aria-label={t('breadcrumb')}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
        <li>
          <Link href="/" className={linkClass}>
            {t('home')}
          </Link>
        </li>
        {parents.map((parent) => (
          <li key={parent.href} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3.5 shrink-0" />
            <Link href={parent.href} className={linkClass}>
              {parent.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <ChevronRight aria-hidden className="size-3.5 shrink-0" />
          <span aria-current="page" className="text-ink">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
