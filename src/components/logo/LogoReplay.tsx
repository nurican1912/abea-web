'use client';

import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from 'react';

import { INTRO } from '@/config/intro';

import { AbeaLogo } from './AbeaLogo';
import { drawLogo, fitWordmark } from './logo-animation';

/** Açılış animasyonu sürüyorsa bitmesini bekler — iki logo aynı anda çizilmesin. */
function whenIntroDone(): Promise<void> {
  const root = document.documentElement;
  if (!root.classList.contains(INTRO.pendingClass)) return Promise.resolve();

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (root.classList.contains(INTRO.pendingClass)) return;
      observer.disconnect();
      resolve();
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  });
}

/** Logomuzun Hikâyesi sayfası: animasyonu yerinde (uçmadan) oynatır, tekrar oynatılabilir. */
export function LogoReplay({ label }: { label: string }) {
  const t = useTranslations('LogoStory');
  const wrapRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const runRef = useRef(0);

  const stop = useCallback(() => {
    runRef.current += 1; // bekleyen eski oynatmaları geçersiz kılar
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];
  }, []);

  const play = useCallback(async () => {
    stop();
    const run = runRef.current;
    const svg = wrapRef.current?.querySelector('svg');
    if (!svg) return;

    await whenIntroDone();
    await fitWordmark(svg);
    if (run !== runRef.current) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    animationsRef.current = drawLogo(svg, { speed: reduceMotion ? Infinity : 1 });
  }, [stop]);

  useEffect(() => {
    void play();
    return stop;
  }, [play, stop]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={wrapRef} className="logo-draw w-[min(560px,82vw)] text-brand">
        <AbeaLogo variant="full" animated idPrefix="abea-replay" label={label} className="h-auto w-full overflow-visible" />
      </div>
      <button
        type="button"
        onClick={() => void play()}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-brand-deep transition-colors hover:border-brand hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
      >
        <RotateCcw aria-hidden className="size-4" />
        {t('replay')}
      </button>
    </div>
  );
}
