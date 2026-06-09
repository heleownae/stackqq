'use client';

import { PostFrontmatter } from '@/types/post';

type Category = PostFrontmatter['category'];

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className="category-badge"
      data-category={category}
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        fontSize: '0.75rem',
        fontFamily: 'JoseonGulim, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 1.6,
        backgroundColor: '#E8FF00',
        color: '#18181B',
        flexShrink: 0,
      }}
    >
      {category}
      <style>{`
        [data-theme="dark"] .category-badge {
          background-color: #E8FF00 !important;
          color: #18181B !important;
        }
      `}</style>
    </span>
  );
}
