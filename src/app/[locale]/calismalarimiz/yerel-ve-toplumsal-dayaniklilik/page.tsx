import type { Metadata } from 'next';

import { WorkAreaPage } from '@/components/sections/calismalarimiz/WorkAreaPage';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › Yerel ve Toplumsal Dayanıklılık
const PATH = '/calismalarimiz/yerel-ve-toplumsal-dayaniklilik';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/yerel-ve-toplumsal-dayaniklilik'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function CommunityResiliencePage({ params }: PageProps<'/[locale]/calismalarimiz/yerel-ve-toplumsal-dayaniklilik'>) {
  return <WorkAreaPage path={PATH} locale={await resolveLocale(params)} />;
}
