import { placeholderBox } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import type { Partner } from '@/types/content';

interface LogoSlotsProps {
  partners: Partner[];
  /** Logo gelene kadar en az bu kadar yer tutucu gösterilir. */
  minSlots: number;
  placeholderLabel: string;
  className?: string;
  slotClassName?: string;
}

/**
 * Paydaş logoları: logosu olan kurum sitesine bağlanır; eksik yerler kesik
 * çizgili "[Logo]" kutusuyla doldurulur. İçerik geldikçe yer tutucular kendiliğinden azalır.
 */
export function LogoSlots({ partners, minSlots, placeholderLabel, className, slotClassName }: LogoSlotsProps) {
  const placeholders = Math.max(0, minSlots - partners.length);
  const slot = cn(placeholderBox, 'min-h-20', slotClassName);

  return (
    <ul className={className}>
      {partners.map((partner) => (
        <li key={partner.name}>
          <a
            href={partner.url ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(slot, 'border-solid p-4')}
            title={partner.name}
          >
            {partner.logo ? (
              // Logolar geldiğinde next/image ile değiştirilecek (bkz. MIMARI.md → media.ts).
              // eslint-disable-next-line @next/next/no-img-element
              <img src={partner.logo} alt={partner.name} className="max-h-12 w-auto object-contain" />
            ) : (
              partner.name
            )}
          </a>
        </li>
      ))}
      {Array.from({ length: placeholders }, (_, i) => (
        <li key={`placeholder-${i}`} aria-hidden>
          <div className={slot}>[{placeholderLabel}]</div>
        </li>
      ))}
    </ul>
  );
}
