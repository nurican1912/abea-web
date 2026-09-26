import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

interface BreadcrumbProps {
  /** Ana sayfa ile mevcut sayfa arasındaki başlıklar (link değil — menü başlıklarının sayfası yok). */
  parents: string[];
  current: string;
}

export async function Breadcrumb({ parents, current }: BreadcrumbProps) {
  const t = await getTranslations('Page');

  return (
    <nav aria-label={t('breadcrumb')}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
        <li>
          <Link href="/" className="rounded-sm text-brand-deep underline-offset-4 hover:underline">
            {t('home')}
          </Link>
        </li>
        {parents.map((label) => (
          <li key={label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3.5 shrink-0" />
            {label}
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
