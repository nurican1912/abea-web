import type { Metadata } from 'next';

import { WorkAreaPage } from '@/components/sections/calismalarimiz/WorkAreaPage';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › İş Dünyası ve Kurumsal Dayanıklılık
const PATH = '/calismalarimiz/is-dunyasi-ve-kurumsal-dayaniklilik';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/is-dunyasi-ve-kurumsal-dayaniklilik'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function BusinessResiliencePage({ params }: PageProps<'/[locale]/calismalarimiz/is-dunyasi-ve-kurumsal-dayaniklilik'>) {
  return <WorkAreaPage path={PATH} locale={await resolveLocale(params)} />;
}
