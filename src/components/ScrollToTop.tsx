'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('scroll-to-top'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="맨 위로"
        className={`scroll-top-btn${visible ? ' scroll-top-btn--visible' : ''}`}
      >
        <ArrowUp size={18} strokeWidth={2} />
      </button>

      <style>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 44px;
          height: 44px;
          background: var(--color-accent);
          color: var(--color-accent-text);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease, background 0.15s ease;
          z-index: 100;
        }
        .scroll-top-btn--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .scroll-top-btn:hover {
          background: var(--color-text);
          color: var(--color-bg);
        }
      `}</style>
    </>
  );
}
