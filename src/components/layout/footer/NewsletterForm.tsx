'use client';

import { useId } from 'react';

interface NewsletterFormProps {
  label: string;
  placeholder: string;
  button: string;
}

/**
 * Bülten aboneliği — şimdilik yalnızca görünüm. Gönderim panel / arka uç
 * aşamasında bağlanacak; o zamana kadar form sayfayı yenilemez.
 */
export function NewsletterForm({ label, placeholder, button }: NewsletterFormProps) {
  const inputId = useId();

  return (
    <form className="mt-5" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={inputId} className="text-sm text-white/70">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={placeholder}
          className="min-h-12 w-full min-w-0 rounded-lg border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/40 focus-visible:outline-white"
        />
        <button
          type="submit"
          className="min-h-12 shrink-0 rounded-lg bg-brand px-4 font-display font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-white"
        >
          {button}
        </button>
      </div>
    </form>
  );
}
