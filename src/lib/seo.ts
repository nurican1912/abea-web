import 'server-only';

import type { Metadata } from 'next';

import type { AppPathname, Locale } from '@/i18n/routing';

import { getPage } from './content';

/** Sayfanın `<title>` ve açıklamasını içerik dosyasından üretir. */
export async function pageMetadata(path: AppPathname, locale: Locale): Promise<Metadata> {
  const page = await getPage(path, locale);

  return {
    // Ana sayfada şablon ("… | Dernek adı") yerine yalnızca dernek adı görünür.
    title: path === '/' ? undefined : page.title,
    description: page.description,
  };
}
