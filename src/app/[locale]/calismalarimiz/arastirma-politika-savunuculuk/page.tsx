import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › Araştırma, Politika ve Savunuculuk
const PATH = '/calismalarimiz/arastirma-politika-savunuculuk';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/arastirma-politika-savunuculuk'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function ResearchPolicyPage({ params }: PageProps<'/[locale]/calismalarimiz/arastirma-politika-savunuculuk'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
