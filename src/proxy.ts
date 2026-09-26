import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

// Next.js 16'da `middleware.ts` yerine `proxy.ts`.
// `/` → tarayıcı diline göre `/tr` ya da `/en`; `/en/about` → `app/[locale]/hakkimizda`.
export default createMiddleware(routing);

export const config = {
  // API, Next iç dosyaları ve uzantılı statik dosyalar (favicon, görseller) hariç her şey
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
