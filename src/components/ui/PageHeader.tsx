import type { ReactNode } from 'react';

import type { NavLinkView } from '@/lib/content';

import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';

interface PageHeaderProps {
  title: string;
  description?: string;
  parents?: NavLinkView[];
  /** Başlığın altına, alt çizgiye yaslanan içerik — ör. Yayınlar sekmeleri. */
  children?: ReactNode;
}

/** Her sayfanın üst bölümü: beyaz zemin, solda yol satırı + büyük başlık, sağda giriş metni. */
export function PageHeader({ title, description, parents = [], children }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumb parents={parents} current={title} />
        <div className="grid gap-4 pt-5 pb-10 sm:pb-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-14">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] font-semibold text-balance">{title}</h1>
          {description && <p className="max-w-[60ch] text-lg text-ink/75 sm:text-xl">{description}</p>}
        </div>
        {children}
      </Container>
    </header>
  );
}
