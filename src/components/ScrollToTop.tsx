'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 300); }
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
        ↑
      </button>

      <style>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 36px;
          height: 36px;
          background: var(--color-surface);
          color: var(--color-text-sub);
          border: 1px solid var(--color-border-strong);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease, background 0.15s;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .scroll-top-btn--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .scroll-top-btn:hover {
          background: #E8FF00 !important;
          color: #000 !important;
          border-color: #E8FF00 !important;
        }
      `}</style>
    </>
  );
}
