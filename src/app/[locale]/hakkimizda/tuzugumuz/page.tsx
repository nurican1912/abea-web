import { Download } from 'lucide-react';
import type { Metadata } from 'next';

import { BylawsText } from '@/components/sections/tuzugumuz/BylawsText';
import { BylawsToc } from '@/components/sections/tuzugumuz/BylawsToc';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { card, primaryButton } from '@/components/ui/styles';
import { resolveLocale } from '@/i18n/locale';
import { getPage, getParents } from '@/lib/content';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/seo';
import type { BylawsPageContent } from '@/types/content';

// Hakkımızda › Tüzüğümüz
const PATH = '/hakkimizda/tuzugumuz';

export async function generateMetadata({ params }: PageProps<'/[locale]/hakkimizda/tuzugumuz'>): Promise<Metadata> {
  return pageMetadata(PATH, await resolveLocale(params));
}

export default async function BylawsPage({ params }: PageProps<'/[locale]/hakkimizda/tuzugumuz'>) {
  const locale = await resolveLocale(params);
  const [page, parents] = await Promise.all([getPage<BylawsPageContent>(PATH, locale), getParents(PATH, locale)]);

  const toc = page.articles.map(({ id, label, title }) => ({ id, label, title }));

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />
      <div className="bg-surface-soft">
        <Container className="py-10 sm:py-14">
          {/* Resmî bilgi + PDF */}
          <div className={cn(card, 'flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10')}>
            <div className="max-w-2xl space-y-2">
              <p className="text-ink/80">{page.approval}</p>
              {page.languageNote && <p className="font-semibold">{page.languageNote}</p>}
            </div>
            <a href={page.pdf} download className={cn(primaryButton, 'inline-flex shrink-0 self-start md:self-auto')}>
              <Download aria-hidden className="size-4" />
              {page.pdfLabel}
            </a>
          </div>

          <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
            <BylawsToc items={toc} />
            <div className={cn(card, 'p-6 sm:p-10')}>
              <BylawsText articles={page.articles} closing={page.closing} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
