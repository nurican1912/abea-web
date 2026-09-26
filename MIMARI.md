# ABEA Web Sitesi — Mimari Plan

Afet Bilinci Eğitim Araştırma Derneği'nin kurumsal web sitesi.

| Aşama | Kapsam | Durum |
|---|---|---|
| **1. Ön yüz** | Tüm sayfalar, TR/EN, logo animasyonu. İçerik sabit dosyalarda. | **Şimdi** |
| 2. Panel + arka uç | Üye ol / giriş, rol bazlı yönetim paneli, tüm içeriğin panelden düzenlenmesi | İleride |
| 3. Mobil (olası) | Aynı API'yi kullanan mobil uygulama | Belirsiz |

Temel ilke: **Aşama 1'de yazılan hiçbir sayfa, Aşama 2'de yeniden yazılmayacak.**
Bunu sağlayan tek kural: sayfalar veriyi asla doğrudan dosyadan okumaz, hep
veri katmanından (`src/lib/content/`) ister.

---

## 1. Teknoloji Stack'i

### 1.1 Ön yüz (şimdi)

| Alan | Seçim | Not |
|---|---|---|
| Çatı | **Next.js** (güncel sürüm, App Router) | Sayfalar sunucuda üretilir → hızlı açılış, iyi SEO |
| UI | **React** | |
| Dil | **TypeScript** (`strict: true`) | |
| Stil | **Tailwind CSS** | Renk / font / boşluk değerleri tema değişkenlerinde, tek yerde |
| Çoklu dil | **next-intl** | `/tr/...` ve `/en/...`, çevrilmiş URL'ler, `hreflang` |
| Animasyon | Eski logo animasyonu (TS'e taşınır, Web Animations API) + **Motion** | Motion: menü açılışları, sayfa içi beliriş efektleri |
| Yazı tipi | `next/font` ile **Barlow** + **Barlow Semi Condensed** | Kendi sunucumuzdan, dış istek yok |
| İkonlar | **lucide-react** | |
| Kod kalitesi | ESLint + Prettier | Kaydetmede otomatik biçimlendirme |
| Paket yöneticisi | **npm** | |
| Yayın | **Vercel** | |

### 1.2 Panel ve arka uç (ileride — karar kesin değil)

| Seçenek | Açıklama |
|---|---|
| **Payload CMS** (büyük ihtimalle) | Next.js projesinin içine kurulur. PostgreSQL, hazır auth + roller, alan bazında TR/EN, dosya yükleme, otomatik REST/GraphQL API (mobil için). Panel adresi `/panel` yapılır. |
| Kendi panelimiz | Next.js API veya ayrı Express API + PostgreSQL + Prisma. |

Her iki seçenekte ortak olanlar:

- **Veritabanı:** PostgreSQL (Neon / Supabase vb.)
- **Dosyalar:** S3 veya Vercel Blob
- **Giriş:** sitede görünür "Giriş yap" linki var, gizli URL yok. Admin giriş yapınca hesap menüsünde "Yönetim Paneli" linki çıkar.
- **Roller:** `member` / `editor` / `admin`. Yetki sunucuda kontrol edilir.

---

## 2. Klasör Yapısı

Kural: **URL'deki her sayfa, `app/` altında kendi klasöründe, kendi `page.tsx` dosyasıyla durur.**
Klasör adları menüdeki Türkçe adların aynısıdır. Kodu açan kişi menüdeki yeri anında bulur:
`hakkimizda/yolculugumuz/page.tsx` → *Hakkımızda › Yolculuğumuz*.

Kod içindeki isimler (bileşen, fonksiyon, tip) İngilizcedir; URL ve klasörler Türkçedir.

```
big-site-1/
├── MIMARI.md
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
│
├── public/
│   ├── images/                       # fotoğraflar (ileride CMS/S3'e taşınır)
│   └── docs/                         # indirilebilir PDF'ler
│
├── content/                          # ⬅ TÜM SİTE METİNLERİ (TR + EN)
│   ├── site/
│   │   ├── navigation.json           # topbar menüsü + alt menüler
│   │   ├── footer.json
│   │   └── seo.json                  # varsayılan başlık/açıklama
│   ├── pages/                        # app/ yapısının aynası
│   │   ├── home.json
│   │   ├── logomuz.json
│   │   ├── hakkimizda/
│   │   │   ├── yolculugumuz.json
│   │   │   ├── ekibimiz.json
│   │   │   └── ...
│   │   ├── calismalarimiz/...
│   │   ├── yayinlar/...
│   │   ├── hikayeler.json
│   │   └── paydaslarimiz/...
│   └── collections/                  # tekrar eden kayıtlar (ileride DB tabloları)
│       ├── team-members.json
│       ├── advisory-board.json
│       ├── values.json
│       ├── policies.json
│       ├── work-areas.json
│       ├── publications.json
│       ├── stories.json
│       └── partners.json
│
├── messages/                         # arayüz yazıları (buton, etiket, hata)
│   ├── tr.json
│   └── en.json
│
└── src/
    ├── app/
    │   └── [locale]/
    │       ├── layout.tsx                    # Topbar + Footer + LogoIntro
    │       ├── page.tsx                      # Ana sayfa
    │       ├── not-found.tsx
    │       │
    │       ├── logomuz/page.tsx              # Logomuzun Hikâyesi
    │       │
    │       ├── hakkimizda/
    │       │   ├── page.tsx                  # yalnızca ilk alt sayfaya yönlendirir
    │       │   ├── biz-kimiz/page.tsx
    │       │   ├── yolculugumuz/page.tsx
    │       │   ├── ekibimiz/page.tsx
    │       │   ├── danisma-kurulumuz/page.tsx
    │       │   ├── politika-belgelerimiz/page.tsx
    │       │   ├── tuzugumuz/page.tsx
    │       │   ├── degerlerimiz/page.tsx
    │       │   ├── uyelerimiz/page.tsx
    │       │   └── uyelik-ve-gonulluluk/page.tsx
    │       │
    │       ├── calismalarimiz/
    │       │   ├── page.tsx
    │       │   ├── afet-risk-azaltma/page.tsx
    │       │   ├── is-dunyasi/page.tsx
    │       │   ├── okul-oncesi/page.tsx
    │       │   └── kurumsal-gonulluluk/page.tsx
    │       │
    │       ├── yayinlar/
    │       │   ├── page.tsx
    │       │   ├── bilgi-notlari/page.tsx
    │       │   ├── politika-notlari/page.tsx
    │       │   ├── raporlar/page.tsx
    │       │   └── kutuphane/page.tsx
    │       │
    │       ├── hikayeler/page.tsx
    │       │
    │       ├── paydaslarimiz/
    │       │   ├── page.tsx
    │       │   ├── kurumsal/page.tsx
    │       │   ├── medya/page.tsx
    │       │   └── fon-saglayicilar/page.tsx
    │       │
    │       ├── kvkk/page.tsx
    │       └── cerez-politikasi/page.tsx
    │
    │       # Aşama 2'de eklenecek (adresler şimdiden ayrıldı):
    │       # giris/  uye-ol/  hesabim/  panel/
    │
    ├── components/
    │   ├── layout/
    │   │   ├── topbar/               # Topbar, LogoMenu, DesktopNav, MenuPanel, MobileMenu,
    │   │   │                         # LanguageSwitch, AccountButton, use-menu-state.ts
    │   │   └── PlaceholderPage.tsx   # içeriği gelmemiş sayfaların ortak şablonu
    │   ├── logo/                     # AbeaLogo, LogoIntro, LogoReplay, IntroBootScript,
    │   │                             # logo-geometry.ts, logo-animation.ts, logo.css
    │   ├── sections/                 # sayfaya özel bölümler, sayfa adıyla gruplanır
    │   │   ├── home/                 # HomeHero, ...
    │   │   ├── logomuz/              # LogoStorySection
    │   │   └── ...
    │   └── ui/                       # Container, PageHeader, Breadcrumb, ComingSoon, ...
    │
    ├── config/
    │   └── intro.ts                  # açılış animasyonu ayarları (ne sıklıkla oynar)
    │
    ├── proxy.ts                      # dil yönlendirmesi (Next.js 16'da middleware.ts'in yeni adı)
    │
    ├── lib/
    │   ├── content/                  # ⬅ VERİ KATMANI (Aşama 2'de değişecek tek yer)
    │   │   ├── index.ts              # getPage, getNavigation, getTeamMembers, ...
    │   │   ├── json-source.ts        # şimdi: content/*.json okur
    │   │   └── localize.ts           # { tr, en } → seçili dil
    │   ├── media.ts                  # (görseller gelince) görsel/PDF adresi üretir
    │   └── seo.ts                    # sayfa metadata üretici
    │
    ├── i18n/
    │   ├── routing.ts                # diller + TÜM adresler ve EN karşılıkları (tek kaynak)
    │   ├── navigation.ts             # dile duyarlı Link / redirect / usePathname
    │   ├── locale.ts                 # resolveLocale(): her sayfanın ilk satırı
    │   └── request.ts
    │
    ├── types/
    │   └── content.ts                # TeamMember, Publication, Partner, ... (tek kaynak)
    │
    └── styles/
        └── globals.css               # Tailwind + tema değişkenleri
```

Kaynak dosyalar `_kaynak/` klasöründe toplanır ve **depoya girmez**:

| Klasör | İçerik |
|---|---|
| `_kaynak/belgeler/` | WEB.docx ve PDF sayfa taslakları |
| `_kaynak/gorseller/` | Topbar referansı, logo |
| `_kaynak/animasyon/` | Logo animasyonu GIF, MP4 ve SVG |
| `_kaynak/eski-demo/` | "Yakında" sayfasının kodu ([abea-coming-soon](https://github.com/nurican1912/abea-coming-soon)) |

Hocaya sorulacak açık konular `SORULAR.md` dosyasında tutulur.

---

## 3. Sayfa Haritası ve URL'ler

| Menü | Klasör | TR URL | EN URL |
|---|---|---|---|
| Ana sayfa | `page.tsx` | `/tr` | `/en` |
| Logo › Logomuzun Hikâyesi | `logomuz/` | `/tr/logomuz` | `/en/our-logo` |
| **Hakkımızda** | `hakkimizda/` | `/tr/hakkimizda` | `/en/about` |
| › Biz Kimiz | `biz-kimiz/` | `…/biz-kimiz` | `…/who-we-are` |
| › Yolculuğumuz | `yolculugumuz/` | `…/yolculugumuz` | `…/our-journey` |
| › Ekibimiz | `ekibimiz/` | `…/ekibimiz` | `…/our-team` |
| › Danışma Kurulumuz | `danisma-kurulumuz/` | `…/danisma-kurulumuz` | `…/advisory-board` |
| › Politika Belgelerimiz | `politika-belgelerimiz/` | `…/politika-belgelerimiz` | `…/policies` |
| › Tüzüğümüz | `tuzugumuz/` | `…/tuzugumuz` | `…/bylaws` |
| › Değerlerimiz | `degerlerimiz/` | `…/degerlerimiz` | `…/our-values` |
| › Üyelerimiz | `uyelerimiz/` | `…/uyelerimiz` | `…/our-members` |
| › Üyelik & Gönüllülük | `uyelik-ve-gonulluluk/` | `…/uyelik-ve-gonulluluk` | `…/join-us` |
| **Çalışmalarımız** | `calismalarimiz/` | `/tr/calismalarimiz` | `/en/our-work` |
| › Afet Risk Azaltma Farkındalık Çalışmaları | `afet-risk-azaltma/` | | `…/disaster-risk-reduction` |
| › İş Dünyası Afet Farkındalık Çalışmaları | `is-dunyasi/` | | `…/business` |
| › Okul Öncesi Afet Farkındalık Çalışmaları | `okul-oncesi/` | | `…/early-childhood` |
| › Kurumsal Afet Gönüllülüğü Çalışmaları | `kurumsal-gonulluluk/` | | `…/corporate-volunteering` |
| **Yayınlar** | `yayinlar/` | `/tr/yayinlar` | `/en/publications` |
| › Bilgi Notları | `bilgi-notlari/` | | `…/briefs` |
| › Politika Notları | `politika-notlari/` | | `…/policy-briefs` |
| › Raporlar | `raporlar/` | | `…/reports` |
| › Kütüphane | `kutuphane/` | | `…/library` |
| **Hikâyeler** | `hikayeler/` | `/tr/hikayeler` | `/en/stories` |
| **Paydaşlarımız** | `paydaslarimiz/` | `/tr/paydaslarimiz` | `/en/partners` |
| › Kurumsal Paydaşlar | `kurumsal/` | | `…/institutional` |
| › Medya Paydaşları | `medya/` | | `…/media` |
| › Fon Sağlayıcılar | `fon-saglayicilar/` | | `…/funders` |
| Footer: KVKK, Çerez Politikası | `kvkk/`, `cerez-politikasi/` | | `…/privacy`, `…/cookies` |

`/` adresi tarayıcı diline göre `/tr` veya `/en`'e yönlenir (varsayılan: `tr`).

---

## 4. Veri Katmanı ve İçerik Şeması

### 4.1 Akış

```
page.tsx  ──►  getPage('hakkimizda/ekibimiz', locale)
               getTeamMembers(locale)
                    │
                    ▼
          src/lib/content/index.ts        ← sayfaların gördüğü tek arayüz
                    │
     ┌──────────────┼──────────────────────┐
     ▼              ▼                      ▼
json-source.ts   payload-source.ts     api-source.ts
  (şimdi)        (Payload seçilirse)   (kendi API'miz seçilirse)
```

### 4.2 Kurallar

1. **Bileşenlerde sabit metin yok.** Sayfa metni `content/` altında, arayüz yazıları `messages/` altında durur.
2. **İki dil yan yana saklanır, bileşene tek dil gider.** Dili seçip indiren yer `localize.ts`. Payload da `locale` verilince tek dil döndürür, bu yüzden geçişte bileşenler değişmez.

   ```json
   { "title": { "tr": "Ekibimiz", "en": "Our Team" } }
   ```
3. **Tipler tek yerde** (`src/types/content.ts`). Alan adları ileride kurulacak veritabanı tablolarına / Payload koleksiyonlarına birebir karşılık gelecek şekilde seçilir.
4. **Görsel ve PDF adresleri yalnızca `media.ts`'ten üretilir.**
5. **Uzun biçimli metinler** (tüzük, politikalar, logo hikâyesi) Markdown olarak saklanır ve `<RichText>` ile basılır. CMS formatına dönüşüm Aşama 2'de ele alınacak.

### 4.3 Koleksiyonlar (ileride tablolar)

| Koleksiyon | Temel alanlar |
|---|---|
| `team-members` | name, role*, board (`yonetim`/`denetim`/`etik`), status (`asil`/`yedek`), photo, order |
| `advisory-board` | name, organization, photo, order |
| `values` | number, title*, body* |
| `policies` | group*, title*, summary*, file |
| `work-areas` | slug, title*, summary*, topics*, image |
| `publications` | type (`bilgi-notu`/`politika-notu`/`rapor`), title*, summary*, date, workArea, cover, file, featured |
| `library` | title, publisher, url |
| `stories` | slug, title*, excerpt*, body*, cover, date |
| `partners` | name, category (`kamu`/`yerel`/`is-dunyasi`/`akademi`/`sivil`/`uluslararasi`/`medya`/`fon`), logo, url |

`*` = TR/EN'li alan.

---

## 5. Ortak Yerleşim

### 5.1 Topbar

Referans: `WhatsApp Image 2026-09-20 at 10.35.33.jpeg`

```
[LOGO ▾]   HAKKIMIZDA ▾   ÇALIŞMALARIMIZ ▾   YAYINLAR ▾   HİKÂYELER   PAYDAŞLARIMIZ ▾        TR | EN   [Aramıza Katıl →]
  └ Logomuzun Hikâyesi
```

- **Logo:** Tıklayınca ana sayfaya gider. Altında, diğer menüler gibi açılan tek bir alt öğe var: **Logomuzun Hikâyesi**.
- **Menü davranışı:** Ana başlıklar (Hakkımızda, Çalışmalarımız, Yayınlar, Paydaşlarımız) ayrı bir sayfaya gitmez, tıklanınca alt menüyü açar. Masaüstünde fareyle üzerine gelince de açılır; mobilde hamburger ve akordeon. Alt menüsü olmayan Hikâyeler doğrudan sayfaya gider. `/hakkimizda` gibi ana adresler elle yazılırsa ilk alt sayfaya yönlendirilir.
- **Hakkımızda › Biz Kimiz:** Topbar görselinde yok; öneri olarak en üste eklendi, istenmezse kaldırılır (bkz. `SORULAR.md` #4).
- **Hesap simgesi:** İşlevsiz kontrol gösterilmez; Aşama 2'de giriş sistemiyle birlikte "Giriş yap" / hesap menüsü olarak eklenir.
- **Açılır paneller:** 6 ve üzeri öğeli menüler (Hakkımızda) masaüstünde iki sütun, diğerleri tek sütun. Üstte bölüm etiketi; ekran dışına taşarsa panel içeri kayar.
- **Dil seçici:** Aktif dil açık mavi zemin + kalın yazı + `aria-current`.
- **Kaydırınca:** Topbar sabit kalır ve küçülür.
- **Veri kaynağı:** `content/site/navigation.json`. İleride panelden düzenlenir.

### 5.2 Footer

PDF taslaklarındaki yapı:

- Dernek açıklaması
- Menü sütunları
- Bülten aboneliği (Aşama 1'de görsel olarak var, form Aşama 2'de çalışır)
- İletişim bilgileri
- Sosyal medya linkleri
- KVKK ve Çerez linkleri

### 5.3 Sayfa şablonu

Her alt sayfada şu sıra kullanılır: `PageHeader` (yol satırı + başlık + kısa giriş), sayfa bölümleri, varsa sayfa sonu çağrısı.
İçi henüz boş olan sayfalar da bu şablonla, "Bu sayfa hazırlanıyor" durumuyla gelir. Hiçbir menü linki 404 vermez.

---

## 6. Logo Animasyonu

Eski demodaki çalışan kod (`abea-logo.js`, `abea-intro.js`) TypeScript'e taşınır.
Geometri ve zamanlama aynen korunur.

```
src/components/logo/
├── logo-geometry.ts      # vektör geometrisi — tek kaynak (eski abea-logo.js)
├── logo-animation.ts     # prepare / animateLogo / flyTo (eski abea-intro.js)
├── AbeaLogo.tsx          # statik logo (topbar, footer)
├── LogoIntro.tsx         # açılış katmanı
└── LogoReplay.tsx        # Logomuzun Hikâyesi sayfasındaki tekrar oynatma
```

### 6.1 Site açılışı

1. Beyaz ekranın ortasında büyük logo çizilir: episantr → dalga → yaylar → kalın çubuklar → yazı.
2. Yazı söner. **Sadece sembol**, yavaşça küçülerek topbar'ın sol köşesindeki yerine kayar (FLIP tekniği). Hocanın onayı bekleniyor: bkz. `SORULAR.md` #1.
3. Topbar ve sayfa içeriği yumuşakça belirir.

Kurallar:

- Animasyon **sekme başına bir kez** oynar (`sessionStorage`): yenilemede ve sayfalar arası gezinmede tekrarlanmaz, yeni sekmede yeniden oynar. Kural tek bir ayardan değişir: `introPolicy: 'tab' | 'device' | '7days'` (şimdi `'tab'`).
- Animasyon sırasında ekrana tıklama, dokunma ya da herhangi bir tuş **animasyonu atlar**; logo doğrudan yerinde görünür.
- Adresin sonuna `?intro` eklenince animasyon her seferinde oynar (demo ve test için).
- "Hareketi azalt" tercihi açık olan kullanıcıda animasyon atlanır.
- Sayfa ilk karede sunucudan hazır gelir, animasyon sadece üstüne katman olarak biner. SEO etkilenmez.

### 6.2 Logomuzun Hikâyesi sayfası (`/logomuz`)

- **Üstte:** Animasyon sayfa içinde, büyük boyutta ve uçmadan oynar. Yanında "Tekrar oynat" butonu olur.
- **Altında:** Logonun hikâyesi. Aşama 1'de boş şablon, metin gelince `content/pages/logomuz.json`'a eklenir.

---

## 7. Mobil Uyum (baştan, her yerde)

Mobil uyum sona bırakılan bir düzeltme değildir, her bileşenin kuruluş kuralıdır.

- **Önce mobil:** Stiller telefon için yazılır, büyük ekranlar `sm:`, `md:`, `lg:`, `xl:` ile genişletilir.
- **Test genişlikleri:** 360 px (küçük Android), 390 px (iPhone), 768 px (tablet), 1024 px, 1440 px. Bunların hiçbirinde yatay kaydırma olmaz.
- **Dokunma alanı:** En az 44×44 px. Mobilde hover'a bağlı hiçbir işlev yoktur.
- **Topbar:** `lg` altında hamburger ve tam ekran akordeon menü, üstünde yatay menü ve açılır alt menüler.
- **Açılış animasyonu:** Logo boyutu hem ekran genişliğine hem yüksekliğine göre sınırlanır; yatay tutulan telefonda kırpılmaz. Hedef, mobil topbar'daki sembol.
- **Yazı boyutları:** `clamp()` ile ekran genişliğine göre akışkan.
- **Görseller:** `next/image` ile cihaza uygun boyutta ve tembel yüklenir (lazy loading).
- **Yatay telefon ve kısa pencere** (`max-height`) durumları ayrıca kontrol edilir.

---

## 8. Temiz Kod Prensipleri

- **Bir dosya, bir iş:** `page.tsx` ince kalır: veriyi ister, bölümleri dizer. Asıl arayüz `components/sections/<sayfa>/` altındadır.
- **İsimlendirme:**
  - URL ve klasörler: Türkçe kebab-case (`danisma-kurulumuz`)
  - Bileşenler: İngilizce PascalCase (`AdvisoryBoardGrid.tsx`)
  - Fonksiyonlar: camelCase (`getTeamMembers`)
- **Sunucu bileşeni varsayılandır.** `'use client'` sadece etkileşim gereken yerde kullanılır: menü, animasyon, dil seçici.
- **Tekrar yok:** Aynı arayüz ikinci kez yazılacaksa `components/ui/`'ye çıkarılır.
- **Sihirli değer yok:** Renkler, boşluklar ve kırılım noktaları tema değişkenlerinde durur. `#28ADE5` kodda doğrudan yazılmaz.
- **Erişilebilirlik:**
  - Anlamlı HTML etiketleri
  - Klavyeyle gezilebilen menü
  - Görsellerde `alt` metni
  - Kontrast kuralı: `#28ADE5` (turkuaz) metin rengi olarak kullanılmaz; metin `ink`, koyu lacivert butonların üstünde beyaz
- **Yorumlar "neden"i anlatır, "ne"yi değil.**

### Tasarım değişkenleri (eski demodan)

| Değişken | Değer | Kullanım |
|---|---|---|
| `brand` | `#28ADE5` | Logonun turkuazı — vurgu çizgileri, dekor. Metin rengi olarak kullanılmaz |
| `primary` | `#123B5D` | Koyu lacivert — birincil butonlar (Çalışmalarımızı Keşfet…). Üstüne beyaz yazı (~11:1) |
| `cta` | `#F4B740` | Kehribar — YALNIZCA ana dönüşüm eylemi (Aramıza Katıl). Genel vurgu rengi değildir. Üstüne `ink` yazı (~8:1) |
| `ink` | `#0E2A38` | Gövde metni ve linkler |
| `muted` | `#5B7787` | İkincil metin |
| `bg-soft` | `#F3FAFD` | Açık bölüm zemini |
| `line` | `#DCEBF3` | Ayraç, kenarlık |

---

## 9. Yol Haritası

### Adım 1 — İskelet + Ana sayfa (ilk hedef)

1. Next.js + TS + Tailwind + next-intl kurulumu, klasör yapısı, tema değişkenleri, fontlar
2. Veri katmanı ve `navigation.json`
3. **Topbar:** tüm menüler ve alt menüler, logo altında "Logomuzun Hikâyesi", dil seçici, mobil menü
4. **Footer**
5. **Logo animasyonunun taşınması:** açılış → küçülerek sol köşeye oturma
6. **Ana sayfa:** ilk sürüm
7. **Menüdeki tüm sayfalar:** `PageHeader` ile boş şablon. Tüm linkler çalışır, TR/EN.
8. **`/logomuz` sayfası:** animasyon + altında boş hikâye alanı
9. Vercel'e önizleme yayını

### Adım 2 — İçerikli sayfalar

Sırasıyla:

- Hakkımızda altı: Ekibimiz, Danışma Kurulu, Değerlerimiz, Politika Belgeleri. İçerikleri `WEB.docx`'te hazır.
- Yayınlar, Paydaşlar, Üyelik & Gönüllülük. PDF taslakları hazır.
- Çalışmalarımız, Hikâyeler, Yolculuğumuz, Tüzük (metin bekleniyor)

### Adım 3 — Cilalama

- SEO: metadata, sitemap, Open Graph görselleri
- Performans (Lighthouse)
- Erişilebilirlik testi
- Son içerik kontrolü → **teslim**

### Adım 4 — Panel (Aşama 2)

- CMS / arka uç kararı
- Veritabanı
- Auth: giriş, üye ol, roller
- `src/lib/content/` kaynağını değiştirme
- Formların çalışır hâle gelmesi
