import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { Container } from '@/components/ui/Container';

interface HomeHeroProps {
  title: string;
  lead: string;
}

/** Ana sayfanın ilk ekranı. Diğer bölümler ana sayfa taslağı netleşince eklenecek. */
export function HomeHero({ title, lead }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Dekor: logonun halkaları, sağ tarafta çok soluk */}
      <AbeaLogo
        variant="mark"
        idPrefix="abea-hero-decor"
        className="pointer-events-none absolute top-1/2 -right-24 -z-10 hidden h-[130%] -translate-y-1/2 text-brand opacity-[0.07] md:block lg:-right-10"
      />

      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 lg:min-h-[calc(100svh-5rem)]">
        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7.5vw,5.25rem)] leading-[1.02] font-semibold text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{lead}</p>
      </Container>
    </section>
  );
}
