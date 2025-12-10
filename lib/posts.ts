import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { slugify } from './utils';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  published: boolean;
  draft: boolean;
  readingTime: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  published?: boolean;
  draft?: boolean;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const frontmatter = data as PostFrontmatter;
    
    // Calculate reading time (200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;

    return {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString(),
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt || '',
      content,
      published: frontmatter.published !== false,
      draft: frontmatter.draft === true,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(includeDrafts = false): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter(post => includeDrafts || (!post.draft && post.published))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => 
    post.tags.some(t => slugify(t) === slugify(tag))
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap: Record<string, number> = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      const normalizedTag = slugify(tag);
      tagMap[normalizedTag] = (tagMap[normalizedTag] || 0) + 1;
    });
  });

  return Object.entries(tagMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByYear(): Record<string, Post[]> {
  const posts = getAllPosts();
  const postsByYear: Record<string, Post[]> = {};

  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  return postsByYear;
}