import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// KVKK Aydınlatma Metni
const PATH = '/kvkk';

export async function generateMetadata({ params }: PageProps<'/[locale]/kvkk'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function PrivacyNoticePage({ params }: PageProps<'/[locale]/kvkk'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
