import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';

interface PageHeaderProps {
  title: string;
  description?: string;
  parents?: string[];
}

/** Her alt sayfanın üst bölümü: yol satırı + başlık + kısa giriş. */
export function PageHeader({ title, description, parents = [] }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-surface-soft">
      <Container className="py-10 sm:py-14 lg:py-20">
        <Breadcrumb parents={parents} current={title} />
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-semibold text-balance">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{description}</p>}
      </Container>
    </header>
  );
}
