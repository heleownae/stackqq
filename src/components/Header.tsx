'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PostMeta } from '@/types/post';

const CATEGORIES: PostMeta['category'][] = ['음악', '도서', '영화', '드라마'];

/* ── fill-only 아이콘 (viewBox 0 0 20 20) ── */
const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
    <rect x="2" y="2" width="7" height="7" rx="2" fill="currentColor"/>
    <rect x="11" y="2" width="7" height="7" rx="2" fill="currentColor"/>
    <rect x="2" y="11" width="7" height="7" rx="2" fill="currentColor"/>
    <rect x="11" y="11" width="7" height="7" rx="2" fill="currentColor"/>
  </svg>
);

const IconMusic = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
    <ellipse cx="6.5" cy="15" rx="3.5" ry="2.5" fill="currentColor" transform="rotate(-15 6.5 15)"/>
    <rect x="9.5" y="4" width="2" height="11.5" rx="1" fill="currentColor"/>
    <path d="M11.5 4 Q16 5 15 9.5 L11.5 9 Z" fill="currentColor"/>
  </svg>
);

const IconBook = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" fill="currentColor" d="M10 5.8C8.3 4.4 6.1 4 3 4.4v11.4c3.1-.4 5.3 0 7 1.2 1.7-1.2 3.9-1.6 7-1.2V4.4c-3.1-.4-5.3 0-7 1.4zM9 7V16c-1.5-.7-3.2-.9-6-.7V5.3C5.8 5.1 7.5 5.4 9 7zm2 0c1.5-1.6 3.2-1.9 6-1.7v10c-2.8-.2-4.5 0-6 .7V7z"/>
  </svg>
);

const IconFilm = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" fill="currentColor" d="M3 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3zm.5 2h1v2h-1V6zm0 4h1v2h-1v-2zm13 0h-1v2h1v-2zm0-4h-1v2h1V6zM7 6h6v8H7V6z"/>
  </svg>
);

const IconTv = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" fill="currentColor" d="M2 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h7v2H7a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2h7a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm1 2h14v8H3V6z"/>
  </svg>
);

const CAT_ICONS: Record<string, React.ReactNode> = {
  전체: <IconGrid />,
  음악: <IconMusic />,
  도서: <IconBook />,
  영화: <IconFilm />,
  드라마: <IconTv />,
};

export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get('category') as PostMeta['category'] | null;
  const activeSearch = searchParams.get('search') ?? '';

  const [localValue, setLocalValue] = useState(activeSearch);
  const [focused, setFocused] = useState(false);
  const composingRef = useRef(false);

  useEffect(() => {
    if (!focused) setLocalValue(activeSearch);
  }, [activeSearch, focused]);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function handleSearch(query: string) {
    updateParams({ search: query || null, page: null });
  }

  return (
    <header
      style={{
        background: 'var(--color-titlebar-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* 로고 */}
      <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: 'var(--color-text)',
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/stqq.png`}
            alt=""
            width={15}
            height={15}
            style={{ borderRadius: '3px' }}
          />
          stack.qq
        </Link>
      </div>

      {/* 카테고리 탭 (아이콘) */}
      <div style={{ padding: '0 14px', display: 'flex', gap: '0' }}>
        {[{ label: '전체', value: null }, ...CATEGORIES.map(c => ({ label: c, value: c }))].map(({ label, value }) => {
          const isActive = value === activeCategory;
          return (
            <button
              key={label}
              onClick={() => updateParams({ category: value, page: null })}
              title={label}
              aria-label={label}
              style={{
                padding: '10px 14px',
                border: 'none',
                cursor: 'pointer',
                background: 'transparent',
                color: isActive ? '#000' : 'var(--color-text-sub)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s',
                borderRadius: isActive ? '6px 6px 0 0' : '6px',
              }}
              className={`cat-tab${isActive ? ' cat-tab--active' : ''}`}
            >
              {isActive && (
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#E8FF00',
                  borderRadius: '6px 6px 0 0',
                  zIndex: 0,
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
                {CAT_ICONS[label]}
              </span>
            </button>
          );
        })}
        <style>{`
          .cat-tab:not(.cat-tab--active):hover { color: var(--color-text) !important; background: var(--color-hover) !important; border-radius: 6px !important; }
        `}</style>
      </div>

      {/* 검색창 */}
      <div style={{ padding: '10px 20px 14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--color-input-bg)',
            borderRadius: '8px',
            padding: '8px 12px',
            border: focused ? '1px solid rgba(232,255,0,0.6)' : '1px solid transparent',
            transition: 'border-color 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-hint)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            aria-label="검색"
            value={localValue}
            onChange={(e) => {
              setLocalValue(e.target.value);
              if (!composingRef.current) handleSearch(e.target.value);
            }}
            onCompositionStart={() => { composingRef.current = true; }}
            onCompositionEnd={(e) => {
              composingRef.current = false;
              handleSearch((e.target as HTMLInputElement).value);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(localValue); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="검색어 입력..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              minWidth: 0,
            }}
          />
          {localValue && (
            <button
              type="button"
              aria-label="지우기"
              onClick={() => { setLocalValue(''); handleSearch(''); }}
              style={{
                border: 'none',
                background: 'var(--color-text-hint)',
                cursor: 'pointer',
                color: 'var(--color-surface)',
                padding: 0,
                flexShrink: 0,
                width: 14,
                height: 14,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
