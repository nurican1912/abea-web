import type { Metadata } from 'next';

import { WorkAreaPage } from '@/components/sections/calismalarimiz/WorkAreaPage';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › Acil Durum Hazırlığı ve İyileşme
const PATH = '/calismalarimiz/acil-durum-hazirligi';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/acil-durum-hazirligi'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function EmergencyPreparednessPage({ params }: PageProps<'/[locale]/calismalarimiz/acil-durum-hazirligi'>) {
  return <WorkAreaPage path={PATH} locale={await resolveLocale(params)} />;
}
