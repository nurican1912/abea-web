'use client';

import { useSyncExternalStore } from 'react';

/** Sayfa `threshold` pikselden fazla kaydırıldı mı? Sunucuda ve ilk boyamada `false`. */
export function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('scroll', onChange, { passive: true });
      return () => window.removeEventListener('scroll', onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}
