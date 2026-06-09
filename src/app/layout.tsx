import type { Metadata } from 'next';
import './globals.css';
import { themeScript } from '@/lib/theme';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'stack.qq',
  description: '음악, 도서, 영화, 드라마에 관한 평론과 감상',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunKm.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
