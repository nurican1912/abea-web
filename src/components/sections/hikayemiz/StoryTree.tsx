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

/**
 * Hikâyemiz zaman çizelgesi — ortada gövde, yıl gövdenin üstünde; bir yanda
 * başlık, öbür yanda fotoğraf ve açıklamanın olduğu kutu. Yanlar sırayla
 * değişir (telefonda gövde solda, hepsi alt alta). Hareketler `story.css`'te;
 * bu bileşen yalnızca "göründü" işaretini ve gövdenin dolma oranını yazar.
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
      <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-[3px] rounded-full bg-white/15 lg:left-1/2 lg:-translate-x-1/2">
        <span className="story-trunk__fill absolute inset-0 rounded-full bg-brand" />
      </span>

      <ol className="flex flex-col gap-16 lg:gap-28">
        {milestones.map((item, i) => {
          const cardLeft = i % 2 === 0;
          return (
            <li
              key={`${item.year}-${item.title}`}
              data-side={cardLeft ? 'left' : 'right'}
              className="story-item relative pl-9 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-40 lg:pl-0"
            >
              {/* Telefonda yılın hizasında gövdenin üstündeki nokta */}
              <span
                aria-hidden
                className="story-dot absolute top-[0.7rem] left-0 size-[17px] rounded-full border-[3px] border-primary bg-brand lg:hidden"
              />

              {/* Yıl — geniş ekranda gövdenin tam ortasında */}
              <p className="lg:absolute lg:top-1/2 lg:left-1/2 lg:z-10 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <span className="story-year inline-flex rounded-full bg-brand px-5 py-1.5 font-display text-xl leading-tight font-semibold text-ink tabular-nums lg:px-7 lg:py-3 lg:text-3xl">
                  {item.year}
                </span>
              </p>

              <h2
                className={cn(
                  'story-title mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-semibold text-balance lg:row-start-1 lg:mt-0',
                  cardLeft ? 'lg:col-start-2' : 'lg:col-start-1 lg:ml-auto lg:text-right',
                )}
              >
                {item.title}
              </h2>

              {/* Kutu: üstte fotoğraf, altta açıklama */}
              <div
                className={cn(
                  'story-card mt-5 max-w-xl rounded-2xl bg-surface p-3 text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] sm:p-4 lg:row-start-1 lg:mt-0',
                  cardLeft ? 'lg:col-start-1 lg:ml-auto' : 'lg:col-start-2',
                )}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt={item.photoAlt ?? item.title}
                      fill
                      sizes="(min-width: 1024px) 36rem, 90vw"
                      className="story-photo object-cover"
                    />
                  ) : (
                    // Fotoğraf gelene kadar yeri boş durur.
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface-soft text-sm text-muted">
                      <ImageIcon aria-hidden className="size-7" />
                      {photoSoon}
                    </div>
                  )}
                </div>
                {item.text && <p className="px-2 pt-4 pb-2 text-ink/80 sm:px-3 sm:pt-5">{item.text}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
