import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { card, sectionTitle } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Localized, PartnerGroup, PartnersPageContent } from '@/types/content';

import { LogoSlots } from './LogoSlots';

interface InstitutionalPartnersProps {
  content: Localized<PartnersPageContent>['institutional'];
  groups: Localized<PartnerGroup>[];
}

/** Kurumsal paydaşlar tablosu: her satır bir kurum türü (Kamu, Yerel Yönetimler…). */
export async function InstitutionalPartners({ content, groups }: InstitutionalPartnersProps) {
  const t = await getTranslations('Partners');

  return (
    <Container as="section" aria-labelledby="institutional-title" className="py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <h2 id="institutional-title" className={sectionTitle}>
          {content.title}
        </h2>
        <p className="text-sm text-muted">{content.note}</p>
      </div>
      <div className={cn(card, 'mt-8 divide-y divide-line')}>
        {groups.map((group) => (
          <div key={group.id} className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[14rem_1fr] lg:items-center">
            <h3 className="font-semibold">{group.label}</h3>
            <LogoSlots
              partners={group.partners}
              minSlots={4}
              placeholderLabel={t('logo')}
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
