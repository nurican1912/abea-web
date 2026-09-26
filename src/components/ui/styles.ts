/*
 * Birden fazla bileşende tekrar eden sınıf dizileri.
 * Buton gibi bir öğenin görünümü değişecekse tek yerden değişsin diye.
 *
 * Buton sınıfları `display` içermez: kullanan yer `inline-flex` / `flex` /
 * `hidden lg:inline-flex` ekler (aynı öğede iki display sınıfı çakışır).
 * Klavye odağı `globals.css`'teki `:focus-visible` kuralından gelir (koyu lacivert halka).
 */

const buttonBase =
  'min-h-12 items-center justify-center gap-2 rounded-[11px] px-6 font-display text-base font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200';

/** Hafif yukarı kalkma + gölge — hareket azaltma tercihinde yalnızca renk değişir. */
const lift =
  'hover:-translate-y-px hover:shadow-[0_8px_18px_-10px_rgb(14_42_56/0.5)] motion-reduce:hover:translate-y-0';

/** Ana dönüşüm eylemi (Aramıza Katıl) — kehribar zemin, koyu yazı. Sayfadaki en belirgin eylem. */
export const ctaButton = `${buttonBase} ${lift} bg-cta text-ink hover:bg-cta-strong`;

/** Birincil buton (Çalışmalarımızı Keşfet…) — koyu lacivert zemin, beyaz yazı. */
export const primaryButton = `${buttonBase} ${lift} bg-primary text-white hover:bg-primary-strong`;

/** İkincil eylem — buton değil, turkuaz altı çizili metin bağlantısı. */
export const textLink =
  'min-h-11 items-center gap-2 font-display text-base font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[10px] transition-colors hover:decoration-ink';

/** İkincil buton — çerçeveli. */
export const outlineButton =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-brand';

/**
 * Logodaki şeritleri hatırlatan turkuaz alt çizgi — menü başlığının METNİNE uygulanır.
 * Başlığın kendisi (`group`) üzerine gelindiğinde, açıkken (`aria-expanded`) ya da
 * bulunulan bölümdeyken (`data-active`) çizgi soldan sağa çizilir.
 */
export const stripeUnderline =
  'relative after:absolute after:inset-x-0 after:-bottom-2 after:h-[3px] after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-aria-expanded:after:scale-x-100 group-data-[active=true]:after:scale-x-100';
