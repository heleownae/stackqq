'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    function onScrollToTop() {
      cancelAnimationFrame(rafId);
      if (barRef.current) {
        barRef.current.style.transition = 'transform 0.65s ease-in-out';
        barRef.current.style.transform = 'scaleX(0)';
        setTimeout(() => {
          if (barRef.current) {
            barRef.current.style.transition = 'transform 0.1s ease-out';
          }
        }, 650);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll-to-top', onScrollToTop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll-to-top', onScrollToTop);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'var(--color-accent)',
        zIndex: 200,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none',
      }}
    />
  );
}
