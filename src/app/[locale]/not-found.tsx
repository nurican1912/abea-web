import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <Container className="flex min-h-[60svh] flex-col items-start justify-center py-16">
      <p className="font-display text-7xl font-semibold text-brand">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-xl text-muted">{t('description')}</p>
      {/* Kehribar yalnızca "Aramıza Katıl" içindir; burada birincil (lacivert) buton. */}
      <ButtonLink href="/" variant="primary" className="mt-8 inline-flex">
        {t('backHome')}
      </ButtonLink>
    </Container>
  );
}
