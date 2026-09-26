import Link from 'next/link';

// Dil ön eki taşımayan, proxy'nin de yakalamadığı adresler için yedek 404.
export default function RootNotFound() {
  return (
    <html lang="tr">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1rem', textAlign: 'center' }}>
        <h1>404</h1>
        <p>
          <Link href="/tr">Ana sayfa</Link> · <Link href="/en">Home</Link>
        </p>
      </body>
    </html>
  );
}
