import Image from 'next/image';

import { cn } from '@/lib/cn';

interface PersonPhotoProps {
  name: string;
  photo?: string;
  /** next/image için yaklaşık görüntülenme genişliği. */
  sizes: string;
  className?: string;
}

/**
 * Yuvarlak portre. Fotoğraf yoksa boş bej yuvarlak durur (fotoğraf gelince dolar).
 */
export function PersonPhoto({ name, photo, sizes, className }: PersonPhotoProps) {
  return (
    <div
      className={cn('relative aspect-square w-full overflow-hidden rounded-full bg-surface-muted', className)}
    >
      {photo && <Image src={photo} alt={name} fill sizes={sizes} className="object-cover" />}
    </div>
  );
}
