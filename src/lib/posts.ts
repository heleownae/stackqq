import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostMeta } from '@/types/post';

const postsDir = path.join(process.cwd(), 'posts');

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function parsePostMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : '',
    subtitle: typeof data.subtitle === 'string' ? data.subtitle : undefined,
    category: (['음악', '도서', '영화', '드라마'] as const).includes(data.category as '음악' | '도서' | '영화' | '드라마')
      ? (data.category as '음악' | '도서' | '영화' | '드라마')
      : '음악',
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    date: typeof data.date === 'string' ? data.date : '',
    thumbnail: typeof data.thumbnail === 'string' ? data.thumbnail : '',
  };
}

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const posts: PostMeta[] = filenames.map(filename => {
    const slug = getSlugFromFilename(filename);
    const fullPath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(fileContents);
    return parsePostMeta(slug, data as Record<string, unknown>);
  });

  // 날짜 내림차순 정렬 (최신 글 먼저)
  posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content: rawContent } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(rawContent);

  const contentHtml = processedContent.toString();

  return {
    ...parsePostMeta(slug, data as Record<string, unknown>),
    content: contentHtml,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(getSlugFromFilename);
}
