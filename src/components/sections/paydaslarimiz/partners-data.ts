import 'server-only';

import type { Locale } from '@/i18n/routing';
import { getCollection, getFooter, getPage } from '@/lib/content';
import type { Partner, PartnerGroup, PartnersPageContent, PressItem } from '@/types/content';

/** Paydaşlar sayfası ve alt sayfalarının ortak verisi — her sayfa ihtiyacı olanı kullanır. */
export async function getPartnersData(locale: Locale) {
  const [content, groups, funders, mediaPartners, press, footer] = await Promise.all([
    getPage<PartnersPageContent>('/paydaslarimiz', locale),
    getCollection<PartnerGroup>('partners', locale),
    getCollection<Partner>('funders', locale),
    getCollection<Partner>('media-partners', locale),
    getCollection<PressItem>('press', locale),
    getFooter(locale),
  ]);

  return { content, groups, funders, mediaPartners, press, email: footer.contact.email };
}
