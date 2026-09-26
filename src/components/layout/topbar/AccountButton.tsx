'use client';

import { UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Hesap simgesi — yeri şimdiden ayrıldı.
 * Panel aşamasında "Giriş yap" / hesap menüsüne (Hesabım, Yönetim Paneli, Çıkış) dönüşecek.
 */
export function AccountButton() {
  const t = useTranslations('Topbar');

  return (
    <button
      type="button"
      aria-disabled="true"
      aria-label={`${t('account')} — ${t('accountSoon')}`}
      title={t('accountSoon')}
      className="hidden size-11 cursor-not-allowed items-center justify-center rounded-full text-muted lg:inline-flex"
    >
      <UserRound aria-hidden className="size-5" />
    </button>
  );
}
