import { LogoReplay } from '@/components/logo/LogoReplay';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { Container } from '@/components/ui/Container';

interface LogoStorySectionProps {
  title: string;
  description?: string;
  /** Markdown. Boşsa "hazırlanıyor" gösterilir. */
  story: string;
  logoLabel: string;
}

/** Üstte logonun çizilme animasyonu, altında hikâyesi. */
export function LogoStorySection({ title, description, story, logoLabel }: LogoStorySectionProps) {
  return (
    <>
      <section className="border-b border-line bg-surface-soft py-12 sm:py-16 lg:py-20">
        <LogoReplay label={logoLabel} />
      </section>

      <Container className="pt-10 sm:pt-14">
        <Breadcrumb parents={[]} current={title} />
        <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-semibold text-balance">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{description}</p>}
      </Container>

      {story ? (
        // Markdown desteği (RichText bileşeni) hikâye metni geldiğinde eklenecek.
        <Container className="py-12">
          <p className="max-w-3xl whitespace-pre-line">{story}</p>
        </Container>
      ) : (
        <ComingSoon />
      )}
    </>
  );
}
