import type { AppPathname } from '@/i18n/routing';
import type { PublicationType } from '@/types/content';

/** Yayınlar sekmeleri ↔ yayın türleri. Sekme adresi burada yoksa "Tümü" gibi davranır. */
export const TAB_TYPES: Partial<Record<AppPathname, PublicationType>> = {
  '/yayinlar/bilgi-notlari': 'bilgi-notu',
  '/yayinlar/politika-notlari': 'politika-notu',
  '/yayinlar/raporlar': 'rapor',
};

export const PUBLICATIONS_PATH: AppPathname = '/yayinlar';
export const LIBRARY_PATH: AppPathname = '/yayinlar/kutuphane';

/** "Daha fazla yayın yükle" her basışta kaç kart açar. */
export const PAGE_SIZE = 6;
