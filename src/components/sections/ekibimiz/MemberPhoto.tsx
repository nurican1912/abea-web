import Image from 'next/image';

import { cn } from '@/lib/cn';

interface MemberPhotoProps {
  name: string;
  photo?: string;
  /** next/image için yaklaşık görüntülenme genişliği. */
  sizes: string;
  className?: string;
}

/**
 * Yuvarlak üye portresi. Fotoğraf yoksa boş bej yuvarlak durur (fotoğraf gelince dolar).
 */
export function MemberPhoto({ name, photo, sizes, className }: MemberPhotoProps) {
  return (
    <div
      className={cn('relative aspect-square w-full overflow-hidden rounded-full bg-surface-muted', className)}
    >
      {photo && <Image src={photo} alt={name} fill sizes={sizes} className="object-cover" />}
    </div>
  );
}
