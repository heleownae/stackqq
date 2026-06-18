import { getAllPostsMeta } from '@/lib/posts';
import PostListClient from '@/components/PostListClient';
import { Suspense } from 'react';

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: '2rem',
            fontFamily: 'DungGeunMo, monospace',
            fontSize: '11px',
            color: '#444',
          }}
        >
          로딩 중...
        </div>
      }
    >
      <PostListClient posts={posts} />
    </Suspense>
  );
}
