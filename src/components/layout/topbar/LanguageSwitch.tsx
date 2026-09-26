'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** TR | EN — aynı sayfanın diğer dildeki adresine gider. */
export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Topbar');
  const languages = useTranslations('Languages');

  return (
    <div role="group" aria-label={t('language')} className={cn('flex items-center text-sm font-semibold', className)}>
      {routing.locales.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="text-line">
              |
            </span>
          )}
          <Link
            href={pathname}
            locale={code}
            hrefLang={code}
            lang={code}
            aria-label={languages(code)}
            aria-current={code === locale ? 'true' : undefined}
            className={cn(
              'inline-flex h-11 min-w-9 items-center justify-center rounded-md px-1.5 font-display tracking-[0.06em] uppercase transition-colors',
              code === locale ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            {code}
          </Link>
        </span>
      ))}
    </div>
  );
}
