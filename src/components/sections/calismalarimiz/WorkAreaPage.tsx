import type { CSSProperties } from 'react';

import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { card, eyebrow, sectionTitle } from '@/components/ui/styles';
import { WorkAreaCard } from '@/components/work-areas/WorkAreaCard';
import { WorkAreaIcon } from '@/components/work-areas/WorkAreaIcon';
import type { AppPathname, Locale } from '@/i18n/routing';
import { getCollection, getPage, getParents } from '@/lib/content';
import { cn } from '@/lib/cn';
import type { WorkArea } from '@/types/content';

interface WorkAreaPageProps {
  path: AppPathname;
  locale: Locale;
}

/**
 * Çalışma alanı sayfalarının ortak şablonu: başlık, kendiliğinden çizilen
 * büyük ikon, alanın alt konuları ve diğer alanlara geçiş kartları.
 * Alt konular `work-areas.json`'dan gelir; başlık ve açıklama sayfanın kendi içerik dosyasından.
 */
export async function WorkAreaPage({ path, locale }: WorkAreaPageProps) {
  const [page, parents, areas, t] = await Promise.all([
    getPage(path, locale),
    getParents(path, locale),
    getCollection<WorkArea>('work-areas', locale),
    getTranslations({ locale, namespace: 'WorkArea' }),
  ]);

  const area = areas.find((item) => item.href === path);
  if (!area) throw new Error(`content/collections/work-areas.json içinde "${path}" yok.`);
  const others = areas.filter((item) => item !== area);

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents} />

      <section aria-labelledby="area-topics-title" className="bg-surface-soft">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
          {/* Alanın ikonu — sayfa açılınca bir kez çizilir. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className={cn(card, 'relative flex aspect-square w-48 items-center justify-center lg:w-full')}>
              <span className="absolute top-4 left-5 font-display text-sm font-semibold tracking-[0.12em] text-primary tabular-nums">
                {area.id}
              </span>
              <WorkAreaIcon name={area.icon} autoPlay className="size-28 text-ink lg:size-40" />
            </div>
          </div>

          <div>
            <p className={cn(eyebrow, 'text-primary')}>{t('topicsEyebrow')}</p>
            <h2 id="area-topics-title" className={cn(sectionTitle, 'mt-3')}>
              {t('topicsTitle')}
            </h2>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {area.topics.map((topic, i) => (
                <li
                  key={topic}
                  style={{ '--i': i } as CSSProperties}
                  className={cn(card, 'area-topic flex items-baseline gap-4 p-5 sm:p-6')}
                >
                  <span aria-hidden className="font-display text-sm font-semibold tracking-[0.12em] text-primary tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl leading-snug font-semibold text-balance">{topic}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-muted">{t('soon')}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="other-areas-title" className="border-t border-line bg-surface-soft py-14 sm:py-16">
        <Container>
          <h2 id="other-areas-title" className={sectionTitle}>
            {t('othersTitle')}
          </h2>
          {/* Ana sayfadaki kartların aynısı: mobilde yatay kayan şerit, geniş ekranda 5 sütun. */}
          <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 xl:grid-cols-5">
            {others.map((item) => (
              <li key={item.id} className="w-64 shrink-0 snap-start sm:w-auto">
                <WorkAreaCard icon={item.icon} title={item.title} href={item.href} linkLabel={t('cardLink')} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
