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
    actions: {
      primary: NavLink;
      secondary: NavLink;
    };
  };
}

export interface LogoPageContent extends PageContent {
  /** Markdown. Boşsa "hazırlanıyor" gösterilir. */
  story: LocalizedText;
}

export interface PublicationsPageContent extends PageContent {
  library: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
  };
}

interface TitledText {
  title: LocalizedText;
  text: LocalizedText;
}

export interface PartnersPageContent extends PageContent {
  institutional: { title: LocalizedText; note: LocalizedText };
  funders: { title: LocalizedText; description: LocalizedText };
  media: { title: LocalizedText };
  press: { title: LocalizedText; kitLabel: LocalizedText };
  join: { title: LocalizedText; contactLabel: LocalizedText; cards: TitledText[] };
}

export type ApplicationType = 'uyelik' | 'gonulluluk' | 'kurumsal';

export interface MembershipPageContent extends PageContent {
  paths: (TitledText & {
    type: ApplicationType;
    action: LocalizedText;
    /** Verilirse buton bu sayfaya gider; verilmezse aşağıdaki forma iner ve türü seçer. */
    href?: AppPathname;
    featured?: boolean;
  })[];
  form: {
    title: LocalizedText;
    description: LocalizedText;
    typeLabel: LocalizedText;
    types: Record<ApplicationType, LocalizedText>;
    fields: Record<
      'name' | 'email' | 'phone' | 'city' | 'cityPlaceholder' | 'profession' | 'organization' | 'interests' | 'contribution',
      LocalizedText
    >;
    interests: LocalizedText[];
    consentBefore: LocalizedText;
    consentLink: LocalizedText;
    consentAfter: LocalizedText;
    submit: LocalizedText;
  };
  faq: {
    title: LocalizedText;
    items: { q: LocalizedText; a: LocalizedText }[];
  };
}

/* -------------------------------------------------------------------------- */
/* Koleksiyonlar (content/collections/) — ileride CMS koleksiyonu / DB tablosu */
/* -------------------------------------------------------------------------- */

/** Çalışma alanları (WEB.docx: 01–06). Yayınlar bu alanlara göre etiketlenir. */
export interface WorkArea {
  id: string;
  title: LocalizedText;
}

export type PublicationType = 'bilgi-notu' | 'politika-notu' | 'rapor';

export interface Publication {
  id: string;
  type: PublicationType;
  title: LocalizedText;
  summary: LocalizedText | null;
  /** ISO tarih (2026-05-01). Yoksa yer tutucu gösterilir. */
  date: string | null;
  /** WorkArea.id */
  area: string;
  cover: string | null;
  file: string | null;
  featured?: boolean;
}

/** Kütüphane: dışarıdaki seçilmiş kaynaklar. */
export interface LibraryItem {
  title: LocalizedText;
  publisher: LocalizedText;
  url: string;
}

export interface Partner {
  name: string;
  logo: string | null;
  url: string | null;
}

export interface PartnerGroup {
  id: string;
  label: LocalizedText;
  partners: Partner[];
}

export interface PressItem {
  outlet: string;
  date: string | null;
  title: LocalizedText;
  url: string | null;
}

/* -------------------------------------------------------------------------- */
/* Site geneli                                                                */
/* -------------------------------------------------------------------------- */

export interface FooterContent {
  description: LocalizedText;
  newsletter: {
    title: LocalizedText;
    text: LocalizedText;
    label: LocalizedText;
    placeholder: LocalizedText;
    button: LocalizedText;
  };
  contact: {
    address: LocalizedText;
    email: string;
    phone: LocalizedText;
  };
  /** `url` boşsa gösterilmez (hesap adresleri henüz belli değil). */
  socials: { name: string; url: string }[];
}
