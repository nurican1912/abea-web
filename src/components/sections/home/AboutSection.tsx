import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Link } from '@/i18n/navigation';
import type { HomePageContent, Localized } from '@/types/content';

interface AboutSectionProps {
  content: Localized<HomePageContent>['about'];
}

/** Bölümün çapası — hero'daki aşağı ok buraya kaydırır. */
export const ABOUT_ID = 'biz-kimiz';

/** 2 · Biz kimiz: kısa hikâye + üç gerçek rakam. Bağlantı, metni okuduktan sonra gelir. */
export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id={ABOUT_ID} aria-labelledby="about-title" className="border-t border-line bg-surface py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <SectionHeading id="about-title" eyebrow={content.eyebrow} title={content.title} />
          <p className="mt-6 max-w-[62ch] text-lg text-ink/80">{content.text}</p>
          <Link
            href={content.link.href}
            className="group mt-8 inline-flex min-h-11 items-center gap-2 font-display font-semibold underline decoration-brand decoration-2 underline-offset-8 hover:decoration-ink"
          >
            {content.link.label}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="grid content-center gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {content.stats.map((stat) => (
            <li key={stat.value} className="flex items-baseline gap-4 rounded-xl bg-surface-soft px-6 py-5">
              {/* Rakam turkuaz değil lacivert (turkuaz yazı olarak okunmaz); turkuaz, soldaki çizgide. */}
              <strong className="border-l-[3px] border-brand pl-4 font-display text-5xl leading-none font-semibold">
                {stat.value}
              </strong>
              <span className="text-ink/75">{stat.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
