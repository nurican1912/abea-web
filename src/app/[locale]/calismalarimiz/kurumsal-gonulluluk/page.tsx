import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Kurumsal Afet Gönüllülüğü Çalışmaları
const PATH = '/calismalarimiz/kurumsal-gonulluluk';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/kurumsal-gonulluluk'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function CorporateVolunteeringPage({ params }: PageProps<'/[locale]/calismalarimiz/kurumsal-gonulluluk'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
