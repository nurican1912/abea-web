import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import type { NavigationView } from '@/lib/content';

type Action = NavigationView['cta'];

interface HomeHeroProps {
  title: string;
  lead: string;
  primaryAction: Action;
  secondaryAction: Action;
}

/** Ana sayfanın ilk ekranı. Diğer bölümler ana sayfa taslağı netleşince eklenecek. */
export function HomeHero({ title, lead, primaryAction, secondaryAction }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Filigran: logonun halkaları — yalnızca geniş ekranda (dar ekranda metnin arkasına düşüyor), tıklanamaz. */}
      <AbeaLogo
        variant="mark"
        idPrefix="abea-hero-decor"
        className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-[78%] max-h-[40rem] -translate-y-1/2 translate-x-[14%] text-brand opacity-[0.08] select-none lg:block xl:translate-x-0"
      />

      {/* Üst boşluk alttan fazla: masaüstünde açılır menü açıkken başlık panelin altında kalır. */}
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center pt-16 pb-16 lg:min-h-[calc(100svh-5rem)] lg:pt-32 lg:pb-12">
        <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg text-ink/80 sm:text-xl">{lead}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href={primaryAction.href} variant="primary">
            {primaryAction.label}
          </ButtonLink>
          <ButtonLink href={secondaryAction.href} variant="text">
            {secondaryAction.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
