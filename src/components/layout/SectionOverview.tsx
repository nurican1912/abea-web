import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { card } from '@/components/ui/styles';
import { Link } from '@/i18n/navigation';
import type { AppPathname, Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { getSection } from '@/lib/content';
import type { Localized, PageContent } from '@/types/content';

interface SectionOverviewProps {
  path: AppPathname;
  locale: Locale;
  page: Localized<PageContent>;
}

/**
 * Menü başlığının genel bakış sayfası (Hakkımızda, Çalışmalarımız…):
 * kısa giriş + her alt sayfa için özet kartı. Kart metinleri alt sayfaların
 * kendi `description` alanından gelir — tek yerde yazılır.
 */
export async function SectionOverview({ path, locale, page }: SectionOverviewProps) {
  const [section, t] = await Promise.all([getSection(path, locale), getTranslations({ locale, namespace: 'Page' })]);

  return (
    <>
      <PageHeader title={page.title} description={page.description} />
      <div className="bg-surface-soft">
        <Container className="py-12 sm:py-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {section.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={cn(
                    card,
                    'group flex h-full flex-col p-6 transition-shadow hover:shadow-[0_12px_28px_-16px_rgb(14_42_56/0.35)] sm:p-7',
                  )}
                >
                  <h2 className="font-display text-2xl leading-tight font-semibold">{child.label}</h2>
                  {child.description && <p className="mt-3 text-ink/75">{child.description}</p>}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display font-semibold underline decoration-brand decoration-2 underline-offset-8">
                    {t('learnMore')}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
