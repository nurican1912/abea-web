import { redirect } from '@/i18n/navigation';
import { resolveLocale } from '@/i18n/locale';
import { getFirstChildPath } from '@/lib/content';

// Menü başlığı: kendi sayfası yok, ilk alt sayfaya yönlenir (sıra: navigation.json).
export default async function PartnersPage({ params }: PageProps<'/[locale]/paydaslarimiz'>) {
  const locale = await resolveLocale(params);
  redirect({ href: await getFirstChildPath('/paydaslarimiz'), locale });
}
