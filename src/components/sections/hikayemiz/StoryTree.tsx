'use client';

import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/cn';
import type { Localized, Milestone } from '@/types/content';

interface StoryTreeProps {
  milestones: Localized<Milestone>[];
  /** Fotoğrafı gelmemiş maddelerdeki boş kutunun yazısı */
  photoSoon: string;
}

/** Gövde, ekranın bu oranındaki hizaya kadar dolar. */
const FILL_LINE = 0.6;

/** Düğüm: logodaki nokta ve halkalar — ağacın yaş halkaları gibi. */
function Node() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="story-node__mark size-full overflow-visible">
      <circle className="story-node__ripple" cx="24" cy="24" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="23" className="fill-primary" />
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="7" fill="currentColor" />
    </svg>
  );
}

/**
 * Hikâyemiz zaman çizelgesi — ortada gövde, dönüm noktaları sırayla soldan
 * ve sağdan dal gibi çıkar (telefonda gövde solda, hepsi sağda). Hareketler
 * `story.css`'te; bu bileşen yalnızca "göründü" işaretini ve gövdenin dolma
 * oranını yazar.
 */
export function StoryTree({ milestones, photoSoon }: StoryTreeProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // Madde ekrana girince bir kez işaretlenir.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-visible', '');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.12 },
    );
    list.querySelectorAll('.story-item').forEach((item) => observer.observe(item));

    // Gövde kaydırmayla dolar.
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const progress = (window.innerHeight * FILL_LINE - rect.top) / rect.height;
      list.style.setProperty('--story-progress', String(Math.min(1, Math.max(0, progress))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={listRef} className="relative">
      {/* Gövde: soluk çizgi + kaydırdıkça dolan turkuaz çizgi */}
      <span aria-hidden className="absolute top-0 bottom-0 left-[11px] w-[3px] rounded-full bg-white/15 lg:left-1/2 lg:-translate-x-1/2">
        <span className="story-trunk__fill absolute inset-0 rounded-full bg-brand" />
      </span>

      <ol>

      {milestones.map((item, i) => {
        const left = i % 2 === 0;
        return (
          <li
            key={`${item.year}-${item.title}`}
            data-side={left ? 'left' : 'right'}
            className={cn(
              'story-item relative pb-16 pl-12 last:pb-4 lg:w-1/2 lg:pb-0 lg:pl-0',
              left ? 'lg:pr-24' : 'lg:ml-auto lg:pl-24',
              // Dallar birbirinin boşluğuna girer: sağdaki, soldakinin ortasından başlar.
              i > 0 && 'lg:-mt-40',
            )}
          >
            {/* Düğüm — gövdenin üstünde */}
            <span
              className={cn(
                'absolute top-3 left-0 size-[26px] text-brand lg:top-8 lg:size-12',
                left ? 'lg:right-0 lg:left-auto lg:translate-x-1/2' : 'lg:left-0 lg:-translate-x-1/2',
              )}
            >
              <Node />
            </span>

            {/* Dal — gövdeden içeriğe doğru kıvrılarak çıkar (yalnızca geniş ekranda) */}
            <svg
              viewBox="0 0 64 40"
              aria-hidden
              className={cn(
                'story-branch absolute top-[18px] hidden h-10 w-16 text-brand lg:block',
                left ? 'right-5 -scale-x-100' : 'left-5',
              )}
            >
              <path d="M0 38 C 26 38, 30 3, 64 3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength={1} />
            </svg>

            <article className={cn('story-body', left && 'lg:text-right')}>
              <p className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.9] font-semibold text-brand tabular-nums">
                {item.year}
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.15] font-semibold text-balance">
                {item.title}
              </h2>
              {item.text && <p className={cn('mt-4 max-w-[52ch] text-lg text-white/75', left && 'lg:ml-auto')}>{item.text}</p>}

              <div className={cn('relative mt-6 aspect-[3/2] max-w-xl overflow-hidden rounded-xl', left && 'lg:ml-auto')}>
                {item.photo ? (
                  <Image
                    src={item.photo}
                    alt={item.photoAlt ?? item.title}
                    fill
                    sizes="(min-width: 1024px) 36rem, 85vw"
                    className="object-cover"
                  />
                ) : (
                  // Fotoğraf gelene kadar yeri boş durur.
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/25 bg-white/5 text-sm text-white/60">
                    <ImageIcon aria-hidden className="size-7" />
                    {photoSoon}
                  </div>
                )}
              </div>
            </article>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
