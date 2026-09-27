import Image from 'next/image';

import { cn } from '@/lib/cn';

interface MemberPhotoProps {
  name: string;
  photo?: string;
  shape: 'circle' | 'square';
  /** next/image için yaklaşık görüntülenme genişliği. */
  sizes: string;
  className?: string;
}

/** "Murad Tiryakioğlu" → "MT" */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toLocaleUpperCase('tr');
}

/**
 * Üye portresi. Fotoğraf yoksa bej zemin üstünde baş harfler (yer tutucu gibi
 * değil, bilinçli bir varsayılan). Fotoğraflar siyah-beyaz ve aynı kadrajda olmalı.
 */
export function MemberPhoto({ name, photo, shape, sizes, className }: MemberPhotoProps) {
  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden bg-surface-muted',
        shape === 'circle' ? 'rounded-full' : 'rounded-sm',
        className,
      )}
    >
      {photo ? (
        <Image src={photo} alt={name} fill sizes={sizes} className="object-cover" />
      ) : (
        <span aria-hidden className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold text-muted">
          {initials(name)}
        </span>
      )}
    </div>
  );
}
