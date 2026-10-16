import { cn } from '@/lib/cn';
import type { WorkAreaIconName } from '@/types/content';

/**
 * Çalışma alanı ikonları — logonun çizgi dilinde, 96×96 ızgara, tek renk (`currentColor`).
 *
 *   draw  : kalın çizgi — nesnenin kendisi (kuleler, okul, kalkan…)
 *   waves : ince çizgi — dalga yayları (ya da güneşin ışınları); `origin`den
 *           dışa doğru yayılır. İki yanlı yaylarda sol ve sağ yay tek yolda
 *           durur, böylece birlikte gelirler.
 *   origin: dalgaların merkezi (episantr)
 *   dot   : episantr noktasının yarıçapı; yoksa nokta çizilmez (dalgalar yine origin'den yayılır)
 *
 * Kart üzerine gelindiğinde `work-areas.css`: nesne logo gibi baştan çizilir,
 * nokta belirir ve şok halkası yayılır, dalgalar sırayla büyüyerek gelir.
 * `autoPlay` ile aynı çizim, kart olmadan, sayfa açıldığında bir kez oynar
 * (alan sayfalarının başındaki büyük ikon).
 */

interface IconShape {
  /**
   * Çizimin (dalgalar dahil) sınır kutusunun merkezi — tarayıcıda getBBox ile ölçüldü.
   * Görüş kutusu buna göre kaydırılır; böylece her ikon kendi kutusunda tam ortalanır
   * ve kartlarda aynı hizada durur. Çizim değişirse yeniden ölçülmeli.
   */
  center: { x: number; y: number };
  draw: string;
  /** Boş olabilir: logo motifi her ikonda zorunlu değil. */
  waves: string[];
  origin?: { x: number; y: number };
  dot?: number;
}

/**
 * Çizim hızı. Her parça ayrı yol olarak aynı anda çizilir; `pathLength` 1'den küçük
 * olduğu için parça, çizgi deseni (work-areas.css) %77'ye geldiğinde tamamlanır.
 * Bu, eski iklim ikonunun hızıdır: bulutu çizginin %77'siydi ve çizim onunla bitiyordu
 * (kartta ~0,4 sn, alan sayfasında ~1 sn). Böylece bütün ikonlar aynı hızda çizilir.
 */
const DRAW_PATH_LENGTH = 0.77;

const ICONS: Record<WorkAreaIconName, IconShape> = {
  // Farklı boyda üç kule (alçak, antenli yüksek, orta), düz çatı, kat kat cam cephe;
  // iki yanda sarsıntı yayları — sallanır ama ayakta kalır (İş Dünyası ve Kurumsal Dayanıklılık).
  // Okuldan ayrılsın diye simetrik değil, üçgen çatı ya da bayrak yok.
  skyscraper: {
    center: { x: 47, y: 45 },
    draw: 'M10 86 H86 M18 86 V54 H34 M34 86 V14 H56 V86 M45 14 V4 M56 34 H76 V86 M39 24 H51 M39 34 H51 M39 44 H51 M39 54 H51 M39 64 H51 M39 74 H51 M61 44 H71 M61 54 H71 M61 64 H71 M61 74 H71 M23 64 H29 M23 74 H29',
    waves: [
      'M12.57 56.06 A38 38 0 0 1 12.57 23.94 M81.43 23.94 A38 38 0 0 1 81.43 56.06',
      'M6.23 59.02 A45 45 0 0 1 6.23 20.98 M87.77 20.98 A45 45 0 0 1 87.77 59.02',
    ],
    origin: { x: 47, y: 40 },
  },
  // Okul: üçgen çatılı orta bina, tepesinde bayrak, düz çatılı iki kanat; sol üstte
  // güneş, ışınları güneşten dışa doğru çıkar (Okul Güvenliği ve Afet Eğitimi)
  school: {
    center: { x: 45.75, y: 43.25 },
    draw: 'M4 86 H92 M6 54 H29 M9 54 V86 M67 54 H90 M87 54 V86 M25 50 L48 30 L71 50 M29 46.5 V86 M67 46.5 V86 M48 30 V8 M48 9.5 H62 V20 H48 M36 57 h8 v8 h-8 Z M52 57 h8 v8 h-8 Z M43 86 V72 H53 V86 M16 63 V77 M22 63 V77 M74 63 V77 M80 63 V77',
    waves: [
      'M27 17 L32.5 17 M16 28 L16 33.5 M5 17 L-0.5 17 M16 6 L16 0.5',
      'M23.78 24.78 L27.67 28.67 M8.22 24.78 L4.33 28.67 M8.22 9.22 L4.33 5.33 M23.78 9.22 L27.67 5.33',
    ],
    origin: { x: 16, y: 17 },
    dot: 6.5,
  },
  // Fırtına bulutu: şimşek ve yağmur; arkasından yayılan ısı yayları (İklim ve Afet Riskleri)
  climate: {
    center: { x: 54, y: 42.65 },
    draw: 'M28 60 A15 15 0 0 1 26 30.5 A21 21 0 0 1 66 26 A17.2 17.2 0 0 1 70 60 Z M54 66 L45 76 H54 L47 86 M34 68 L30 78 M68 68 L64 78',
    waves: ['M73.9 4.4 A23 23 0 0 1 88.2 20', 'M76.1 -1.7 A29.5 29.5 0 0 1 94.5 18.4'],
    origin: { x: 66, y: 26 },
  },
  // Mahalle; evleri koruyan hale (Yerel ve Toplumsal Dayanıklılık)
  community: {
    center: { x: 48, y: 57.6 },
    draw: 'M8 82 H88 M14 82 V66 L24 58 L34 66 M34 82 V58 L48 46 L62 58 V82 M62 66 L72 58 L82 66 V82 M44 82 V72 H52 V82',
    waves: ['M8.4 68 A42 42 0 0 1 87.6 68', 'M1.1 68 A49 49 0 0 1 94.9 68'],
    origin: { x: 48, y: 82 },
  },
  // Belge + büyüteç; cam halkalar (Araştırma, Politika ve Savunuculuk)
  research: {
    center: { x: 51, y: 49 },
    draw: 'M18 12 H52 L64 24 V84 H18 Z M52 12 V24 H64 M26 34 H48 M26 44 H52 M26 54 H38 M47 62 A13 13 0 1 0 73 62 A13 13 0 1 0 47 62 M69.5 71.5 L84 86',
    waves: ['M60 55 A7 7 0 0 0 60 69'],
    origin: { x: 60, y: 62 },
    dot: 4,
  },
  // Kalkan; iki yanında, üst yarısına yakın kısa yaylar (Acil Durum Hazırlığı ve İyileşme)
  shield: {
    center: { x: 52, y: 48.5 },
    draw: 'M52 14 L78 23 V45 C78 63 67 75 52 83 C37 75 26 63 26 45 V23 Z M52 36 V60 M40 48 H64',
    waves: [
      'M19.78 62.14 A38 38 0 0 1 19.78 21.86 M84.22 21.86 A38 38 0 0 1 84.22 62.14',
      'M13.84 65.85 A45 45 0 0 1 13.84 18.15 M90.16 18.15 A45 45 0 0 1 90.16 65.85',
    ],
    origin: { x: 52, y: 42 },
  },
};

