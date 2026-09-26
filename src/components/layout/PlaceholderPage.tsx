import { ComingSoon } from '@/components/ui/ComingSoon';
import { PageHeader } from '@/components/ui/PageHeader';
import type { AppPathname, Locale } from '@/i18n/routing';
import { getParentLabels } from '@/lib/content';
import type { Localized, PageContent } from '@/types/content';

interface PlaceholderPageProps {
  path: AppPathname;
  locale: Locale;
  page: Localized<PageContent>;
}

/**
 * İçeriği henüz yazılmamış sayfaların ortak şablonu.
 * Bir sayfanın içeriği geldiğinde, o sayfanın `page.tsx`'i bunun yerine
 * `PageHeader` + kendi bölümlerini (`components/sections/<sayfa>/`) kullanır.
 */
export async function PlaceholderPage({ path, locale, page }: PlaceholderPageProps) {
  const parents = await getParentLabels(path, locale);

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <ComingSoon />
    </>
  );
}
