import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import { PostMeta } from '@/types/post';

export default function PostListItem({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="list-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        padding: '18px 20px',
        textDecoration: 'none',
        color: 'var(--color-text)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background 0.12s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
        <CategoryBadge category={post.category} />
        <div style={{ minWidth: 0, display: 'flex', alignItems: 'baseline', gap: '8px', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '1rem', fontWeight: 500, flexShrink: 0, color: 'var(--color-text)', letterSpacing: '-0.03em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: post.subtitle ? '55%' : '100%' }}>
            {post.title}
          </span>
          {post.subtitle && (
            <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '0.88rem', color: 'var(--color-text-sub)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.02em' }}>
              {post.subtitle}
            </span>
          )}
        </div>
      </div>
      <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '0.82rem', color: 'var(--color-text-hint)', flexShrink: 0, letterSpacing: '-0.01em' }}>
        {post.date}
      </span>

      <style>{`
        .list-item:hover { background: var(--color-hover) !important; }
      `}</style>
    </Link>
  );
}
