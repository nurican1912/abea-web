'use client';

import { useTranslations } from 'next-intl';

import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { Link } from '@/i18n/navigation';

/**
 * Sol üstteki logo (sembol + yazı) — ana sayfaya gider. Açılış animasyonu buraya iner.
 * (Logomuzun Hikâyesi artık Hakkımızda menüsünde; logonun yanındaki açılır menü kaldırıldı.)
 */
export function TopbarLogo() {
  const t = useTranslations('Topbar');

  return (
    <Link href="/" aria-label={t('home')} className="inline-flex shrink-0 rounded-md p-1">
      {/* Kutunun oranı logonunkiyle aynı (458 : 332) — animasyon tam bu kutuya iner. */}
      <span data-intro-target className="block aspect-[458/332] h-11 lg:h-14">
        <AbeaLogo variant="full" idPrefix="abea-topbar" className="block size-full text-brand" />
      </span>
    </Link>
  );
}
