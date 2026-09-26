import { LOGO } from './logo-geometry';

interface AbeaLogoProps {
  /** `full`: sembol + yazı · `mark`: yalnızca sembol */
  variant?: 'full' | 'mark';
  /**
   * Animasyon için hazırla: parçalara `data-part` verilir, çizgiler
   * `pathLength=1` ile normalize edilir (uzunluk ölçmeye gerek kalmaz),
   * şok halkası ve yazı perdeleri eklenir. Başlangıç (gizli) durumu
   * `logo.css` içindeki `.logo-draw` kuralları verir.
   */
  animated?: boolean;
  /** Sayfada birden fazla logo olabildiği için clipPath kimliklerine önek. */
  idPrefix: string;
  /** Erişilebilir ad; verilmezse logo dekoratif sayılır. */
  label?: string;
  className?: string;
}

/**
 * Logo SVG'si. Sunucuda da çizilebilir (hook yok); animasyonu
 * `logo-animation.ts` bu bileşenin ürettiği `data-part` işaretleri üzerinden sürer.
 * Renk `currentColor`'dan gelir — `text-brand` gibi bir sınıfla verilir.
 */
export function AbeaLogo({ variant = 'full', animated = false, idPrefix, label, className }: AbeaLogoProps) {
  const full = variant === 'full';
  const clipLeft = `${idPrefix}-l`;
  const clipRight = `${idPrefix}-r`;
  const part = (name: string) => (animated ? name : undefined);
  const pathLength = animated ? 1 : undefined;

  return (
    <svg
      viewBox={full ? LOGO.viewBoxFull : LOGO.viewBoxMark}
      fill="none"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        {/* Ayrım hattının iki yanını dikey kesen maskeler (butt uç eğik keserdi). */}
        <clipPath id={clipLeft}>
          <rect x="0" y="0" width={LOGO.splitX} height={LOGO.height} />
        </clipPath>
        <clipPath id={clipRight}>
          <rect x={LOGO.splitX} y="0" width={LOGO.width - LOGO.splitX} height={LOGO.height} />
        </clipPath>
        {full &&
          animated &&
          LOGO.wordmark.lines.map((line, i) => (
            <clipPath key={line.text} id={`${idPrefix}-w${i}`}>
              <rect
                data-part="word-clip"
                x={LOGO.wordmark.x - 2}
                y={line.y - line.size}
                width={LOGO.wordmark.width + 6}
                height={line.size * 1.45}
              />
            </clipPath>
          ))}
      </defs>

      {/* Merkezden yayılan şok halkası — yalnızca animasyonda görünür */}
      {animated && (
        <circle
          data-part="ripple"
          cx={LOGO.center.x}
          cy={LOGO.center.y}
          r={LOGO.dotR}
          stroke="currentColor"
          strokeWidth={3}
        />
      )}

      <g clipPath={`url(#${clipLeft})`} stroke="currentColor" strokeWidth={LOGO.thinWidth}>
        {LOGO.ribbons.map((ribbon) => (
          <path key={ribbon.thin} d={ribbon.thin} data-part={part('thin')} pathLength={pathLength} />
        ))}
      </g>
      <g clipPath={`url(#${clipRight})`} stroke="currentColor" strokeWidth={LOGO.thickWidth}>
        {LOGO.ribbons.map((ribbon) => (
          <path key={ribbon.thick} d={ribbon.thick} data-part={part('thick')} pathLength={pathLength} />
        ))}
      </g>

      {/* Episantr — kırpma dışında, iki yarıyı birleştirir */}
      <circle data-part={part('dot')} cx={LOGO.center.x} cy={LOGO.center.y} r={LOGO.dotR} fill="currentColor" />

      {full && (
        <g data-part={part('wordmark')} fill="currentColor" className="font-display" fontWeight={600}>
          {LOGO.wordmark.lines.map((line, i) => (
            <text
              key={line.text}
              data-part={part('word')}
              x={LOGO.wordmark.x}
              y={line.y}
              fontSize={line.size}
              clipPath={animated ? `url(#${idPrefix}-w${i})` : undefined}
            >
              {line.text}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
}
