import { PageHeader } from '@/components/ui/PageHeader';
import type { AppPathname, Locale } from '@/i18n/routing';
import { getCollection, getPage, getParents, getSection } from '@/lib/content';
import type { LibraryItem, Publication, PublicationsPageContent, WorkArea } from '@/types/content';

import { LibrarySection } from './LibrarySection';
import { PublicationBrowser } from './PublicationBrowser';
import { PublicationTabs } from './PublicationTabs';
import { LIBRARY_PATH, PUBLICATIONS_PATH, TAB_TYPES } from './publication-config';

interface PublicationsViewProps {
  /** Bulunulan sekme: /yayinlar (Tümü), /yayinlar/bilgi-notlari … */
  path: AppPathname;
  locale: Locale;
}

/**
 * Yayınlar sayfası ve alt sekmeleri. Her sekme kendi adresinde; yalnızca
 * listelenen tür ve gösterilen bölümler değişir.
 */
export async function PublicationsView({ path, locale }: PublicationsViewProps) {
  const [page, overview, section, parents, publications, areas, library] = await Promise.all([
    getPage(path, locale),
    getPage<PublicationsPageContent>(PUBLICATIONS_PATH, locale),
    getSection(PUBLICATIONS_PATH, locale),
    getParents(path, locale),
    getCollection<Publication>('publications', locale),
    getCollection<WorkArea>('work-areas', locale),
    getCollection<LibraryItem>('library', locale),
  ]);

  const isLibrary = path === LIBRARY_PATH;
  const showLibrary = isLibrary || path === PUBLICATIONS_PATH;

  return (
    <>
      <PageHeader title={page.title} description={page.description} parents={parents}>
        <PublicationTabs tabs={section.children} active={path} />
      </PageHeader>
      <div className="bg-surface-soft">
        {!isLibrary && <PublicationBrowser publications={publications} areas={areas} type={TAB_TYPES[path] ?? null} />}
        {showLibrary && (
          <div className={isLibrary ? 'pt-12 sm:pt-14' : undefined}>
            <LibrarySection content={overview.library} items={library} />
          </div>
        )}
      </div>
    </>
  );
}
