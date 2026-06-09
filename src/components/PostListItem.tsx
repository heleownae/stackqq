import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import { PostMeta } from '@/types/post';

export default function PostListItem({ post }: { post: PostMeta }) {
  return (
    <>
      <Link
        href={`/posts/${post.slug}`}
        className="list-item"
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '14px 16px',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <CategoryBadge category={post.category} />
            <span
              style={{
                fontFamily: 'JoseonBoldMyongjo, serif',
                fontSize: '0.975rem',
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {post.title}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'JoseonGulim, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-sub)',
              flexShrink: 0,
            }}
          >
            {post.date}
          </span>
        </div>
      </Link>

      <style>{`
        .list-item {
          border-left: 4px solid var(--color-bg);
          transition: border-left-color 0.15s ease;
        }
        .list-item:hover {
          border-left-color: #E8FF00;
        }
      `}</style>
    </>
  );
}
