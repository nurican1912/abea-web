import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { card, eyebrow, sectionTitle } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { LibraryItem, Localized, PublicationsPageContent } from '@/types/content';

interface LibrarySectionProps {
  content: Localized<PublicationsPageContent>['library'];
  items: Localized<LibraryItem>[];
}

/** Kütüphane: seçilmiş dış kaynaklar (yeni sekmede açılır). */
export function LibrarySection({ content, items }: LibrarySectionProps) {
  return (
    <Container className="pb-14 sm:pb-16">
      <section aria-labelledby="library-title" className={cn(card, 'grid gap-8 p-7 sm:p-10 lg:grid-cols-[2fr_3fr] lg:gap-12 lg:p-14')}>
        <div>
          <p className={cn(eyebrow, 'text-primary')}>{content.eyebrow}</p>
          <h2 id="library-title" className={cn(sectionTitle, 'mt-3')}>
            {content.title}
          </h2>
          <p className="mt-4 text-ink/75">{content.description}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-3 rounded-lg bg-surface-soft p-5 transition-colors hover:bg-surface-muted"
              >
                <span>
                  <span className="block font-semibold leading-snug">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted">{item.publisher}</span>
                </span>
                <ArrowUpRight aria-hidden className="mt-0.5 size-4 shrink-0 text-muted transition-colors group-hover:text-ink" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
