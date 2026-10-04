import { getTranslations } from 'next-intl/server';

import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import type { Localized, StoryPageContent } from '@/types/content';

import { StoryTree } from './StoryTree';

interface StoryTimelineProps {
  milestones: Localized<StoryPageContent>['milestones'];
  closing: Localized<StoryPageContent>['closing'];
}

/** Arka planda, logodaki halkaları hatırlatan soluk eş merkezli daireler. */
function Rings({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="10">
      {[40, 75, 110, 145, 180].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} />
      ))}
    </svg>
  );
}

/**
 * Hikâyemiz — koyu lacivert sahnede "ağaç" zaman çizelgesi (bkz. StoryTree),
 * sonunda logo ve katılım çağrısı.
 */
export async function StoryTimeline({ milestones, closing }: StoryTimelineProps) {
  const t = await getTranslations('Story');

  return (
    <div className="relative overflow-hidden bg-primary text-white">
      <Rings className="pointer-events-none absolute -top-40 -right-40 size-[34rem] text-white/[0.04]" />
      <Rings className="pointer-events-none absolute -bottom-52 -left-52 size-[40rem] text-white/[0.04]" />

      <Container className="relative py-14 sm:py-20 lg:py-28">
        <StoryTree milestones={milestones} photoSoon={t('photoSoon')} />

        {/* Gövdenin ucu: logo — hikâye bugüne bağlanır. */}
        <div className="flex flex-col items-start pt-10 pl-12 lg:items-center lg:pt-16 lg:pl-0 lg:text-center">
          <AbeaLogo variant="mark" idPrefix="abea-story" className="h-24 w-auto text-brand lg:h-32" />
          <p className="mt-6 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-semibold text-balance">
            {closing.text}
          </p>
          <ButtonLink href={closing.cta.href} variant="cta" className="mt-7 inline-flex">
            {closing.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
