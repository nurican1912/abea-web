'use client';

import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from 'react';

import { INTRO } from '@/config/intro';
import { cn } from '@/lib/cn';
import type { LogoPart } from '@/types/content';

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

interface LogoReplayProps {
  label: string;
  /** Okunan bölümün anlattığı parça öne çıkar, diğerleri soluklaşır (bkz. logo.css → .logo-focus). */
  focus?: LogoPart;
  /** Logonun genişliği / yüksekliği */
  logoClassName?: string;
  className?: string;
}

/** Logomuzun Hikâyesi sayfası: animasyonu yerinde (uçmadan) oynatır, tekrar oynatılabilir. */
export function LogoReplay({ label, focus = 'all', logoClassName = 'w-[min(560px,82vw)]', className }: LogoReplayProps) {
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
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div ref={wrapRef} data-focus={focus} className={cn('logo-draw logo-focus text-brand', logoClassName)}>
        <AbeaLogo variant="full" animated idPrefix="abea-replay" label={label} className="h-auto w-full overflow-visible" />
      </div>
      {/* Yalnızca simge: yuvarlak, ince çerçeveli; üzerine gelince turkuaz çerçeve ve ok geriye döner. */}
      <button
        type="button"
        onClick={() => void play()}
        aria-label={t('replay')}
        title={t('replay')}
        className="group inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-primary transition-colors hover:border-brand"
      >
        <RotateCcw
          aria-hidden
          className="size-[1.125rem] transition-transform duration-500 ease-out group-hover:-rotate-180 group-active:-rotate-[360deg] motion-reduce:transition-none"
        />
      </button>
    </div>
  );
}
