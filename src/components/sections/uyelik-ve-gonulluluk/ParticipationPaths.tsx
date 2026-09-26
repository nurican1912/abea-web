import { Container } from '@/components/ui/Container';
import { card, primaryButton, secondaryButton } from '@/components/ui/styles';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { Localized, MembershipPageContent } from '@/types/content';

import { ApplyLink } from './ApplyLink';

interface ParticipationPathsProps {
  paths: Localized<MembershipPageContent>['paths'];
}

/** Üç katılım yolu: Üye olun · Gönüllü olun (vurgulu, sarı) · Kurumsal gönüllülük. */
export function ParticipationPaths({ paths }: ParticipationPathsProps) {
  return (
    <Container className="py-12 sm:py-16">
      <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {paths.map((path) => (
          <li
            key={path.type}
            className={cn(
              'flex flex-col rounded-xl p-7 sm:p-9',
              // Vurgulu kart kehribar sarısı — şimdilik; renk tek değişkenden (`cta`) değişir.
              path.featured ? 'bg-cta text-ink' : card,
            )}
          >
            <h2 className="font-display text-3xl font-semibold">{path.title}</h2>
            <p className={cn('mt-3', path.featured ? 'text-ink/85' : 'text-ink/75')}>{path.text}</p>
            <div className="mt-auto pt-7">
              {path.href ? (
                <Link href={path.href} className={cn(secondaryButton, 'inline-flex')}>
                  {path.action}
                </Link>
              ) : (
                <ApplyLink type={path.type} className={cn(primaryButton, 'inline-flex')}>
                  {path.action}
                </ApplyLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
