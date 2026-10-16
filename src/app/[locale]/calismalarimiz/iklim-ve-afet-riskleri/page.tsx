import type { Metadata } from 'next';

import { WorkAreaPage } from '@/components/sections/calismalarimiz/WorkAreaPage';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › İklim ve Afet Riskleri
const PATH = '/calismalarimiz/iklim-ve-afet-riskleri';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/iklim-ve-afet-riskleri'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function ClimateRisksPage({ params }: PageProps<'/[locale]/calismalarimiz/iklim-ve-afet-riskleri'>) {
  return <WorkAreaPage path={PATH} locale={await resolveLocale(params)} />;
}
