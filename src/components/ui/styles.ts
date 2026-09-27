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

/** İkincil buton — lacivert çerçeve, üzerine gelince dolar. */
export const secondaryButton = `${buttonBase} border-2 border-primary text-primary hover:bg-primary hover:text-white`;

/** İkincil eylem — buton değil, turkuaz altı çizili metin bağlantısı. */
export const textLink =
  'min-h-11 items-center gap-2 font-display text-base font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[10px] transition-colors hover:decoration-ink';

/** Koyu zemin üstünde (ör. öne çıkan yayın) turkuaz buton — koyu yazı. */
export const brandButton =
  'min-h-12 items-center justify-center gap-2 rounded-[11px] bg-brand px-6 font-display text-base font-semibold whitespace-nowrap text-ink transition-colors hover:bg-white';

/** Koyu zemin üstünde çerçeveli buton — beyaz yazı. */
export const outlineLightButton =
  'min-h-12 items-center justify-center gap-2 rounded-[11px] border border-white/60 px-6 font-display text-base font-semibold whitespace-nowrap text-white transition-colors hover:border-white hover:bg-white/10';

/* ---- Sayfa yapı taşları --------------------------------------------------- */

/** Bölüm başlığı (h2). */
export const sectionTitle = 'font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.1] font-semibold text-balance';

/** Başlık üstündeki küçük büyük harfli etiket ("KÜTÜPHANE", "BİLGİ NOTU"). */
export const eyebrow = 'font-display text-sm font-semibold tracking-[0.12em] uppercase';

/** Beyaz kart — bej zemin üstünde. */
export const card = 'rounded-xl border border-line bg-surface';

/** Form alanı (input / select / textarea) — 48px yükseklik, dokunmaya uygun. */
export const formField =
  'min-h-12 w-full rounded-lg border border-line bg-surface px-4 text-base text-ink placeholder:text-muted focus-visible:border-ink';

/** Form etiketi. */
export const formLabel = 'text-sm font-semibold';

/** Henüz içeriği gelmemiş logo / kapak yeri: kesik çizgili kutu. */
export const placeholderBox =
  'flex items-center justify-center rounded-lg border border-dashed border-line bg-surface text-center text-sm text-muted';

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
