import 'server-only';

import { isAppPathname, type AppPathname, type Locale } from '@/i18n/routing';
import { isNavGroup, type FooterContent, type Localized, type Navigation, type PageContent } from '@/types/content';

import { readContent } from './json-source';
import { localize } from './localize';

/*
 * VERİ KATMANI
 * ------------
 * Sayfa ve bileşenlerin veri istediği tek yer. Hiçbir sayfa `content/`
 * klasörünü doğrudan okumaz; panel geldiğinde yalnızca bu klasör değişir.
 */

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

/* -------------------------------------------------------------------------- */
/* Menü                                                                       */
/* -------------------------------------------------------------------------- */

async function loadNavigation(): Promise<Navigation> {
  const navigation = await readContent<Navigation>('site/navigation');
  assertHrefs(navigation, 'site/navigation');
  return navigation;
}

export type NavigationView = Localized<Navigation>;
export type NavLinkView = NavigationView['cta'];

export async function getNavigation(locale: Locale): Promise<NavigationView> {
  return localize(await loadNavigation(), locale);
}

/** Bir sayfanın menüdeki üst başlıkları — ör. Ekibimiz için [Hakkımızda]. Yol satırında kullanılır. */
export async function getParents(path: AppPathname, locale: Locale): Promise<NavLinkView[]> {
  const navigation = await getNavigation(locale);

  for (const item of navigation.main) {
    if (isNavGroup(item) && item.children.some((child) => child.href === path)) {
      return [{ label: item.label, href: item.href }];
    }
  }
  return [];
}

export interface SectionView {
  label: string;
  href: AppPathname;
  children: (NavLinkView & { description?: string })[];
}

/** Menü başlığı + alt sayfaları (açıklamalarıyla) — başlıkların genel bakış sayfaları için. */
export async function getSection(groupPath: AppPathname, locale: Locale): Promise<SectionView> {
  const navigation = await getNavigation(locale);
  const group = navigation.main.find((item) => item.href === groupPath);

  if (!group || !isNavGroup(group)) {
    throw new Error(`"${groupPath}" alt menüsü olan bir başlık değil.`);
  }

  const children = await Promise.all(
    group.children.map(async (child) => ({
      ...child,
      description: (await getPage(child.href, locale)).description,
    })),
  );
  return { label: group.label, href: group.href, children };
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

/* -------------------------------------------------------------------------- */
/* Koleksiyonlar ve site geneli                                               */
/* -------------------------------------------------------------------------- */

/** `content/collections/<name>.json` — tek dile indirgenmiş liste. */
export async function getCollection<T>(name: string, locale: Locale): Promise<Localized<T>[]> {
  const file = `collections/${name}`;
  const items = await readContent<T[]>(file);
  assertHrefs(items, file);
  return localize(items, locale);
}

export async function getFooter(locale: Locale): Promise<Localized<FooterContent>> {
  return localize(await readContent<FooterContent>('site/footer'), locale);
}
