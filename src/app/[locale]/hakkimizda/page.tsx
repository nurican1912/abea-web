import { redirect } from '@/i18n/navigation';
import { resolveLocale } from '@/i18n/locale';
import { getFirstChildPath } from '@/lib/content';

// Menü başlığı: kendi sayfası yok, ilk alt sayfaya yönlenir (sıra: navigation.json).
export default async function AboutPage({ params }: PageProps<'/[locale]/hakkimizda'>) {
  const locale = await resolveLocale(params);
  redirect({ href: await getFirstChildPath('/hakkimizda'), locale });
}
