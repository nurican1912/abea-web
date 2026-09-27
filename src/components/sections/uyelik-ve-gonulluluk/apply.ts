import type { ApplicationType } from '@/types/content';

/** Başvuru formunun çapa kimliği — kartlardaki butonlar buraya iner. */
export const FORM_ID = 'basvuru-formu';

/** Kart butonu → form: hangi başvuru türünün seçileceğini taşıyan olay. */
export const APPLY_EVENT = 'abea:apply-type';

export type ApplyEvent = CustomEvent<ApplicationType>;
