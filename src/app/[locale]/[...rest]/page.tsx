import { notFound } from 'next/navigation';

// Tanımsız adresler dile özel 404 sayfasını (`[locale]/not-found.tsx`) göstersin.
export default function CatchAllPage() {
  notFound();
}
