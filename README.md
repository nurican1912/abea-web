# ABEA Web Sitesi

Afet Bilinci Eğitim Araştırma Derneği'nin kurumsal web sitesi.
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · next-intl (TR / EN)

Mimari, kararlar ve yol haritası: [MIMARI.md](MIMARI.md) · Açık sorular: [SORULAR.md](SORULAR.md)

## Çalıştırma

```bash
npm install
npm run dev          # http://localhost:3000  →  /tr'ye yönlenir
```

```bash
npm run build && npm start   # production
npm run lint
```

Node.js 20.9 veya üstü gerekir.

## Nerede ne var?

| Ne yapmak istiyorsun? | Nereye bak |
|---|---|
| Bir sayfanın kodunu bulmak | `src/app/[locale]/` altında menüdeki adıyla: `hakkimizda/ekibimiz/page.tsx` |
| Bir sayfanın metnini değiştirmek | `content/pages/` altında aynı yol: `hakkimizda/ekibimiz.json` (TR ve EN yan yana) |
| Menüyü değiştirmek | `content/site/navigation.json` |
| Buton, etiket gibi arayüz yazıları | `messages/tr.json`, `messages/en.json` |
| Yeni sayfa eklemek | 1) `src/i18n/routing.ts` → adres ve EN karşılığı · 2) `src/app/[locale]/…/page.tsx` · 3) `content/pages/….json` · 4) menüdeyse `navigation.json` |
| Renk / yazı tipi | `src/styles/globals.css` → `@theme` |
| Açılış animasyonunun sıklığı | `src/config/intro.ts` → `policy` |

## Açılış animasyonu

Logo ortada çizilir, ardından yazısıyla birlikte küçülerek topbar'daki yerine kayar.

- Sekme başına bir kez oynar; yenilemede gelmez, yeni sekmede gelir.
- Tıklama, dokunma ya da herhangi bir tuş animasyonu atlar.
- Adresin sonuna `?intro` eklenirse her seferinde oynar: `http://localhost:3000/tr?intro`
- "Hareketi azalt" tercihi açık cihazlarda oynamaz.
- Logo › Logomuzun Hikâyesi sayfasında "Tekrar oynat" ile her zaman izlenebilir.

## Depoya girmeyenler

`_kaynak/` klasörü (WEB.docx, PDF taslakları, WhatsApp görselleri, eski "Yakında" sayfası)
yalnızca yerelde durur — bkz. `.gitignore`.
