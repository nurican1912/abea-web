'use client';

import { ArrowUpRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

import { cn } from '@/lib/cn';
import type { Localized, TeamMember } from '@/types/content';

import { MemberPhoto } from './MemberPhoto';

interface TeamAccordionProps {
  members: Localized<TeamMember>[];
}

/*
 * Satırdaki kişi sayısı — aşağıdaki `grid-cols-*` sınıflarıyla AYNI kırılımlar.
 * Panel, tıklanan kişinin satırının sonuna yerleşsin diye bilinmesi gerekir.
 */
const COLUMN_QUERIES: [query: string, columns: number][] = [
  ['(min-width: 64rem)', 5], // lg
  ['(min-width: 40rem)', 3], // sm
];
const DEFAULT_COLUMNS = 2;

function useColumns() {
  return useSyncExternalStore(
    (onChange) => {
      const lists = COLUMN_QUERIES.map(([query]) => window.matchMedia(query));
      lists.forEach((list) => list.addEventListener('change', onChange));
      return () => lists.forEach((list) => list.removeEventListener('change', onChange));
    },
    () => COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches)?.[1] ?? DEFAULT_COLUMNS,
    () => DEFAULT_COLUMNS,
  );
}

/**
 * Tasarım 1 — yuvarlak portreler; ad ve görev her zaman görünür. Portreye
 * tıklayınca o satırın altında, satır genişliğinde bir bilgi paneli açılır
 * (Ogilvy'deki gibi). Tek seferde bir panel açık kalır; Esc kapatır.
 */
export function TeamAccordion({ members }: TeamAccordionProps) {
  const t = useTranslations('Team');
  const uid = useId();
  const columns = useColumns();
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const triggerId = (id: string) => `${uid}-trigger-${id}`;
  const panelId = (id: string) => `${uid}-panel-${id}`;

  const close = () => {
    if (!openId) return;
    document.getElementById(triggerId(openId))?.focus();
    setOpenId(null);
  };

  // Panel açılınca odak panele geçer (ekran okuyucu içeriği okusun); Esc kapatır.
  useEffect(() => {
    if (!openId) return;
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      document.getElementById(triggerId(openId))?.focus();
      setOpenId(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // triggerId yalnızca uid'ye bağlı; openId değişince yeniden kurulur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const rows = Array.from({ length: Math.ceil(members.length / columns) }, (_, i) =>
    members.slice(i * columns, i * columns + columns),
  );

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
      {rows.map((row, rowIndex) => {
        const openIndex = row.findIndex((member) => member.id === openId);
        const open = openIndex >= 0 ? row[openIndex] : null;

        return (
          <Fragment key={rowIndex}>
            {row.map((member) => {
              const expanded = member.id === openId;
              return (
                <li key={member.id}>
                  <button
                    type="button"
                    id={triggerId(member.id)}
                    aria-expanded={expanded}
                    aria-controls={expanded ? panelId(member.id) : undefined}
                    onClick={() => setOpenId(expanded ? null : member.id)}
                    className="group flex w-full flex-col items-center text-center"
                  >
                    <MemberPhoto
                      name={member.name}
                      photo={member.photo}
                      sizes="(min-width: 1024px) 11rem, 40vw"
                      className={cn(
                        'max-w-44 transition-[box-shadow] duration-200',
                        // Açık kişinin portresinin çevresinde turkuaz halka — tek vurgu.
                        expanded ? 'ring-[3px] ring-brand ring-offset-4 ring-offset-surface-soft' : 'group-hover:ring-1 group-hover:ring-line group-hover:ring-offset-4 group-hover:ring-offset-surface-soft',
                      )}
                    />
                    <span className="mt-5 font-display text-xl leading-tight font-semibold">{member.name}</span>
                    <span className="mt-1 text-[0.9375rem] text-ink/75">{member.role}</span>
                  </button>
                </li>
              );
            })}

            {open && (
              <li className="col-span-full">
                <div
                  ref={panelRef}
                  id={panelId(open.id)}
                  role="region"
                  aria-labelledby={triggerId(open.id)}
                  tabIndex={-1}
                  className="relative grid animate-panel-in gap-8 border border-line bg-surface p-6 outline-none sm:p-10 md:grid-cols-[12rem_1fr] md:gap-12"
                >
                  {/* Panelin açıldığı kişiyi gösteren küçük çentik */}
                  <span
                    aria-hidden
                    className="absolute -top-[7px] size-3 -translate-x-1/2 rotate-45 border-t border-l border-line bg-surface"
                    style={{ left: `${((openIndex + 0.5) / columns) * 100}%` }}
                  />
                  <MemberPhoto
                    name={open.name}
                    photo={open.photo}
                    sizes="12rem"
                    className="mx-auto max-w-48 md:mx-0"
                  />
                  <div>
                    {open.title && <p className="text-[0.9375rem] text-muted">{open.title}</p>}
                    <h3 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">{open.name}</h3>
                    <p className="mt-1 font-semibold text-primary">{open.role}</p>
                    {open.bio ? (
                      <p className="mt-5 max-w-[65ch] text-ink/80">{open.bio}</p>
                    ) : (
                      <p className="mt-5 text-muted">{t('bioComingSoon')}</p>
                    )}
                    {open.links && open.links.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                        {open.links.map((link) => (
                          <li key={link.url}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-brand decoration-2 underline-offset-4 hover:decoration-ink"
                            >
                              {link.label}
                              <ArrowUpRight aria-hidden className="size-4" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t('close')}
                    className="absolute top-2 right-2 inline-flex size-11 items-center justify-center text-muted transition-colors hover:text-ink"
                  >
                    <X aria-hidden className="size-5" />
                  </button>
                </div>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
