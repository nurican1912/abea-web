import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { LogoStorySection } from '@/components/sections/logomuz/LogoStorySection';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import type { LogoPageContent } from '@/types/content';

// Logo › Logomuzun Hikâyesi
const PATH = '/logomuz';

export async function generateMetadata({ params }: PageProps<'/[locale]/logomuz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function LogoStoryPage({ params }: PageProps<'/[locale]/logomuz'>) {
  const locale = await resolveLocale(params);
  const page = await getPage<LogoPageContent>(PATH, locale);
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return (
    <LogoStorySection title={page.title} description={page.description} story={page.story} logoLabel={t('siteName')} />
  );
}
