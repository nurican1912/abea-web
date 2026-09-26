import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/lib/cn';

type ContainerProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/** Sayfa genişliği ve yan boşluklar — mobilde 16px, büyüdükçe artar. */
export function Container<T extends ElementType = 'div'>({ as, className, ...props }: ContainerProps<T>) {
  const Tag = as ?? 'div';
  return <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />;
}
