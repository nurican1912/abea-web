import { getTranslations } from 'next-intl/server';

import { AbeaLogo } from '@/components/logo/AbeaLogo';
import { Container } from '@/components/ui/Container';
import { eyebrow } from '@/components/ui/styles';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { getFooter, getNavigation } from '@/lib/content';
import { isNavGroup } from '@/types/content';

import { NewsletterForm } from './NewsletterForm';

const linkClass = 'text-white/75 transition-colors hover:text-white';
const headingClass = cn(eyebrow, 'text-white');

/** Site alt bilgisi — koyu lacivert zemin. Menü sütunları navigation.json'dan gelir. */
export async function Footer({ locale }: { locale: Locale }) {
  const [footer, navigation, t] = await Promise.all([
    getFooter(locale),
    getNavigation(locale),
    getTranslations({ locale, namespace: 'Footer' }),
  ]);

  // İlk iki başlık kendi sütununda; kalan menü öğeleri üçüncü sütunda alt alta.
  const [first, second, ...rest] = navigation.main;
  const columns = [[first], [second], rest];
  const socials = footer.socials.filter((social) => social.url);

  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Link href="/" className="inline-block rounded-md" aria-label={t('home')}>
            <AbeaLogo variant="full" idPrefix="abea-footer" className="h-16 w-auto text-white" />
          </Link>
          <p className="mt-5 max-w-xs text-white/75">{footer.description}</p>
        </div>

        <nav aria-label={t('siteMap')} className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
          {columns.map((items, i) => (
            <div key={i} className="space-y-8">
              {items.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className={cn(headingClass, 'hover:text-brand')}>
                    {item.label}
                  </Link>
                  {isNavGroup(item) && (
                    <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                      {item.children.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className={linkClass}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingClass}>{footer.newsletter.title}</h2>
          <p className="mt-4 text-white/75">{footer.newsletter.text}</p>
          <NewsletterForm
            label={footer.newsletter.label}
            placeholder={footer.newsletter.placeholder}
            button={footer.newsletter.button}
          />
          <address className="mt-6 space-y-1 text-[0.9375rem] text-white/75 not-italic">
            <p>{footer.contact.address}</p>
            <p>
              <a href={`mailto:${footer.contact.email}`} className={linkClass}>
                {footer.contact.email}
              </a>
              {' · '}
              {footer.contact.phone}
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-4 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('rights', { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/kvkk" className={linkClass}>
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/cerez-politikasi" className={linkClass}>
                {t('cookies')}
              </Link>
            </li>
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
