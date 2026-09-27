import type { WorkAreaIconName } from '@/types/content';

/**
 * Çalışma alanı ikonları — logonun çizgi dilinde, 96×96 ızgara.
 *
 *   draw  : kalın çizgi — nesnenin kendisi (gökdelen, okul, kalkan…)
 *   waves : ince çizgi — logodaki dalga yayları; `origin`den dışa doğru yayılır
 *   origin: dalgaların merkezi (episantr)
 *   dot   : episantr noktası gösterilsin mi (nokta yoksa dalgalar yine origin'den yayılır)
 *
 * Kart üzerine gelindiğinde `work-areas.css`: nesne logo gibi baştan çizilir,
 * nokta belirir ve şok halkası yayılır, dalgalar sırayla büyüyerek gelir.
 */

interface IconShape {
  /**
   * Çizimin (dalgalar dahil) sınır kutusunun merkezi — tarayıcıda getBBox ile ölçüldü.
   * Görüş kutusu buna göre kaydırılır; böylece her ikon kendi kutusunda tam ortalanır
   * ve kartlarda aynı hizada durur. Çizim değişirse yeniden ölçülmeli.
   */
  center: { x: number; y: number };
  draw: string;
  /** Boş olabilir: logo motifi her ikonda zorunlu değil (01–03'te yok). */
  waves: string[];
  origin?: { x: number; y: number };
  dot?: boolean;
}

const ICONS: Record<WorkAreaIconName, IconShape> = {
  // Mahalle; evleri koruyan hale (Afet Risk Azaltma Farkındalık)
  community: {
    center: { x: 48, y: 57.6 },
    draw: 'M8 82 H88 M14 82 V66 L24 58 L34 66 M34 82 V58 L48 46 L62 58 V82 M62 66 L72 58 L82 66 V82 M44 82 V72 H52 V82',
    waves: ['M8.4 68 A42 42 0 0 1 87.6 68', 'M1.1 68 A49 49 0 0 1 94.9 68'],
    origin: { x: 48, y: 82 },
  },
  // Gökdelen silueti: antenli, cam cepheli kule + alçak binalar (İş Dünyası)
  skyscraper: {
    center: { x: 48, y: 45.5 },
    draw: 'M8 86 H88 M14 86 V48 H36 M36 86 V24 L48 14 L60 24 V86 M48 14 V5 M60 86 V38 H82 V86 M43 30 V80 M53 30 V80 M20 58 h9 M20 70 h9 M67 48 h9 M67 60 h9 M67 72 h9',
    waves: [],
  },
  // Okul: alınlıklı giriş, saat, bayrak, simetrik pencereler (Okul Öncesi)
  school: {
    center: { x: 48, y: 48 },
    draw: 'M6 84 H90 M12 84 V44 H34 M62 44 H84 V84 M34 44 L48 30 L62 44 M48 30 V12 H61 L57 16 L61 20 H48 M44 39 A4 4 0 1 0 52 39 A4 4 0 1 0 44 39 M17 52 h13 v14 h-13 Z M23.5 52 v14 M66 52 h13 v14 h-13 Z M72.5 52 v14 M41 84 V62 H55 V84 M48 62 V84',
    waves: [],
  },
  // Kalpli evrak çantası: kurum + gönüllülük (Kurumsal Afet Gönüllülüğü)
  volunteering: {
    center: { x: 48, y: 52.5 },
    draw: 'M12 34 H84 V80 H12 Z M36 34 V25 H60 V34 M48 70 C35 62 32 53 38 48 C43 44 48 48 48 52 C48 48 53 44 58 48 C64 53 61 62 48 70 Z',
    waves: [],
  },
  // Belge + büyüteç; cam halkalar (Araştırma, Politika ve Savunuculuk)
  research: {
    center: { x: 51, y: 49 },
    draw: 'M18 12 H52 L64 24 V84 H18 Z M52 12 V24 H64 M26 34 H48 M26 44 H52 M26 54 H38 M47 62 A13 13 0 1 0 73 62 A13 13 0 1 0 47 62 M69.5 71.5 L84 86',
    waves: ['M60 55 A7 7 0 0 0 60 69'],
    origin: { x: 60, y: 62 },
    dot: true,
  },
  // Kalkan; dalgalar kalkana çarpar (Acil Durum Hazırlığı ve İyileşme)
  shield: {
    center: { x: 42.5, y: 48.5 },
    draw: 'M52 14 L78 23 V45 C78 63 67 75 52 83 C37 75 26 63 26 45 V23 Z M52 36 V60 M40 48 H64',
    waves: ['M22.9 23.6 A38 38 0 0 0 22.9 72.4', 'M17.5 19.1 A45 45 0 0 0 17.5 76.9'],
    origin: { x: 52, y: 48 },
  },
};

export function WorkAreaIcon({ name, className }: { name: WorkAreaIconName; className?: string }) {
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
      className={`area-icon ${className ?? ''}`}
      style={{ ['--ox' as string]: `${origin.x}px`, ['--oy' as string]: `${origin.y}px` }}
    >
      <path className="area-icon__draw" d={icon.draw} pathLength={1} stroke="currentColor" strokeWidth={4.5} />
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
      {icon.dot && (
        <>
          {/* Logodaki şok halkası — yalnızca animasyonda görünür */}
          {/* Halka 6 katına büyür; çizgi de büyüdüğü için ince başlar (0.5 → ~3 birim). */}
          <circle className="area-icon__ripple" cx={origin.x} cy={origin.y} r={4} stroke="currentColor" strokeWidth={0.5} />
          <circle className="area-icon__dot" cx={origin.x} cy={origin.y} r={4} fill="currentColor" />
        </>
      )}
    </svg>
  );
}
