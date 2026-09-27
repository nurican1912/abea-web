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
            <span aria-hidden className="px-0.5 text-line">
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
              'inline-flex size-11 items-center justify-center rounded-md font-display tracking-[0.04em] uppercase transition-colors',
              // Aktif dil: açık mavi zemin + kalın yazı (renk tek başına yetmez; aria-current da var).
              code === locale ? 'bg-surface-soft font-bold text-ink' : 'font-medium text-muted hover:text-ink',
            )}
          >
            {code}
          </Link>
        </span>
      ))}
    </div>
  );
}
