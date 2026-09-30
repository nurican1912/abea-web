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
    /** Hero'daki tek eylem: turkuaz altı çizili "Hakkımızda →" bağlantısı. */
    aboutLink: NavLink;
    /** Hero'nun altındaki aşağı okun ekran okuyucu etiketi (ok, Biz kimiz bölümüne kaydırır). */
    scrollHint: LocalizedText;
  };
  about: SectionIntro & {
    text: LocalizedText;
    stats: { value: string; label: LocalizedText }[];
    link: NavLink;
  };
  workAreas: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    linkLabel: LocalizedText;
  };
  featuredProject: SectionIntro & {
    text: LocalizedText;
    imageLabel: LocalizedText;
    link: NavLink;
  };
  values: SectionIntro & { link: NavLink };
  publications: SectionIntro & { link: NavLink };
  join: { title: LocalizedText; text: LocalizedText };
  partners: SectionIntro & { link: NavLink };
}

/** Ana sayfa bölümlerinin ortak başı: küçük üst etiket + başlık. */
interface SectionIntro {
  eyebrow: LocalizedText;
  title: LocalizedText;
}

/** `uyeler`: kurullarda görevi olmayan dernek üyeleri. */
export type Board = 'yonetim' | 'denetim' | 'etik' | 'uyeler';

/** Kurul üyesi ya da dernek üyesi (WEB-son.docx → Ekibimiz). */
export interface TeamMember {
  id: string;
  name: string;
  /** Akademik unvan (Doç. Dr.…) — isteğe bağlı. */
  title?: LocalizedText;
  /** Şimdilik kurul görevi (ör. Yönetim Kurulu Yedek Üyesi); başkan, sayman gibi görevler netleşince yazılır. */
  role: LocalizedText;
  board: Board;
  /** Etik Kurulu ve üyelerde belirtilmedi. */
  status?: 'asil' | 'yedek';
  bio?: LocalizedText;
  /** Kare kırpılmış portre; yoksa boş yuvarlak gösterilir. */
  photo?: string;
  links?: { label: LocalizedText; url: string }[];
}

export interface TeamPageContent extends PageContent {
  boards: Record<Board, LocalizedText>;
}

/** Değerlerimiz (WEB.docx) — ana sayfada ve Değerlerimiz sayfasında kullanılır. */
export interface Value {
  number: string;
  title: LocalizedText;
  text: LocalizedText;
}

/** Hikâyemiz zaman çizelgesindeki bir dönüm noktası. Aynı yıla birden fazla girilebilir. */
export interface Milestone {
  year: string;
  title: LocalizedText;
  text?: LocalizedText;
  /** Yoksa fotoğrafın yeri boş kutu olarak durur. */
  photo?: string;
  photoAlt?: LocalizedText;
}

export interface StoryPageContent extends PageContent {
  milestones: Milestone[];
}

/** Logonun, okunan bölümde öne çıkan parçası (`all`: logonun tamamı). */
export type LogoPart = 'all' | 'dot' | 'rings' | 'lines' | 'mark' | 'type';

export interface LogoStoryBlock {
  /** `quote`: bölümdeki vurgulu cümle */
  type: 'p' | 'quote';
  text: LocalizedText;
}

export interface LogoStoryPart {
  id: string;
  part: LogoPart;
  title: LocalizedText;
  blocks: LogoStoryBlock[];
}

export interface LogoPageContent extends PageContent {
  sections: LogoStoryPart[];
}

/** Tüzük metninin bir parçası. Tüzük resmî belge olduğu için yalnızca Türkçedir. */
export type BylawsBlock =
  | { type: 'p'; text: string }
  /** "Alındı Belgeleri" gibi madde içi ara başlık */
  | { type: 'h'; text: string }
  /** "12.4" ya da "a" gibi numaralı bent */
  | { type: 'item'; label: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface BylawsArticle {
  /** Sayfa içi bağlantı: #madde-12 */
  id: string;
  label: string;
  /** Geçici maddenin başlığı yok. */
  title: string;
  blocks: BylawsBlock[];
}

export interface BylawsPageContent extends PageContent {
  approval: LocalizedText;
  /** Türkçe sayfada boş; İngilizce sayfada "tüzük yalnızca Türkçedir" notu. */
  languageNote: LocalizedText;
  pdf: string;
  pdfLabel: LocalizedText;
  closing: string;
  articles: BylawsArticle[];
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

export type WorkAreaIconName = 'community' | 'skyscraper' | 'school' | 'volunteering' | 'research' | 'shield';

/**
 * Çalışma alanı = Çalışmalarımız alt sayfası. Başlık menüdeki adın sondaki
 * "Çalışmaları" kelimesi atılmış hâlidir (o kelime kartın bağlantısında ortak).
 */
export interface WorkArea {
  id: string;
  icon: WorkAreaIconName;
  title: LocalizedText;
  /** Kartın ("Çalışmaları inceleyin") gideceği Çalışmalarımız alt sayfası. */
  href: AppPathname;
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
