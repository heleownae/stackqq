'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  onSearch: (query: string) => void;
  query: string;
}

export default function SearchBar({ onSearch, query }: Props) {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(query);
  const composingRef = useRef(false);

  useEffect(() => {
    if (!focused) setLocalValue(query);
  }, [query, focused]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${focused ? 'var(--color-accent)' : 'var(--color-border)'}`,
        background: 'var(--color-surface)',
        outline: 'none',
        transition: 'border-color 0.15s ease',
        borderRadius: '8px',
      }}
    >
      <span
        style={{
          padding: '0 12px',
          color: 'var(--color-text-sub)',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>

      <input
        type="search"
        aria-label="글 검색"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          if (!composingRef.current) onSearch(e.target.value);
        }}
        onCompositionStart={() => { composingRef.current = true; }}
        onCompositionEnd={(e) => {
          composingRef.current = false;
          onSearch((e.target as HTMLInputElement).value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="검색어를 입력하세요"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          padding: '10px 12px',
          fontFamily: 'JoseonGulim, sans-serif',
          fontSize: '0.9375rem',
          letterSpacing: '-0.02em',
          color: 'var(--color-text)',
        }}
      />

      {localValue && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={() => { setLocalValue(''); onSearch(''); }}
          style={{
            padding: '0 12px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-sub)',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
