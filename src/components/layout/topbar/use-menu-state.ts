'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
} from 'react';

export const triggerId = (id: string) => `menu-trigger-${id}`;
export const panelId = (id: string) => `menu-panel-${id}`;

const HOVER_CLOSE_DELAY = 160;

/**
 * Masaüstü açılır menülerinin ortak durumu — aynı anda tek menü açık kalır.
 *
 * - Fare: üzerine gelince açılır, ayrılınca kısa bir gecikmeyle kapanır.
 * - Başlık bağlantıları için ayrıntılar: `linkTrigger`. Logo oku gibi düğmeler: `toggle`.
 * - Esc, dışarı tıklama ya da odağın menüden çıkması kapatır.
 */
export function useMenuState() {
  const [openId, setOpenId] = useState<string | null>(null);
  // Fareyle açılıp hemen ardından tıklanınca React henüz yeniden çizmemiş
  // olabilir; kararlar bu yüzden state'in eşzamanlı kopyasına bakar.
  const openIdRef = useRef<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // Fareyle açılan menüye gelen ilk tıklama menüyü kapatmasın.
  const openedByHover = useRef(false);
  // Son dokunuşun türü (mouse / touch / pen) — başlık bağlantısında dokunmatiği ayırt eder.
  const lastPointer = useRef('mouse');

  const clearTimer = useCallback(() => window.clearTimeout(closeTimer.current), []);

  const set = useCallback((id: string | null) => {
    openIdRef.current = id;
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    clearTimer();
    openedByHover.current = false;
    set(null);
  }, [clearTimer, set]);

  const toggle = useCallback(
    (id: string) => {
      clearTimer();
      if (openIdRef.current === id && openedByHover.current) {
        openedByHover.current = false;
        return;
      }
      openedByHover.current = false;
      set(openIdRef.current === id ? null : id);
    },
    [clearTimer, set],
  );

  /**
   * Hem sayfaya giden hem menü açan başlık bağlantısına verilir:
   * - Fare: üzerine gelince menü açılır (`bind`), tıklayınca sayfaya gider.
   * - Dokunmatik: üzerine gelme yok → ilk dokunuş menüyü açar; menüdeki
   *   "Genel bakış" satırı sayfaya götürür. Menü açıkken ikinci dokunuş da gider.
   * - Klavye: Enter sayfaya gider, aşağı ok menüyü açıp ilk bağlantıya odaklanır.
   */
  const linkTrigger = (id: string) => ({
    onPointerDown: (event: PointerEvent) => {
      lastPointer.current = event.pointerType;
    },
    onClick: (event: ReactMouseEvent) => {
      // detail === 0 → klavyeyle tetiklenen tıklama: her zaman sayfaya git.
      const touchFirstTap = event.detail > 0 && lastPointer.current !== 'mouse' && openIdRef.current !== id;
      if (touchFirstTap) {
        event.preventDefault();
        openedByHover.current = false;
        set(id);
        return;
      }
      close();
    },
    onKeyDown: (event: ReactKeyboardEvent) => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      set(id);
      // Panel görünür olduktan sonra (iki kare) ilk bağlantıya odaklan.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${panelId(id)} a`)?.focus()),
      );
    },
  });

  /** Menüyü saran öğeye verilir. */
  const bind = (id: string) => ({
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      clearTimer();
      if (openIdRef.current !== id) openedByHover.current = true;
      set(id);
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      clearTimer();
      closeTimer.current = window.setTimeout(close, HOVER_CLOSE_DELAY);
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (openId === id && !event.currentTarget.contains(event.relatedTarget)) close();
    },
  });

  useEffect(() => {
    if (!openId) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!(event.target as Element).closest(`#${panelId(openId)}, #${triggerId(openId)}`)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      document.getElementById(triggerId(openId))?.focus();
      close();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openId, close]);

  useEffect(() => clearTimer, [clearTimer]);

  return { openId, toggle, close, bind, linkTrigger };
}

export type MenuState = ReturnType<typeof useMenuState>;
