/**
 * ABEA logo animasyonu — çerçeveden bağımsız (düz DOM + Web Animations API).
 *
 * Hikâye: merkezde episantr belirir → dalga halkası yayılır → ince yaylar
 * soldan aşağı kıvrılır → ayrım hattında kalınlaşıp yukarı çubuklara dönüşür →
 * yanında kelime markası açılır.
 *
 * Çizim tekniği: çizgiler `pathLength=1` ile normalize edilmiştir;
 * `stroke-dashoffset` 1 → 0 animasyonu çizgiyi "çiziliyormuş" gibi gösterir.
 * Başlangıç (gizli) durumu CSS'te (`logo.css` → `.logo-draw`) verildiği için
 * sayfa ilk karede logonun tam hâlini hiç göstermez.
 *
 * Kritik: tüm animasyonlar `fill: 'both'` kullanır. `'forwards'` yetmez —
 * gecikmeli başlayan parçalar gecikme boyunca görünür kalırdı.
 */
import { LOGO } from './logo-geometry';

const EASE_DRAW = 'cubic-bezier(.33, 0, .12, 1)';
const EASE_POP = 'cubic-bezier(.2, .9, .25, 1.25)';
const EASE_SOFT = 'cubic-bezier(.4, 0, .2, 1)';
const EASE_FLY = 'cubic-bezier(.65, 0, .2, 1)';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const settle = (animations: Animation[]) => Promise.allSettled(animations.map((a) => a.finished));

function getParts(svg: SVGSVGElement) {
  const all = <T extends Element>(name: string) => Array.from(svg.querySelectorAll<T>(`[data-part="${name}"]`));

  return {
    dot: all<SVGCircleElement>('dot')[0],
    ripple: all<SVGCircleElement>('ripple')[0],
    thin: all<SVGPathElement>('thin'),
    thick: all<SVGPathElement>('thick'),
    wordmark: all<SVGGElement>('wordmark')[0],
    words: all<SVGTextElement>('word'),
    wordClips: all<SVGRectElement>('word-clip'),
  };
}

/**
 * Yazı tipi yüklendikten sonra kelime markasının her satırını tam 192 birime
 * oturtur. Harfleri yatay ezmek yerine punto ölçeklenir — deformasyon olmaz.
 */
export async function fitWordmark(svg: SVGSVGElement): Promise<void> {
  const { words } = getParts(svg);
  if (words.length === 0) return;

  try {
    const family = getComputedStyle(words[0]).fontFamily;
    await document.fonts.load(`600 100px ${family}`);
  } catch {
    // Yazı tipi gelmezse yedek yazı tipiyle ölçülür; logo yine düzgün görünür.
  }

  words.forEach((text, i) => {
    const line = LOGO.wordmark.lines[i];
    text.setAttribute('font-size', String(line.size));
    const natural = text.getComputedTextLength();
    if (!natural) return;
    text.setAttribute('font-size', ((line.size * LOGO.wordmark.width) / natural).toFixed(2));
  });
}

/**
 * Logoyu baştan çizer. `AbeaLogo animated` ile üretilmiş bir SVG bekler.
 * `speed: Infinity` → anında son hâl (hareket azaltma tercihi için).
 */
export function drawLogo(svg: SVGSVGElement, { speed = 1 } = {}): Animation[] {
  const s = (ms: number) => Math.round(ms / speed);
  const parts = getParts(svg);
  const animations: Animation[] = [];

  const drawPath = (path: SVGPathElement, delay: number, duration: number, easing: string) =>
    path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { delay, duration, easing, fill: 'both' });

  // 1) Episantr
  if (parts.dot) {
    animations.push(
      parts.dot.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
        duration: s(440),
        easing: EASE_POP,
        fill: 'both',
      }),
    );
  }

  // 2) Yayılan dalga
  if (parts.ripple) {
    animations.push(
      parts.ripple.animate(
        [
          { transform: 'scale(1)', opacity: 0.55 },
          { transform: 'scale(6.4)', opacity: 0 },
        ],
        { delay: s(120), duration: s(1000), easing: EASE_SOFT, fill: 'both' },
      ),
    );
  }

  // 3) İnce yaylar → 4) kalınlaşıp yukarı çıkan çubuklar
  parts.thin.forEach((path, i) => animations.push(drawPath(path, s(220 + i * 80), s(700), EASE_DRAW)));
  parts.thick.forEach((path, i) => animations.push(drawPath(path, s(760 + i * 80), s(760), EASE_SOFT)));

  // 5) Kelime markası — soldan sağa açılan perde
  parts.wordClips.forEach((rect, i) => {
    animations.push(
      rect.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
        delay: s(1150 + i * 110),
        duration: s(620),
        easing: EASE_SOFT,
        fill: 'both',
      }),
    );
  });
  parts.words.forEach((text, i) => {
    animations.push(
      text.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: s(1150 + i * 110),
        duration: s(300),
        easing: 'linear',
        fill: 'both',
      }),
    );
  });

  return animations;
}

