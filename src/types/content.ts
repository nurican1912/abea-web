import type { AppPathname, Locale } from '@/i18n/routing';

/**
 * İçerik tipleri — tek kaynak.
 *
 * `content/` altındaki JSON dosyaları bu şekle uyar. Alan adları, ileride
 * kurulacak CMS koleksiyonlarına / veritabanı tablolarına birebir taşınacak
 * şekilde seçilmiştir.
 */

/** Her dilde karşılığı olan metin: `{ "tr": "...", "en": "..." }` */
export type LocalizedText = Record<Locale, string>;

/** Bir içerik tipinin tek dile indirgenmiş hâli (bileşenlere giden şekil). */
export type Localized<T> = T extends LocalizedText
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

/* -------------------------------------------------------------------------- */
/* Menü                                                                       */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: LocalizedText;
  href: AppPathname;
}

/** Alt menüsü olan başlık. Tıklanınca sayfaya gitmez, alt menüyü açar. */
export interface NavGroup {
  label: LocalizedText;
  /** Grubun kök adresi — aktif menüyü bulmak ve yönlendirme için. */
  href: AppPathname;
  children: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export interface Navigation {
  /** Logonun altındaki menü (Logomuzun Hikâyesi). */
  logoMenu: NavLink[];
  main: NavItem[];
  cta: NavLink;
}

/** Hem ham (`NavItem`) hem tek dile indirgenmiş menü öğelerinde çalışır. */
export function isNavGroup<T extends object>(item: T): item is Extract<T, { children: unknown }> {
  return 'children' in item && Array.isArray(item.children);
}

/* -------------------------------------------------------------------------- */
/* Sayfalar                                                                   */
/* -------------------------------------------------------------------------- */

/** Her sayfanın ortak alanları (başlık + SEO açıklaması). */
export interface PageContent {
  title: LocalizedText;
  description?: LocalizedText;
}

export interface HomePageContent extends PageContent {
  hero: {
    title: LocalizedText;
    lead: LocalizedText;
  };
}

export interface LogoPageContent extends PageContent {
  /** Markdown. Boşsa "hazırlanıyor" gösterilir. */
  story: LocalizedText;
}
