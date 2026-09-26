import { routing, type Locale } from '@/i18n/routing';
import type { Localized, LocalizedText } from '@/types/content';

function isLocalizedText(value: unknown): value is LocalizedText {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;

  const keys = Object.keys(value);
  return (
    keys.length === routing.locales.length &&
    routing.locales.every((locale) => typeof (value as Record<string, unknown>)[locale] === 'string')
  );
}

/**
 * `{ tr, en }` alanlarını seçili dile indirger — iç içe nesne ve dizilerde de.
 *
 * Bileşenler hiçbir zaman iki dili birden görmez. Payload gibi bir CMS de
 * `locale` verilince aynı şekilde tek dil döndürdüğü için, veri kaynağı
 * değiştiğinde bileşenlerin değişmesi gerekmez.
 */
export function localize<T>(value: T, locale: Locale): Localized<T> {
  if (isLocalizedText(value)) return value[locale] as Localized<T>;

  if (Array.isArray(value)) {
    return value.map((item) => localize(item, locale)) as Localized<T>;
  }

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value).map(([key, item]) => [key, localize(item, locale)]);
    return Object.fromEntries(entries) as Localized<T>;
  }

  return value as Localized<T>;
}
