import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { sectionTitle } from '@/components/ui/styles';
import type { Localized, Partner, PartnersPageContent } from '@/types/content';

import { LogoSlots } from './LogoSlots';

interface FundersSectionProps {
  content: Localized<PartnersPageContent>['funders'];
  funders: Localized<Partner>[];
}

/** Fon sağlayıcılar — logo ızgarası. */
export async function FundersSection({ content, funders }: FundersSectionProps) {
  const t = await getTranslations('Partners');

  return (
    <Container as="section" aria-labelledby="funders-title" className="py-12 sm:py-16">
      <h2 id="funders-title" className={sectionTitle}>
        {content.title}
      </h2>
      <p className="mt-3 text-ink/75">{content.description}</p>
      <LogoSlots
        partners={funders}
        minSlots={4}
        placeholderLabel={t('logo')}
        className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"
        slotClassName="min-h-24"
      />
    </Container>
  );
}
