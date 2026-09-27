import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';

import { ctaButton, primaryButton, textLink } from './styles';

const variants = {
  cta: ctaButton,
  primary: primaryButton,
  text: textLink,
} as const;

interface ButtonLinkProps {
  href: AppPathname;
  variant: keyof typeof variants;
  children: ReactNode;
  /** Varsayılan `inline-flex`; ör. mobil menüde `flex w-full`. */
  className?: string;
  onClick?: () => void;
}

/** Buton görünümlü bağlantı, sağında küçük ok. Üzerine gelince ok hafifçe sağa kayar. */
export function ButtonLink({ href, variant, children, className = 'inline-flex', onClick }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={cn('group/button', variants[variant], className)}>
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
