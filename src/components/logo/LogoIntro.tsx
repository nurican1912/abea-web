'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { INTRO } from '@/config/intro';

import { AbeaLogo } from './AbeaLogo';
import { playIntro } from './logo-animation';

/**
 * Site açılış animasyonu. Katman her zaman sunucudan gelir ama yalnızca
 * önyükleme betiği <html>'e `intro-pending` eklediyse görünür (bkz. IntroBootScript).
 * Sembol, `data-intro-target` işaretli topbar logosuna uçar.
 */
export function LogoIntro() {
  const t = useTranslations('Intro');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const overlay = overlayRef.current;
    if (!overlay || !root.classList.contains(INTRO.pendingClass)) return;

    root.setAttribute(INTRO.startedAttr, '');
    const intro = playIntro({
      overlay,
      target: document.querySelector('[data-intro-target]'),
      onFinish: () => root.classList.remove(INTRO.pendingClass),
    });

    return () => intro.cancel();
  }, []);

  return (
    <div ref={overlayRef} className="logo-intro" aria-hidden="true">
      <div className="logo-intro__bg" data-intro-bg />
      <div className="logo-intro__stage logo-draw text-brand">
        <AbeaLogo variant="full" animated idPrefix="abea-intro" />
      </div>
      <p className="logo-intro__hint" data-intro-hint>
        {t('skipHint')}
      </p>
    </div>
  );
}
