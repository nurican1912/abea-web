/*
 * Birden fazla bileşende tekrar eden sınıf dizileri.
 * Buton gibi bir öğenin görünümü değişecekse tek yerden değişsin diye.
 */

/**
 * Çağrı butonu (Üye / Gönüllü Ol, Başvur…) — mercan zemin, koyu yazı.
 * `display` içermez: kullanan yer `inline-flex` / `flex` / `hidden lg:inline-flex` ekler
 * (aynı öğede iki display sınıfı çakışır).
 */
export const ctaButton =
  'min-h-11 items-center justify-center rounded-md bg-accent px-5 font-display text-base font-semibold tracking-wide text-ink transition-colors hover:bg-accent-strong';

/** İkincil buton — çerçeveli. */
export const outlineButton =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-brand';

/**
 * Logodaki şeritleri hatırlatan turkuaz alt çizgi: üzerine gelince soldan
 * sağa çizilir. `data-active` / `aria-expanded="true"` iken çizili kalır.
 */
export const stripeUnderline =
  'relative after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 data-[active=true]:after:scale-x-100 aria-expanded:after:scale-x-100';
