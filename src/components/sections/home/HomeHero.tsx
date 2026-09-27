import { ArrowDown } from 'lucide-react';

import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import type { NavLinkView } from '@/lib/content';

import { ABOUT_ID } from './AboutSection';

interface HomeHeroProps {
  title: string;
  lead: string;
  aboutLink: NavLinkView;
  scrollHint: string;
}

/**
 * Ana sayfanın ilk ekranı: slogan + tanıtım + "Hakkımızda →".
 * Altta ortada küçük bir aşağı ok, hemen sonraki bölüme (Biz kimiz) kaydırır.
 */
export function HomeHero({ title, lead, aboutLink, scrollHint }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Filigran: logonun halkaları — yalnızca geniş ekranda (dar ekranda metnin arkasına düşüyor), tıklanamaz. */}
      <AbeaLogo
        variant="mark"
        idPrefix="abea-hero-decor"
        className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-[88%] max-h-[40rem] -translate-y-1/2 translate-x-[14%] text-brand opacity-[0.08] select-none lg:block xl:translate-x-0"
      />

      <Container className="pt-16 pb-20 sm:pt-20 lg:pt-20 lg:pb-24">
        <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-[66ch] text-lg text-ink/80 sm:text-xl">{lead}</p>

        <ButtonLink href={aboutLink.href} variant="text" className="mt-9 inline-flex">
          {aboutLink.label}
        </ButtonLink>
      </Container>

      {/* Aşağı ok — "devamı var" ipucu; hareket azaltma tercihinde durur. */}
      <a
        href={`#${ABOUT_ID}`}
        aria-label={scrollHint}
        className="absolute bottom-4 left-1/2 inline-flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
      >
        <ArrowDown aria-hidden className="size-5 motion-safe:animate-nudge" />
      </a>
    </section>
  );
}
