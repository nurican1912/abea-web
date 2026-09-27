import type { Localized, TeamMember } from '@/types/content';

import { MemberPhoto } from './MemberPhoto';

interface TeamGridProps {
  members: Localized<TeamMember>[];
}

/** Tasarım 2 — klasik ızgara (TOG gibi): kare portre, altında ad ve görev. Etkileşim yok. */
export function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((member) => (
        <li key={member.id}>
          <MemberPhoto name={member.name} photo={member.photo} shape="square" sizes="(min-width: 1024px) 18rem, 45vw" />
          <p className="mt-4 font-display text-xl leading-tight font-semibold">
            {member.title && <span className="font-medium text-muted">{member.title} </span>}
            {member.name}
          </p>
          <p className="mt-1 text-[0.9375rem] text-ink/75">{member.role}</p>
        </li>
      ))}
    </ul>
  );
}
