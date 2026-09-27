import { getTranslations } from 'next-intl/server';

import { LogoSlots } from '@/components/sections/paydaslarimiz/LogoSlots';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SHOW_EMPTY_SECTIONS } from '@/config/demo';
import type { HomePageContent, Localized, Partner } from '@/types/content';

interface PartnersStripProps {
  content: Localized<HomePageContent>['partners'];
  partners: Localized<Partner>[];
}

const SLOTS = 6;

/** 7 · Paydaşlar: tek sıra logo şeridi. Logo yoksa bölüm gizlenir (demo hariç). */
export async function PartnersStrip({ content, partners }: PartnersStripProps) {
  if (partners.length === 0 && !SHOW_EMPTY_SECTIONS) return null;

  const t = await getTranslations('Partners');

  return (
    <section aria-labelledby="partners-title" className="bg-surface-soft py-16 sm:py-20">
      <Container>
        <SectionHeading id="partners-title" eyebrow={content.eyebrow} title={content.title} link={content.link} />
        <LogoSlots
          partners={partners.slice(0, SLOTS)}
          minSlots={SLOTS}
          placeholderLabel={t('logo')}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        />
      </Container>
    </section>
  );
}
