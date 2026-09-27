import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { LogoStorySection } from '@/components/sections/logomuz/LogoStorySection';
import { resolveLocale } from '@/i18n/locale';
import { getPage, getParents } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { LogoPageContent } from '@/types/content';

// Hakkımızda › Logomuzun Hikâyesi
const PATH = '/hakkimizda/logomuz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/logomuz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function LogoStoryPage({ params }: PageProps<'/[locale]/hakkimizda/logomuz'>) {
  const locale = await resolveLocale(params);
  const [page, parents, t] = await Promise.all([
    getPage<LogoPageContent>(PATH, locale),
    getParents(PATH, locale),
    getTranslations({ locale, namespace: 'Metadata' }),
  ]);

  return (
    <LogoStorySection
      title={page.title}
      description={page.description}
      story={page.story}
      parents={parents}
      logoLabel={t('siteName')}
    />
  );
}
