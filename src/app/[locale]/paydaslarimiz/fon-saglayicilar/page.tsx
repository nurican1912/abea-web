import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/PlaceholderPage';
import { resolveLocale } from '@/i18n/locale';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// Fon Sağlayıcılar
const PATH = '/paydaslarimiz/fon-saglayicilar';

export async function generateMetadata({ params }: PageProps<'/[locale]/paydaslarimiz/fon-saglayicilar'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function FundersPage({ params }: PageProps<'/[locale]/paydaslarimiz/fon-saglayicilar'>) {
  const locale = await resolveLocale(params);
  const page = await getPage(PATH, locale);

  return <PlaceholderPage path={PATH} locale={locale} page={page} />;
}
