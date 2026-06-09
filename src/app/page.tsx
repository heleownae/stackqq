import { getAllPostsMeta } from '@/lib/posts';
import Header from '@/components/Header';
import PostListClient from '@/components/PostListClient';
import { Suspense } from 'react';

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <>
      <Header />
      <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '0' }}>
        {/* Filter + Card List */}
        <Suspense
          fallback={
            <div
              style={{
                padding: '2rem',
                fontFamily: 'JoseonGulim, sans-serif',
                color: 'var(--color-text-sub)',
              }}
            >
              로딩 중...
            </div>
          }
        >
          <PostListClient posts={posts} />
        </Suspense>
      </main>
    </>
  );
}
