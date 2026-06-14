'use client';

import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useRef } from 'react';
import { LayoutGrid, Music, BookOpen, Film, Tv } from 'lucide-react';
import FeaturedPostCard from '@/components/FeaturedPostCard';
import PostListItem from '@/components/PostListItem';
import SearchBar from '@/components/SearchBar';
import CategoryBadge from '@/components/CategoryBadge';
import { PostMeta } from '@/types/post';

const CAT_ICONS: Record<string, React.ReactNode> = {
  전체: <LayoutGrid size={19} strokeWidth={1.75} />,
  음악: <Music size={19} strokeWidth={1.75} />,
  도서: <BookOpen size={19} strokeWidth={1.75} />,
  영화: <Film size={19} strokeWidth={1.75} />,
  드라마: <Tv size={19} strokeWidth={1.75} />,
};

const CATEGORIES: PostMeta['category'][] = ['음악', '도서', '영화', '드라마'];
const ALL_CATS = [null, ...CATEGORIES] as (PostMeta['category'] | null)[];
const ITEMS_PER_PAGE = 5;

interface Props {
  posts: PostMeta[];
}

export default function PostListClient({ posts }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get('category') as PostMeta['category'] | null;
  const activeTagsParam = searchParams.get('tag') ?? '';
  const activeTags = activeTagsParam ? activeTagsParam.split(',').filter(Boolean) : [];
  const activeSearch = searchParams.get('search') ?? '';
  const activePage = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));

  // 카테고리·태그 전환 애니메이션 추적
  const prevCatRef = useRef<PostMeta['category'] | null>(activeCategory);
  const prevTagRef = useRef<string>(activeTagsParam);
  const animClassRef = useRef<'swipe-left' | 'swipe-right' | 'blur-fade'>('swipe-left');

  const catChanged = prevCatRef.current !== activeCategory;
  const tagChanged = prevTagRef.current !== activeTagsParam;

  if (catChanged) {
    const prevIdx = ALL_CATS.indexOf(prevCatRef.current);
    const currIdx = ALL_CATS.indexOf(activeCategory);
    animClassRef.current = currIdx >= prevIdx ? 'swipe-left' : 'swipe-right';
    prevCatRef.current = activeCategory;
    prevTagRef.current = activeTagsParam;
  } else if (tagChanged) {
    animClassRef.current = 'blur-fade';
    prevTagRef.current = activeTagsParam;
  }

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function handleCategoryClick(cat: PostMeta['category'] | null) {
    const nextCatTags = cat
      ? Array.from(new Set(posts.filter(p => p.category === cat).flatMap(p => p.tags)))
      : null;
    const validTags = nextCatTags
      ? activeTags.filter(t => nextCatTags.includes(t))
      : activeTags;
    updateParams({ category: cat, tag: validTags.length > 0 ? validTags.join(',') : null, page: null });
  }

  function handleTagClick(tag: string) {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    updateParams({ tag: newTags.length > 0 ? newTags.join(',') : null, page: null });
  }

  function handleSearch(query: string) {
    updateParams({ search: query || null, page: null });
  }

  function handlePageChange(page: number) {
    updateParams({ page: page === 1 ? null : String(page) });
  }

  const visibleTags = activeCategory
    ? Array.from(new Set(posts.filter(p => p.category === activeCategory).flatMap(p => p.tags))).sort()
    : Array.from(new Set(posts.flatMap(p => p.tags))).sort();

  const q = activeSearch.toLowerCase().trim();
  const filtered = posts.filter((post) => {
    const catOk = !activeCategory || post.category === activeCategory;
    const tagOk = activeTags.length === 0 || activeTags.some(t => post.tags.includes(t));
    const searchOk = !q ||
      post.title.toLowerCase().includes(q) ||
      (post.subtitle ?? '').toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return catOk && tagOk && searchOk;
  });

  const featuredPost = filtered.length > 0 ? filtered[0] : null;
  const restPosts = filtered.slice(1);
  const totalPages = Math.ceil(restPosts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(activePage, Math.max(1, totalPages));
  const paginatedPosts = restPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      {/* Search Bar */}
      <div style={{ padding: '16px 24px' }}>
        <SearchBar query={activeSearch} onSearch={handleSearch} />
      </div>

      {/* Category Tab Bar */}
      <div style={{ display: 'flex', padding: '0 24px', gap: '4px', marginTop: '8px' }}>
        <button
          onClick={() => handleCategoryClick(null)}
          title="전체"
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeCategory === null ? '2px solid var(--color-accent)' : '2px solid transparent',
            padding: '14px 16px',
            cursor: 'pointer',
            color: activeCategory === null ? 'var(--color-text)' : 'var(--color-text-sub)',
            transition: 'border-color 0.15s ease, color 0.15s ease',
            marginBottom: '-1px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {CAT_ICONS['전체']}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            title={cat}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeCategory === cat ? '2px solid var(--color-accent)' : '2px solid transparent',
              padding: '14px 16px',
              cursor: 'pointer',
              color: activeCategory === cat ? 'var(--color-text)' : 'var(--color-text-sub)',
              transition: 'border-color 0.15s ease, color 0.15s ease',
              marginBottom: '-1px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {CAT_ICONS[cat]}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      {visibleTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '18px 24px' }}>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag-btn${activeTags.includes(tag) ? ' tag-btn--active' : ''}`}
              style={{
                background: activeTags.includes(tag) ? 'var(--color-accent)' : 'transparent',
                color: activeTags.includes(tag) ? 'var(--color-accent-text)' : 'var(--color-text-sub)',
                border: `1px solid ${activeTags.includes(tag) ? 'var(--color-accent)' : 'var(--color-border)'}`,
                padding: '2px 10px',
                fontSize: '0.75rem',
                fontFamily: 'JoseonGulim, sans-serif',
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post Card Area */}
      <div key={`${String(activeCategory)}-${activeTagsParam}`} className={animClassRef.current}>
      {filtered.length === 0 ? (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
            color: 'var(--color-text-sub)',
            fontFamily: 'JoseonGulim, sans-serif',
            fontSize: '0.9rem',
          }}
        >
          뭐든 일단 써 볼게요!
        </div>
      ) : activeCategory ? (
        /* 카테고리 선택 시: 매거진형 리스트 */
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              margin: '24px 24px 0',
              background: 'var(--color-border)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {[featuredPost!, ...paginatedPosts].map((post) => (
              <MagazinePostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* 최신 글 피처드 카드 */}
          <div style={{ margin: '24px 24px 0' }}>
            <FeaturedPostCard post={featuredPost!} />
          </div>

          {/* 나머지 글 목록 */}
          {paginatedPosts.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1px',
                margin: '16px 24px 0',
                background: 'var(--color-border)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {paginatedPosts.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                margin: '24px 24px 0',
              }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 10px',
                  cursor: currentPage === 1 ? 'default' : 'pointer',
                  fontFamily: 'JoseonGulim, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '-0.02em',
                  color: currentPage === 1 ? 'var(--color-border)' : 'var(--color-text-sub)',
                }}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    background: page === currentPage ? 'var(--color-accent)' : 'none',
                    border: 'none',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    fontFamily: 'JoseonGulim, sans-serif',
                    fontSize: '0.8rem',
                    letterSpacing: '-0.02em',
                    color: page === currentPage ? 'var(--color-accent-text)' : 'var(--color-text-sub)',
                    minWidth: '32px',
                    textAlign: 'center',
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 10px',
                  cursor: currentPage === totalPages ? 'default' : 'pointer',
                  fontFamily: 'JoseonGulim, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '-0.02em',
                  color: currentPage === totalPages ? 'var(--color-border)' : 'var(--color-text-sub)',
                }}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
      </div>

      <style>{`
        .tag-btn:not(.tag-btn--active):hover {
          background: var(--color-accent);
          color: var(--color-accent-text);
          border-color: var(--color-accent);
        }
        .magazine-card:hover {
          border-left-color: #E8FF00;
        }
        .magazine-card:hover .magazine-title {
          color: var(--color-text) !important;
        }
      `}</style>
    </div>
  );
}

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function MagazinePostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="magazine-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: 'var(--color-surface)',
        textDecoration: 'none',
        color: 'inherit',
        borderLeft: '4px solid transparent',
        transition: 'border-left-color 0.15s ease',
      }}
    >
      {/* 썸네일 */}
      <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--color-border)' }}>
        {post.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${bp}${post.thumbnail}`}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-sub)', fontSize: '1.5rem' }}>
            ♪
          </div>
        )}
      </div>

      {/* 텍스트 */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span
          className="magazine-title"
          style={{
            fontFamily: 'JoseonBoldMyongjo, serif',
            fontSize: '1rem',
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {post.title}
        </span>
        {post.subtitle && (
          <span style={{ fontFamily: 'JoseonGulim, sans-serif', fontSize: '0.8rem', letterSpacing: '-0.02em', color: 'var(--color-text-sub)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.subtitle}
          </span>
        )}
      </div>

      {/* 날짜 */}
      <span style={{ fontFamily: 'JoseonGulim, sans-serif', fontSize: '0.75rem', letterSpacing: '-0.02em', color: 'var(--color-text-sub)', flexShrink: 0 }}>
        {post.date}
      </span>
    </Link>
  );
}
