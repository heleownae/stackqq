import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import { PostMeta } from '@/types/post';

const placeholderStyles: Record<PostMeta['category'], { bg: string; text: string }> = {
  음악: { bg: '#111111', text: '♪' },
  도서: { bg: '#18181B', text: '冊' },
  영화: { bg: '#27272A', text: '▶' },
  드라마: { bg: '#3F3F46', text: '□' },
};

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function FeaturedPostCard({ post }: { post: PostMeta }) {
  const placeholder = placeholderStyles[post.category];

  return (
    <>
      <Link
        href={`/posts/${post.slug}`}
        className="featured-card"
        style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderRadius: '8px', overflow: 'hidden' }}
      >
        <div className="featured-inner" style={{ display: 'flex', backgroundColor: 'var(--color-surface)' }}>
          {/* 썸네일 */}
          <div className="featured-thumb" style={{ width: '50%', flexShrink: 0 }}>
            <div style={{ paddingBottom: '66.667%', position: 'relative', overflow: 'hidden' }}>
              {post.thumbnail ? (
                <Image
                  src={`${bp}${post.thumbnail}`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
            ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: placeholder.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: '#A1A1AA',
                  }}
                >
                  {placeholder.text}
                </div>
              )}
            </div>
          </div>

          {/* 콘텐츠 */}
          <div
            style={{
              flex: 1,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <CategoryBadge category={post.category} />
            <h2
              style={{
                fontFamily: 'JoseonBoldMyongjo, serif',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.9rem)',
                letterSpacing: '-0.03em',
                fontWeight: 'normal',
                margin: 0,
                lineHeight: 1.4,
                color: 'var(--color-text)',
              }}
            >
              {post.title}
            </h2>
            {post.subtitle && (
              <p
                style={{
                  fontFamily: 'JoseonGulim, sans-serif',
                  fontSize: '0.875rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-sub)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {post.subtitle}
              </p>
            )}
            <p
              style={{
                fontFamily: 'JoseonGulim, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--color-text-sub)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {post.date}
            </p>
          </div>
        </div>
      </Link>

      <style>{`
        .featured-card {
          border-left: 4px solid transparent;
          transition: border-left-color 0.15s ease;
        }
        .featured-card:hover {
          border-left-color: #E8FF00;
        }
        @media (max-width: 640px) {
          .featured-inner {
            flex-direction: column !important;
          }
          .featured-thumb {
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
