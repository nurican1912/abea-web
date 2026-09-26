'use client';

import { useEffect, useId, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { card, formField, formLabel, primaryButton, sectionTitle } from '@/components/ui/styles';
import { PROVINCES } from '@/config/provinces';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { ApplicationType, Localized, MembershipPageContent } from '@/types/content';

import { APPLY_EVENT, FORM_ID, type ApplyEvent } from './apply';

interface ApplicationFormProps {
  content: Localized<MembershipPageContent>['form'];
}

const TYPES: ApplicationType[] = ['gonulluluk', 'uyelik', 'kurumsal'];

/**
 * Başvuru formu — şimdilik yalnızca görünüm; gönderim panel / arka uç
 * aşamasında bağlanacak. O zamana kadar gönder butonu sayfayı yenilemez.
 */
export function ApplicationForm({ content }: ApplicationFormProps) {
  const id = useId();
  const [type, setType] = useState<ApplicationType>('gonulluluk');

  // Kartlardaki "… başvurusu" butonları türü seçili getirir.
  useEffect(() => {
    const onApply = (event: Event) => setType((event as ApplyEvent).detail);
    window.addEventListener(APPLY_EVENT, onApply);
    return () => window.removeEventListener(APPLY_EVENT, onApply);
  }, []);

  const field = (name: keyof typeof content.fields) => `${id}-${name}`;
  const { fields } = content;

  return (
    <Container as="section" id={FORM_ID} aria-labelledby={`${id}-title`} className="scroll-mt-24 pb-12 sm:pb-16">
      <div className={cn(card, 'grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:p-14')}>
        <div>
          <h2 id={`${id}-title`} className={sectionTitle}>
            {content.title}
          </h2>
          <p className="mt-4 text-ink/75">{content.description}</p>
        </div>

        <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend className={formLabel}>{content.typeLabel}</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {TYPES.map((value) => (
                <label
                  key={value}
                  className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border border-line px-4 transition-colors has-[:checked]:border-brand has-[:checked]:bg-surface-soft"
                >
                  <input
                    type="radio"
                    name="type"
                    value={value}
                    checked={type === value}
                    onChange={() => setType(value)}
                    className="size-4 accent-primary"
                  />
                  {content.types[value]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={field('name')} className={formLabel}>
                {fields.name}
              </label>
              <input id={field('name')} name="name" autoComplete="name" required className={cn(formField, 'mt-2')} />
            </div>
            <div>
              <label htmlFor={field('email')} className={formLabel}>
                {fields.email}
              </label>
              <input id={field('email')} name="email" type="email" autoComplete="email" required className={cn(formField, 'mt-2')} />
            </div>
            <div>
              <label htmlFor={field('phone')} className={formLabel}>
                {fields.phone}
              </label>
              <input id={field('phone')} name="phone" type="tel" autoComplete="tel" className={cn(formField, 'mt-2')} />
            </div>
            <div>
              <label htmlFor={field('city')} className={formLabel}>
                {fields.city}
              </label>
              <select id={field('city')} name="city" defaultValue="" className={cn(formField, 'mt-2')}>
                <option value="" disabled>
                  {fields.cityPlaceholder}
                </option>
                {PROVINCES.map((province) => (
                  <option key={province}>{province}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={field('profession')} className={formLabel}>
                {fields.profession}
              </label>
              <input id={field('profession')} name="profession" className={cn(formField, 'mt-2')} />
            </div>
            <div>
              <label htmlFor={field('organization')} className={formLabel}>
                {fields.organization}
              </label>
              <input id={field('organization')} name="organization" autoComplete="organization" className={cn(formField, 'mt-2')} />
            </div>
          </div>

          <fieldset>
            <legend className={formLabel}>{fields.interests}</legend>
            <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {content.interests.map((interest) => (
                <label key={interest} className="flex min-h-11 cursor-pointer items-center gap-3">
                  <input type="checkbox" name="interests" value={interest} className="size-4 shrink-0 accent-primary" />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor={field('contribution')} className={formLabel}>
              {fields.contribution}
            </label>
            <textarea id={field('contribution')} name="contribution" rows={4} className={cn(formField, 'mt-2 py-3')} />
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80">
            <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-primary" />
            <span>
              {content.consentBefore}
              <Link href="/kvkk" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">
                {content.consentLink}
              </Link>
              {content.consentAfter}
            </span>
          </label>

          <div>
            <button type="submit" className={cn(primaryButton, 'inline-flex')}>
              {content.submit}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
