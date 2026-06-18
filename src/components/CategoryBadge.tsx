'use client';

import { PostFrontmatter } from '@/types/post';

type Category = PostFrontmatter['category'];

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: '#E8FF00',
        border: '1px solid rgba(0,0,0,0.15)',
        color: '#000',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '-0.01em',
        padding: '3px 10px',
        borderRadius: '20px',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {category}
    </span>
  );
}
