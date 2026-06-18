import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'stack.qq',
  description: '음악, 도서, 영화, 드라마에 관한 평론과 감상',
  icons: { icon: '/icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div
          style={{
            maxWidth: '860px',
            margin: '32px auto',
            background: 'var(--color-surface)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 16px 48px rgba(0,0,0,0.08)',
            border: '0.5px solid var(--color-border-strong)',
          }}
        >
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
