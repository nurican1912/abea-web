import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { sectionTitle } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Localized, PartnersPageContent } from '@/types/content';

interface PartnerWithUsProps {
  content: Localized<PartnersPageContent>['join'];
  /** "Bize ulaşın" — iletişim sayfası olana kadar e-posta. */
  email: string;
}

/** "Paydaşımız olun" — koyu lacivert çağrı alanı ve üç ortaklık yolu. */
export function PartnerWithUs({ content, email }: PartnerWithUsProps) {
  return (
    <Container className="pb-14 sm:pb-16">
      <section aria-labelledby="partner-title" className="rounded-xl bg-primary p-7 text-white sm:p-10 lg:p-14">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 id="partner-title" className={cn(sectionTitle, 'text-white')}>
            {content.title}
          </h2>
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-[11px] bg-white px-6 font-display font-semibold text-ink transition-colors hover:bg-surface-soft focus-visible:outline-white"
          >
            {content.contactLabel}
            <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {content.cards.map((item) => (
            <li key={item.title} className="rounded-lg bg-primary-strong p-6">
              <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-white/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
