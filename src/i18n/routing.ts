import { defineRouting } from 'next-intl/routing';

/**
 * Sitenin tüm adresleri — tek kaynak.
 *
 * Anahtar: `src/app/[locale]/` altındaki klasör yolu (Türkçe).
 * Değer:   her dilde tarayıcıda görünen adres.
 *
 * Yeni sayfa eklerken: önce buraya, sonra `app/` altına klasörünü aç.
 */
export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',

    '/hakkimizda': { tr: '/hakkimizda', en: '/about' },
    '/hakkimizda/ekibimiz': { tr: '/hakkimizda/ekibimiz', en: '/about/our-team' },
    '/hakkimizda/danisma-kurulumuz': { tr: '/hakkimizda/danisma-kurulumuz', en: '/about/advisory-board' },
    '/hakkimizda/politika-belgelerimiz': { tr: '/hakkimizda/politika-belgelerimiz', en: '/about/policies' },
    '/hakkimizda/tuzugumuz': { tr: '/hakkimizda/tuzugumuz', en: '/about/bylaws' },
    '/hakkimizda/degerlerimiz': { tr: '/hakkimizda/degerlerimiz', en: '/about/our-values' },
    '/hakkimizda/logomuz': { tr: '/hakkimizda/logomuz', en: '/about/our-logo' },
    '/hakkimizda/uyelik-ve-gonulluluk': { tr: '/hakkimizda/uyelik-ve-gonulluluk', en: '/about/join-us' },

    '/hikayemiz': { tr: '/hikayemiz', en: '/our-story' },

    '/calismalarimiz': { tr: '/calismalarimiz', en: '/our-work' },
    '/calismalarimiz/is-dunyasi-ve-kurumsal-dayaniklilik': { tr: '/calismalarimiz/is-dunyasi-ve-kurumsal-dayaniklilik', en: '/our-work/business-resilience' },
    '/calismalarimiz/okul-guvenligi-ve-afet-egitimi': { tr: '/calismalarimiz/okul-guvenligi-ve-afet-egitimi', en: '/our-work/school-safety' },
    '/calismalarimiz/iklim-ve-afet-riskleri': { tr: '/calismalarimiz/iklim-ve-afet-riskleri', en: '/our-work/climate-and-disaster-risks' },
    '/calismalarimiz/yerel-ve-toplumsal-dayaniklilik': { tr: '/calismalarimiz/yerel-ve-toplumsal-dayaniklilik', en: '/our-work/community-resilience' },
    '/calismalarimiz/arastirma-politika-savunuculuk': { tr: '/calismalarimiz/arastirma-politika-savunuculuk', en: '/our-work/research-policy-advocacy' },
    '/calismalarimiz/acil-durum-hazirligi': { tr: '/calismalarimiz/acil-durum-hazirligi', en: '/our-work/emergency-preparedness' },

    '/yayinlar': { tr: '/yayinlar', en: '/publications' },
    '/yayinlar/bilgi-notlari': { tr: '/yayinlar/bilgi-notlari', en: '/publications/briefs' },
    '/yayinlar/politika-notlari': { tr: '/yayinlar/politika-notlari', en: '/publications/policy-briefs' },
    '/yayinlar/raporlar': { tr: '/yayinlar/raporlar', en: '/publications/reports' },
    '/yayinlar/kutuphane': { tr: '/yayinlar/kutuphane', en: '/publications/library' },

    '/paydaslarimiz': { tr: '/paydaslarimiz', en: '/partners' },
    '/paydaslarimiz/kurumsal': { tr: '/paydaslarimiz/kurumsal', en: '/partners/institutional' },
    '/paydaslarimiz/medya': { tr: '/paydaslarimiz/medya', en: '/partners/media' },
    '/paydaslarimiz/fon-saglayicilar': { tr: '/paydaslarimiz/fon-saglayicilar', en: '/partners/funders' },

    '/kvkk': { tr: '/kvkk', en: '/privacy' },
    '/cerez-politikasi': { tr: '/cerez-politikasi', en: '/cookies' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export function isAppPathname(value: string): value is AppPathname {
  return Object.hasOwn(routing.pathnames, value);
}
