import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { card } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { HomePageContent, Localized, Value } from '@/types/content';

interface ValuesSectionProps {
  content: Localized<HomePageContent>['values'];
  values: Localized<Value>[];
}

/** 5 · Değerlerimiz: yedi değer — numara + başlık + kısa açıklama. Dar ekranda yatay kayar. */
export function ValuesSection({ content, values }: ValuesSectionProps) {
  return (
    <section aria-labelledby="values-title" className="bg-surface-soft py-16 sm:py-20">
      <Container>
        <SectionHeading id="values-title" eyebrow={content.eyebrow} title={content.title} link={content.link} />
        <ol className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {values.map((value) => (
            <li key={value.number} className={cn(card, 'flex w-72 shrink-0 snap-start flex-col p-6 sm:w-auto')}>
              <span className="font-display text-3xl font-semibold text-muted">{value.number}</span>
              <h3 className="mt-3 font-display text-xl leading-snug font-semibold">{value.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink/75">{value.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
