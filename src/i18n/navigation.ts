import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/** Dile duyarlı Link / redirect / usePathname — projede `next/link` yerine bunlar kullanılır. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
