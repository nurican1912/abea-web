import type { Metadata } from 'next';

import { WorkAreaPage } from '@/components/sections/calismalarimiz/WorkAreaPage';
import { resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

// Çalışmalarımız › Araştırma, Politika ve Savunuculuk
const PATH = '/calismalarimiz/arastirma-politika-savunuculuk';

export async function generateMetadata({ params }: PageProps<'/[locale]/calismalarimiz/arastirma-politika-savunuculuk'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function ResearchPolicyAdvocacyPage({ params }: PageProps<'/[locale]/calismalarimiz/arastirma-politika-savunuculuk'>) {
  return <WorkAreaPage path={PATH} locale={await resolveLocale(params)} />;
}
