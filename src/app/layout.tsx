import type { ReactNode } from 'react';

// Asıl kök layout `[locale]/layout.tsx`'tir (<html lang> dile göre değişir).
// Bu dosya yalnızca kökteki `not-found.tsx` çalışabilsin diye var.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
