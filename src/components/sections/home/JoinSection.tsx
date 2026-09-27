import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { sectionTitle } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { NavLinkView } from '@/lib/content';
import type { HomePageContent, Localized, MembershipPageContent } from '@/types/content';

interface JoinSectionProps {
  content: Localized<HomePageContent>['join'];
  /** Üç katılım yolu — Üyelik & Gönüllülük sayfasından gelir (metin tek yerde yazılır). */
  paths: Localized<MembershipPageContent>['paths'];
  cta: NavLinkView;
}

/**
 * 8 · Katılın: koyu lacivert son çağrı (sayfanın en altında). Sarı buton topbar'dakiyle aynı yere
 * gider ama bağlamı farklı — sayfanın hikâyesini okumuş kişiye son çağrı.
 */
export function JoinSection({ content, paths, cta }: JoinSectionProps) {
  return (
    <section aria-labelledby="join-title" className="bg-primary py-16 text-white sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <h2 id="join-title" className={cn(sectionTitle, 'text-white')}>
              {content.title}
            </h2>
            <p className="mt-4 text-lg text-white/80">{content.text}</p>
          </div>
          <ButtonLink href={cta.href} variant="cta" className="flex w-full sm:inline-flex sm:w-auto">
            {cta.label}
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {paths.map((path) => (
            <li key={path.type} className="rounded-xl bg-primary-strong p-6">
              <h3 className="font-display text-2xl font-semibold">{path.title}</h3>
              <p className="mt-2 text-white/80">{path.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
