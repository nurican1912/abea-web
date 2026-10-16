import type { Metadata } from 'next';

import { WorkAreaPage } from '@/components/sections/calismalarimiz/WorkAreaPage';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › Okul Güvenliği ve Afet Eğitimi
const PATH = '/calismalarimiz/okul-guvenligi-ve-afet-egitimi';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/okul-guvenligi-ve-afet-egitimi'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function SchoolSafetyPage({ params }: PageProps<'/[locale]/calismalarimiz/okul-guvenligi-ve-afet-egitimi'>) {
  return <WorkAreaPage path={PATH} locale={await resolveLocale(params)} />;
}
