import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { card, sectionTitle } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Localized, MembershipPageContent } from '@/types/content';

interface FaqProps {
  content: Localized<MembershipPageContent>['faq'];
}

/** Sık sorulan sorular — açılır kapanır liste (JS'siz de çalışır). */
export function Faq({ content }: FaqProps) {
  return (
    <Container as="section" aria-labelledby="faq-title" className="grid gap-8 pb-14 sm:pb-16 lg:grid-cols-[1fr_2fr] lg:gap-12">
      <h2 id="faq-title" className={sectionTitle}>
        {content.title}
      </h2>
      <div className={cn(card, 'divide-y divide-line')}>
        {content.items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-5 text-ink/75">{item.a}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
