import 'server-only';

import { isAppPathname, type AppPathname, type Locale } from '@/i18n/routing';
import { isNavGroup, type Localized, type Navigation, type PageContent } from '@/types/content';

import { readContent } from './json-source';
import { localize } from './localize';

/*
 * VERİ KATMANI
 * ------------
 * Sayfa ve bileşenlerin veri istediği tek yer. Hiçbir sayfa `content/`
 * klasörünü doğrudan okumaz; panel geldiğinde yalnızca bu klasör değişir.
 */

/* -------------------------------------------------------------------------- */
/* Menü                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * İçerikteki her `href` alanının `routing.ts`'te tanımlı bir sayfa olduğunu doğrular.
 * JSON tip denetiminden geçmez; yanlış yazılmış bir adres böylece derleme sırasında yakalanır.
 */
function assertHrefs(value: unknown, file: string): void {
  if (Array.isArray(value)) return value.forEach((item) => assertHrefs(item, file));
  if (typeof value !== 'object' || value === null) return;

  for (const [key, item] of Object.entries(value)) {
    if (key === 'href' && typeof item === 'string' && !isAppPathname(item)) {
      throw new Error(`content/${file}.json → "${item}" routing.ts içinde tanımlı değil.`);
    }
    assertHrefs(item, file);
  }
}

async function loadNavigation(): Promise<Navigation> {
  const navigation = await readContent<Navigation>('site/navigation');
  assertHrefs(navigation, 'site/navigation');
  return navigation;
}

export type NavigationView = Localized<Navigation>;

export async function getNavigation(locale: Locale): Promise<NavigationView> {
  return localize(await loadNavigation(), locale);
}

/** Bir sayfanın menüdeki üst başlıkları — ör. Ekibimiz için ["Hakkımızda"]. */
export async function getParentLabels(path: AppPathname, locale: Locale): Promise<string[]> {
  const navigation = await getNavigation(locale);

  for (const item of navigation.main) {
    if (isNavGroup(item) && item.children.some((child) => child.href === path)) {
      return [item.label];
    }
  }
  return [];
}

/** Menü başlığının ilk alt sayfası — `/hakkimizda` gibi adresler buraya yönlenir. */
export async function getFirstChildPath(groupPath: AppPathname): Promise<AppPathname> {
  const navigation = await loadNavigation();
  const group = navigation.main.find((item) => item.href === groupPath);

  if (!group || !isNavGroup(group) || group.children.length === 0) {
    throw new Error(`"${groupPath}" alt menüsü olan bir başlık değil.`);
  }
  return group.children[0].href;
}

/* -------------------------------------------------------------------------- */
/* Sayfalar                                                                   */
/* -------------------------------------------------------------------------- */

/** `/hakkimizda/ekibimiz` → `content/pages/hakkimizda/ekibimiz.json` */
function pageFile(path: AppPathname): string {
  return path === '/' ? 'pages/home' : `pages${path}`;
}

export async function getPage<T extends PageContent = PageContent>(
  path: AppPathname,
  locale: Locale,
): Promise<Localized<T>> {
  const file = pageFile(path);
  const page = await readContent<T>(file);
  assertHrefs(page, file);
  return localize(page, locale);
}
