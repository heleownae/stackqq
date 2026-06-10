'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
    setTheme(initial);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'JoseonBoldMyongjo, serif',
            fontSize: '1.5rem',
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            textDecoration: 'none',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/stqq.png`} alt="" width={18} height={18} style={{ borderRadius: '4px' }} />
          stack.qq
        </Link>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'light' ? '다크모드로 전환' : '라이트모드로 전환'}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            cursor: 'pointer',
            color: 'var(--color-text)',
            fontFamily: 'JoseonGulim, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '-0.02em',
            padding: '4px 10px',
            lineHeight: 1.6,
            minWidth: '76px',
            textAlign: 'center',
            borderRadius: '4px',
          }}
        >
          {theme === 'light' ? '● DARK' : '○ LIGHT'}
        </button>
      </div>
    </header>
  );
}
