'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useMemo, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { formField as fieldClass, formLabel, outlineButton } from '@/components/ui/styles';
import type { Localized, Publication, PublicationType, WorkArea } from '@/types/content';

import { FeaturedPublication } from './FeaturedPublication';
import { PublicationCard } from './PublicationCard';
import { PAGE_SIZE } from './publication-config';

interface PublicationBrowserProps {
  publications: Localized<Publication>[];
  areas: Localized<WorkArea>[];
  /** Sekmenin türü; `null` → tüm türler. */
  type: PublicationType | null;
}

/** Arama + alan + yıl filtresi, öne çıkan yayın ve yayın ızgarası. */
export function PublicationBrowser({ publications, areas, type }: PublicationBrowserProps) {
  const t = useTranslations('Publications');
  const ids = { search: useId(), area: useId(), year: useId() };

  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');
  const [year, setYear] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const ofType = useMemo(() => publications.filter((p) => !type || p.type === type), [publications, type]);
  const years = useMemo(
    () => [...new Set(ofType.map((p) => p.date?.slice(0, 4)).filter(Boolean) as string[])].sort().reverse(),
    [ofType],
  );

  const filtering = Boolean(query || area || year);
  const featured = filtering ? undefined : ofType.find((p) => p.featured);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return ofType.filter(
      (p) =>
        p !== featured &&
        (!area || p.area === area) &&
        (!year || p.date?.startsWith(year)) &&
        (!needle || `${p.title} ${p.summary ?? ''}`.toLocaleLowerCase().includes(needle)),
    );
  }, [ofType, featured, query, area, year]);

  const labelsFor = (p: Localized<Publication>) => ({
    type: t(`types.${p.type}`),
    area: t('area', { id: p.area }),
    date: p.date ?? t('datePlaceholder'),
    cover: t('cover'),
  });

  // Filtre değişince liste baştan (ilk sayfa) gösterilir.
  const update = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      <div className="border-b border-line bg-surface-soft">
        <Container className="grid gap-4 py-6 md:grid-cols-[1fr_16rem_11rem]">
          <div>
            <label htmlFor={ids.search} className={formLabel}>
              {t('searchLabel')}
            </label>
            <div className="relative mt-2">
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
              <input
                id={ids.search}
                type="search"
                value={query}
                onChange={(e) => update(setQuery)(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className={`${fieldClass} pl-11`}
              />
            </div>
          </div>
          <div>
            <label htmlFor={ids.area} className={formLabel}>
              {t('areaLabel')}
            </label>
            <select id={ids.area} value={area} onChange={(e) => update(setArea)(e.target.value)} className={`${fieldClass} mt-2`}>
              <option value="">{t('allAreas')}</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} · {a.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.year} className={formLabel}>
              {t('yearLabel')}
            </label>
            <select id={ids.year} value={year} onChange={(e) => update(setYear)(e.target.value)} className={`${fieldClass} mt-2`}>
              <option value="">{t('allYears')}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </Container>
      </div>

      <Container className="space-y-10 py-12 sm:py-14">
        {featured && (
          <FeaturedPublication
            publication={featured}
            labels={{
              ...labelsFor(featured),
              featured: t('featured'),
              downloadPdf: t('downloadPdf'),
              readSummary: t('readSummary'),
              reportCover: t('reportCover'),
            }}
          />
        )}

        {results.length === 0 ? (
          <p role="status" className="rounded-xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            {t('noResults')}
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {results.slice(0, visible).map((p) => (
              <li key={p.id}>
                <PublicationCard publication={p} labels={labelsFor(p)} />
              </li>
            ))}
          </ul>
        )}

        {results.length > visible && (
          <div className="text-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className={outlineButton}>
              {t('loadMore')}
            </button>
          </div>
        )}
      </Container>
    </>
  );
}
