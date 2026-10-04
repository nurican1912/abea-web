'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

export interface BylawsTocItem {
  id: string;
  label: string;
  title: string;
}

/** Bir madde, üst kenarı topbar'ın biraz altına geldiğinde "okunan madde" sayılır (bağlantıyla atlanınca da). */
const ACTIVE_OFFSET = 160;

function useActiveArticle(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

function TocList({ items, active, onNavigate }: { items: BylawsTocItem[]; active: string; onNavigate?: () => void }) {
  return (
    <ol className="space-y-px">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            data-toc={item.id}
            aria-current={item.id === active ? 'location' : undefined}
            className={cn(
              'block border-l-[3px] py-2 pr-2 pl-3 text-[0.9375rem] leading-snug transition-colors hover:bg-surface',
              item.id === active ? 'border-l-brand bg-surface font-semibold' : 'border-l-transparent text-ink/75',
            )}
          >
            <span className="block text-xs font-semibold tracking-wide text-primary uppercase">{item.label}</span>
            {item.title && <span className="line-clamp-2">{item.title}</span>}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Tüzüğün madde listesi. Geniş ekranda solda sabit durur ve okunan maddeyi
 * işaretler; dar ekranda metnin üstünde açılır-kapanır bir liste olur.
 */
export function BylawsToc({ items }: { items: BylawsTocItem[] }) {
  const t = useTranslations('Bylaws');
  const [ids] = useState(() => items.map((item) => item.id));
  const active = useActiveArticle(ids);
  const asideRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Okunan madde listenin görünen kısmının dışına çıktıysa listeyi (sayfayı değil) kaydır.
  useEffect(() => {
    const aside = asideRef.current;
    const link = aside?.querySelector<HTMLElement>(`[data-toc="${active}"]`);
    if (!aside || !link) return;
    const top = link.offsetTop - aside.offsetTop;
    if (top < aside.scrollTop || top + link.offsetHeight > aside.scrollTop + aside.clientHeight) {
      aside.scrollTop = top - aside.clientHeight / 3;
    }
  }, [active]);

  return (
    <>
      <details ref={detailsRef} className="group rounded-xl border border-line bg-surface lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 font-semibold [&::-webkit-details-marker]:hidden">
          {t('toc', { count: items.length })}
          <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <nav aria-label={t('tocLabel')} className="max-h-[60vh] overflow-y-auto border-t border-line py-2">
          <TocList items={items} active={active} onNavigate={() => detailsRef.current?.removeAttribute('open')} />
        </nav>
      </details>

      <nav aria-label={t('tocLabel')} className="hidden lg:block">
        <div
          ref={asideRef}
          className="sticky top-28 max-h-[calc(100vh-8.5rem)] overflow-y-auto overscroll-contain pr-2"
        >
          <p className="mb-3 pl-3 font-display text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            {t('tocTitle')}
          </p>
          <TocList items={items} active={active} />
        </div>
      </nav>
    </>
  );
}
