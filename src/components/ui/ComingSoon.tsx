import { getTranslations } from 'next-intl/server';

import { Container } from './Container';

/** İçeriği henüz gelmemiş bölümler için. */
export async function ComingSoon() {
  const t = await getTranslations('Page');

  return (
    <Container className="py-12 sm:py-16">
      <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-10 text-center sm:py-14">
        <p className="font-display text-2xl font-semibold">{t('comingSoon')}</p>
        <p className="mt-2 text-muted">{t('comingSoonNote')}</p>
      </div>
    </Container>
  );
}
