/** Koşullu sınıf adlarını birleştirir: `cn('a', open && 'b')` */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
