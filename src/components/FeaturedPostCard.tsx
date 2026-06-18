import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import { PostMeta } from '@/types/post';

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '10px', overflow: 'hidden' }}>
        <Link href={`/posts/${post.slug}`} className="featured-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="featured-inner" style={{ display: 'flex', minHeight: '240px' }}>
            {/* 썸네일 */}
            <div className="featured-thumb" style={{ width: '48%', flexShrink: 0, position: 'relative' }}>
              {post.thumbnail ? (
                <Image
                  src={`${bp}${post.thumbnail}`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 48vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'var(--color-input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                  ♪
                </div>
              )}
            </div>

            {/* 텍스트 */}
            <div style={{ flex: 1, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', borderLeft: '1px solid var(--color-border)' }}>
              <div style={{ alignSelf: 'flex-start' }}>
                <CategoryBadge category={post.category} />
              </div>
              <h2 style={{ fontFamily: 'Pretendard, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, margin: 0, lineHeight: 1.4, color: 'var(--color-text)', letterSpacing: '-0.04em' }}>
                {post.title}
              </h2>
              {post.subtitle && (
                <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '1.05rem', color: 'var(--color-text-sub)', margin: 0, lineHeight: 1.55, letterSpacing: '-0.02em' }}>
                  {post.subtitle}
                </p>
              )}
              <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '0.85rem', color: 'var(--color-text-hint)', margin: 0, letterSpacing: '-0.01em' }}>
                {post.date}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        .featured-card:hover { background: var(--color-hover) !important; }
        @media (max-width: 600px) {
          .featured-inner { flex-direction: column !important; min-height: unset !important; }
          .featured-thumb { width: 100% !important; height: 180px; position: relative !important; }
        }
      `}</style>
    </>
  );
}