interface WorkAreaIconProps {
  name: WorkAreaIconName;
  autoPlay?: boolean;
  className?: string;
}

export function WorkAreaIcon({ name, autoPlay = false, className }: WorkAreaIconProps) {
  const icon = ICONS[name];

  // Görüş kutusu çizimin merkezine göre kaydırılır (bkz. IconShape.center).
  const minX = icon.center.x - 48;
  const minY = icon.center.y - 48;
  // Dalgaların büyüme merkezi. transform-box: view-box'ta referans kutusu viewBox'un
  // koordinat sisteminin (0,0) noktasındadır — kaydırılmış viewBox'un köşesinde değil.
  const origin = icon.origin ?? icon.center;

  return (
    <svg
      viewBox={`${minX} ${minY} 96 96`}
      fill="none"
      aria-hidden
      className={cn('area-icon', autoPlay && 'area-icon--auto', className)}
      style={{ ['--ox' as string]: `${origin.x}px`, ['--oy' as string]: `${origin.y}px` }}
    >
      {/* Her parça (M ile başlayan) ayrı yol: hepsi aynı anda başlar ve birlikte biter (bkz. DRAW_PATH_LENGTH).
          Tek yolda kısa parçalar çok hızlı biter, çok parçalı ikonlar bir anda çizilmiş görünür. */}
      {icon.draw.split(/(?=M)/).map((d, i) => (
        <path
          key={i}
          className="area-icon__draw"
          d={d.trim()}
          pathLength={DRAW_PATH_LENGTH}
          stroke="currentColor"
          strokeWidth={4.5}
        />
      ))}
      {icon.waves.map((d, i) => (
        <path
          key={d}
          className="area-icon__wave"
          d={d}
          stroke="currentColor"
          strokeWidth={2.5}
          style={{ ['--i' as string]: i }}
        />
      ))}
      {icon.dot !== undefined && (
        <>
          {/* Logodaki şok halkası — yalnızca animasyonda görünür */}
          {/* Halka 6 katına büyür; çizgi de büyüdüğü için ince başlar (0.5 → ~3 birim). */}
          <circle className="area-icon__ripple" cx={origin.x} cy={origin.y} r={4} stroke="currentColor" strokeWidth={0.5} />
          <circle className="area-icon__dot" cx={origin.x} cy={origin.y} r={icon.dot} fill="currentColor" />
        </>
      )}
    </svg>
  );
}
