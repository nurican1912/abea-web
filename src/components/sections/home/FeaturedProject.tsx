import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { eyebrow, sectionTitle } from '@/components/ui/styles';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { HomePageContent, Localized } from '@/types/content';

interface FeaturedProjectProps {
  content: Localized<HomePageContent>['featuredProject'];
}

/** 4 · Öne çıkan proje: solda görsel, sağda kısa hikâye. */
export function FeaturedProject({ content }: FeaturedProjectProps) {
  return (
    <section aria-labelledby="project-title" className="bg-surface py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Fotoğraf gelene kadar yer tutucu (bkz. SORULAR.md #10). */}
        <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-surface-muted">
          <span className={cn(eyebrow, 'text-xs text-muted')}>[{content.imageLabel}]</span>
        </div>

        <div>
          <p className={cn(eyebrow, 'text-primary')}>{content.eyebrow}</p>
          <h2 id="project-title" className={cn(sectionTitle, 'mt-3')}>
            {content.title}
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg text-ink/80">{content.text}</p>
          <Link
            href={content.link.href}
            className="group mt-8 inline-flex min-h-11 items-center gap-2 font-display font-semibold underline decoration-brand decoration-2 underline-offset-8 hover:decoration-ink"
          >
            {content.link.label}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
