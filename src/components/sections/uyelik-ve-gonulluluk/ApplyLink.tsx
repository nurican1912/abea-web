'use client';

import type { ReactNode } from 'react';

import type { ApplicationType } from '@/types/content';

import { APPLY_EVENT, FORM_ID } from './apply';

interface ApplyLinkProps {
  type: ApplicationType;
  className: string;
  children: ReactNode;
}

/** Karttaki başvuru butonu: forma iner ve başvuru türünü seçili getirir. */
export function ApplyLink({ type, className, children }: ApplyLinkProps) {
  return (
    <a
      href={`#${FORM_ID}`}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: type }))}
    >
      {children}
    </a>
  );
}
