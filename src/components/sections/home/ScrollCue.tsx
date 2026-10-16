'use client';

import { cn } from '@/lib/cn';
import { useScrolled } from '@/lib/use-scrolled';

interface ScrollCueProps {
  href: string;
  label: string;
}

/**
 * Hero'nun altındaki "devamı var" işareti: çerçevesiz çift ok, alttaki soluk.
 * Sekerek dikkat çeker (hareket azaltma tercihinde durur); sayfa aşağı
 * kaydırılınca kaybolur, en üste dönünce geri gelir.
 */
export function ScrollCue({ href, label }: ScrollCueProps) {
  const hidden = useScrolled(40);

  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'absolute bottom-3 left-1/2 flex h-14 w-12 -translate-x-1/2 items-center justify-center text-primary/70 transition-[color,opacity,visibility] duration-500 hover:text-primary',
        hidden && 'invisible opacity-0',
      )}
    >
      <svg
        viewBox="0 0 24 32"
        aria-hidden
        className="h-10 w-8 motion-safe:animate-cue"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6l8 8 8-8" />
        <path d="M4 16l8 8 8-8" opacity="0.5" />
      </svg>
    </a>
  );
}