/**
 * FLIP: ortadaki büyük logoyu `target`'ın tam üstüne taşıyıp ölçekler. Hedef,
 * aynı logoyu (sembol + yazı) çizen topbar logosudur; iniş anında ikisi piksel
 * piksel üst üste gelir, bu yüzden katman kaldırıldığında sıçrama olmaz.
 */
function flyLogoTo(svg: SVGSVGElement, target: Element, duration: number): Animation | null {
  const from = svg.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (!from.width || !to.width) return null;

  const scale = to.width / from.width;
  const dx = to.left - from.left;
  const dy = to.top - from.top;

  svg.style.transformOrigin = '0 0';
  return svg.animate(
    [{ transform: 'translate(0px, 0px) scale(1)' }, { transform: `translate(${dx}px, ${dy}px) scale(${scale})` }],
    { duration, easing: EASE_FLY, fill: 'forwards' },
  );
}

interface IntroOptions {
  /** Tam ekran katman: içinde `svg`, `[data-intro-bg]` ve `[data-intro-hint]` bulunur. */
  overlay: HTMLElement;
  /** Logonun ineceği yer (topbar logosu). Yoksa katman söner. */
  target: Element | null;
  speed?: number;
  /** Animasyon bittiğinde ya da atlandığında bir kez çağrılır. */
  onFinish: () => void;
}

/**
 * Açılış animasyonu: çizim → logo (sembol + yazı) topbar'daki yerine uçar
 * ve bu sırada zemin açılıp sayfa görünür. Tıklama / dokunma / herhangi bir
 * tuş animasyonu atlar.
 *
 * @returns `cancel()` — bileşen sökülürken her şeyi başlangıç durumuna döndürür.
 */
export function playIntro({ overlay, target, speed = 1, onFinish }: IntroOptions) {
  const s = (ms: number) => Math.round(ms / speed);
  const svg = overlay.querySelector('svg');
  const bg = overlay.querySelector<HTMLElement>('[data-intro-bg]');
  const hint = overlay.querySelector<HTMLElement>('[data-intro-hint]');

  const running = new Set<Animation>();
  const track = (animation: Animation) => {
    running.add(animation);
    return animation;
  };

  let stopped = false;

  const detach = () => {
    window.removeEventListener('pointerdown', skip);
    window.removeEventListener('keydown', skip);
  };

  const end = () => {
    detach();
    onFinish();
  };

  const fadeOverlay = (duration: number) =>
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: EASE_SOFT, fill: 'forwards' }).finished;

  function skip() {
    if (stopped) return;
    stopped = true;
    running.forEach((animation) => animation.pause()); // olduğu yerde dondur, geri sıçramasın
    fadeOverlay(220).catch(() => {}).finally(end);
  }

  async function run() {
    if (!svg) return end();

    await fitWordmark(svg);
    if (stopped) return;

    await settle(drawLogo(svg, { speed }).map(track));
    if (stopped) return;

    await wait(s(260));
    if (stopped) return;

    // "Geçmek için dokunun" ipucu söner.
    if (hint) {
      track(hint.animate([{ opacity: 1 }, { opacity: 0 }], { duration: s(240), easing: EASE_SOFT, fill: 'forwards' }));
    }

    // Logo yerine uçar; zemin aynı anda açılır ve sayfa belirir.
    const flight = target ? flyLogoTo(svg, target, s(900)) : null;
    if (!flight) {
      await fadeOverlay(s(400)).catch(() => {});
      return end();
    }
    track(flight);
    const reveal = bg
      ? track(bg.animate([{ opacity: 1 }, { opacity: 0 }], { delay: s(150), duration: s(750), easing: EASE_SOFT, fill: 'forwards' }))
      : null;

    await settle(reveal ? [flight, reveal] : [flight]);
    if (stopped) return;

    stopped = true;
    end();
  }

  window.addEventListener('pointerdown', skip);
  window.addEventListener('keydown', skip);
  void run();

  return {
    cancel() {
      stopped = true;
      detach();
      running.forEach((animation) => animation.cancel());
      overlay.getAnimations().forEach((animation) => animation.cancel());
    },
  };
}
