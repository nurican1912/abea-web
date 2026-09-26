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
    '/logomuz': { tr: '/logomuz', en: '/our-logo' },

    '/hakkimizda': { tr: '/hakkimizda', en: '/about' },
    '/hakkimizda/biz-kimiz': { tr: '/hakkimizda/biz-kimiz', en: '/about/who-we-are' },
    '/hakkimizda/yolculugumuz': { tr: '/hakkimizda/yolculugumuz', en: '/about/our-journey' },
    '/hakkimizda/ekibimiz': { tr: '/hakkimizda/ekibimiz', en: '/about/our-team' },
    '/hakkimizda/danisma-kurulumuz': { tr: '/hakkimizda/danisma-kurulumuz', en: '/about/advisory-board' },
    '/hakkimizda/politika-belgelerimiz': { tr: '/hakkimizda/politika-belgelerimiz', en: '/about/policies' },
    '/hakkimizda/tuzugumuz': { tr: '/hakkimizda/tuzugumuz', en: '/about/bylaws' },
    '/hakkimizda/degerlerimiz': { tr: '/hakkimizda/degerlerimiz', en: '/about/our-values' },
    '/hakkimizda/uyelerimiz': { tr: '/hakkimizda/uyelerimiz', en: '/about/our-members' },
    '/hakkimizda/uyelik-ve-gonulluluk': { tr: '/hakkimizda/uyelik-ve-gonulluluk', en: '/about/join-us' },

    '/calismalarimiz': { tr: '/calismalarimiz', en: '/our-work' },
    '/calismalarimiz/afet-risk-azaltma': { tr: '/calismalarimiz/afet-risk-azaltma', en: '/our-work/disaster-risk-reduction' },
    '/calismalarimiz/is-dunyasi': { tr: '/calismalarimiz/is-dunyasi', en: '/our-work/business' },
    '/calismalarimiz/okul-oncesi': { tr: '/calismalarimiz/okul-oncesi', en: '/our-work/early-childhood' },
    '/calismalarimiz/kurumsal-gonulluluk': { tr: '/calismalarimiz/kurumsal-gonulluluk', en: '/our-work/corporate-volunteering' },

    '/yayinlar': { tr: '/yayinlar', en: '/publications' },
    '/yayinlar/bilgi-notlari': { tr: '/yayinlar/bilgi-notlari', en: '/publications/briefs' },
    '/yayinlar/politika-notlari': { tr: '/yayinlar/politika-notlari', en: '/publications/policy-briefs' },
    '/yayinlar/raporlar': { tr: '/yayinlar/raporlar', en: '/publications/reports' },
    '/yayinlar/kutuphane': { tr: '/yayinlar/kutuphane', en: '/publications/library' },

    '/hikayeler': { tr: '/hikayeler', en: '/stories' },

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
