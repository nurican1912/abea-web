/**
 * Açılış animasyonu ayarları.
 *
 * `policy` — animasyon ne sıklıkla oynasın:
 *   'tab'    Sekme başına bir kez: yenilemede gelmez, yeni sekmede gelir.  (şimdiki)
 *   'device' Cihazda yalnızca ilk ziyarette.
 *   '7days'  Cihazda en fazla `repeatDays` günde bir.
 *
 * Adresin sonuna `?intro` eklenince kural ne olursa olsun oynar (demo / test).
 */
export type IntroPolicy = 'tab' | 'device' | '7days';

export const INTRO = {
  policy: 'tab' as IntroPolicy,
  repeatDays: 7,
  storageKey: 'abea-intro-played',
  forceParam: 'intro',
  /** Animasyon oynayacaksa <html>'e eklenir; katmanı gösterir, topbar logosunu gizler. */
  pendingClass: 'intro-pending',
  /** Bileşen animasyonu başlatınca <html>'e eklenir. */
  startedAttr: 'data-intro-started',
  /** JS bu süre içinde animasyonu başlatamazsa katman kaldırılır; sayfa kilitli kalmaz. */
  fallbackMs: 5000,
} as const;
