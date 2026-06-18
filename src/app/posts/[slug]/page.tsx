import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from '@/components/CategoryBadge';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import { getPostBySlug, getAllSlugs, getAllPostsMeta } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.subtitle ? `${post.title} — ${post.subtitle}` : post.title,
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPostsMeta();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* 뒤로가기 */}
        <div style={{ paddingTop: '32px', paddingBottom: '16px' }}>
          <Link
            href="/"
            className="back-link"
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '0.875rem',
              letterSpacing: '-0.03em',
              color: 'var(--color-text-sub)',
              textDecoration: 'none',
            }}
          >
            ← 목록으로
          </Link>
          <style>{`
            .back-link:hover { color: var(--color-text) !important; }
          `}</style>
        </div>

        {/* 카테고리 + 태그 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            paddingBottom: '16px',
          }}
        >
          <CategoryBadge category={post!.category} />
          {post!.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        {/* 제목 */}
        <h1
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.04em',
            fontWeight: 700,
            lineHeight: 1.3,
            margin: 0,
            color: '#111',
          }}
        >
          {post!.title}
        </h1>

        {/* 부제 */}
        {post!.subtitle && (
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              letterSpacing: '-0.03em',
              color: '#666',
              margin: '10px 0 0',
              lineHeight: 1.6,
            }}
          >
            {post!.subtitle}
          </p>
        )}

        {/* 날짜 */}
        <p
          style={{
            padding: '12px 0 28px',
            fontSize: '0.85rem',
            fontFamily: 'Pretendard, sans-serif',
            letterSpacing: '-0.02em',
            color: 'var(--color-text-hint)',
            margin: 0,
          }}
        >
          {post!.date}
        </p>

        {/* 구분선 */}
        <div
          style={{
            borderTop: '1px solid #e8e8e8',
            marginBottom: '40px',
          }}
        />

        {/* 썸네일 */}
        {post!.thumbnail && (
          <div style={{ marginBottom: '40px' }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${post!.thumbnail}`}
              alt={post!.title}
              width={1200}
              height={675}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
              sizes="800px"
              priority
            />
          </div>
        )}

        {/* 본문 */}
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: post!.content }}
          style={{ paddingBottom: '24px' }}
        />

        {/* 이전/다음 글 네비게이션 */}
        <nav
          style={{
            paddingTop: '20px',
            paddingBottom: '40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {/* 이전 글 (날짜 오래된 쪽) */}
          <div>
            {prevPost ? (
              <PostNavLink href={`/posts/${prevPost.slug}`} direction="prev" title={prevPost.title} />
            ) : (
              <div />
            )}
          </div>

          {/* 다음 글 (날짜 최신 쪽) */}
          <div style={{ textAlign: 'right' }}>
            {nextPost ? (
              <PostNavLink href={`/posts/${nextPost.slug}`} direction="next" title={nextPost.title} />
            ) : (
              <div />
            )}
          </div>
        </nav>
      </main>
    </>
  );
}

/* ── Tag Chip ── */
function TagChip({ tag }: { tag: string }) {
  return (
    <Link
      href={`/?tag=${encodeURIComponent(tag)}`}
      style={{
        display: 'inline-block',
        background: 'var(--color-input-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '20px',
        padding: '3px 10px',
        fontSize: '12px',
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: '-0.01em',
        lineHeight: 1.6,
        color: 'var(--color-text-sub)',
        textDecoration: 'none',
        transition: 'background 0.12s, color 0.12s, border-color 0.12s',
      }}
      className="tag-chip"
    >
      {tag}
      <style>{`
        .tag-chip:hover {
          background: #E8FF00 !important;
          color: #000 !important;
          border-color: #E8FF00 !important;
        }
      `}</style>
    </Link>
  );
}

/* ── Post Nav Link ── */
function PostNavLink({
  href,
  direction,
  title,
}: {
  href: string;
  direction: 'prev' | 'next';
  title: string;
}) {
  const isPrev = direction === 'prev';
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        border: '1px solid var(--color-border-strong)',
        padding: '16px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 0.15s',
        height: '100%',
        borderRadius: '8px',
      }}
      className="post-nav-link"
    >
      <span
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '0.78rem',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-hint)',
        }}
      >
        {isPrev ? '← 이전 글' : '다음 글 →'}
      </span>
      <span
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          color: 'var(--color-text)',
        }}
      >
        {title}
      </span>
      <style>{`
        .post-nav-link:hover {
          background: #fffff0 !important;
          border-color: #E8FF00 !important;
        }
      `}</style>
    </Link>
  );
}
