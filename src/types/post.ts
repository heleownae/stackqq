export interface PostFrontmatter {
  title: string;
  subtitle?: string;
  category: '음악' | '도서' | '영화' | '드라마';
  tags: string[];
  date: string; // YYYY-MM-DD
  thumbnail: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string; // HTML string (remark 변환 결과)
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}
