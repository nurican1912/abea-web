import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Şimdiki veri kaynağı: proje kökündeki `content/` klasörü.
 * Panel geldiğinde bu dosyanın yerini `payload-source.ts` / `api-source.ts` alır.
 */
export const readContent = cache(async <T>(relativePath: string): Promise<T> => {
  const file = path.join(CONTENT_DIR, `${relativePath}.json`);
  return JSON.parse(await readFile(file, 'utf8')) as T;
});
