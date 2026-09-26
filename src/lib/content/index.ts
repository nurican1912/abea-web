import 'server-only';

import { isAppPathname, type AppPathname, type Locale } from '@/i18n/routing';
import {
  isNavGroup,
  type Localized,
  type NavLink,
  type Navigation,
  type PageContent,
} from '@/types/content';

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

function assertPathname(href: string, where: string): void {
  if (!isAppPathname(href)) {
    throw new Error(`content/site/navigation.json → "${where}": "${href}" routing.ts içinde tanımlı değil.`);
  }
}

async function loadNavigation(): Promise<Navigation> {
  const navigation = await readContent<Navigation>('site/navigation');

  // JSON tip denetiminden geçmez; yanlış yazılmış bir adres derleme sırasında yakalanır.
  const check = (link: NavLink) => assertPathname(link.href, link.label.tr);
  navigation.logoMenu.forEach(check);
  navigation.main.forEach((item) => {
    check(item);
    if (isNavGroup(item)) item.children.forEach(check);
  });
  check(navigation.cta);

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
  return localize(await readContent<T>(pageFile(path)), locale);
}
