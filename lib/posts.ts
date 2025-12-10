import { slugify, getReadingTime, formatDate } from './utils';

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

// Static posts data - will work immediately!
const staticPostsData = [
  {
    slug: 'welcome-to-unsaid-thoughts',
    title: 'Welcome to Unsaid Thoughts',
    date: '2024-01-15',
    tags: ['meta', 'introduction', 'digital'],
    excerpt: 'The beginning of a space for thoughts that usually remain unspoken.',
    content: `# Welcome to Unsaid Thoughts\n\nWelcome. This is a space for thoughts that linger in the back of the mind—the ones that feel too heavy, too trivial, or too strange to share elsewhere.\n\n## Why This Exists\n\nSometimes thoughts need to exist somewhere, even if no one reads them. The act of writing them down gives them form, releases them from circling endlessly in your head.\n\n## What to Expect\n\n- Thoughts on existence and the human condition\n- Digital life in the modern world\n- Quiet observations about everything and nothing\n- Raw, unfiltered reflections\n\n## The Aesthetic\n\nDark. Minimal. Quiet. No flashy elements, no distractions. Just words on a dark canvas.\n\n---\n\n*This space will grow organically. No schedule, no pressure. Just thoughts when they come.*`,
    published: true,
    draft: false,
  },
  {
    slug: 'digital-ghosts',
    title: 'Digital Ghosts',
    date: '2024-01-16',
    tags: ['technology', 'existence', 'memory'],
    excerpt: 'On the traces we leave in digital spaces and how they haunt us.',
    content: `# Digital Ghosts\n\nWe're all leaving digital ghosts everywhere. Every message sent, every post liked, every search typed—they linger in servers long after we've forgotten them.\n\n## The Persistence of Data\n\nUnlike memories that fade, digital data persists. It doesn't decay naturally. It waits in cold storage, ready to be resurrected by an algorithm or a forgotten backup.\n\n## Ghosts of Past Selves\n\nThe person you were five years ago still exists online. Their opinions, their tastes, their awkward phase—all preserved perfectly. We're haunted by our own digital artifacts.\n\n## The Weight of Accumulation\n\nEvery day we add more to this digital graveyard. More photos, more messages, more records of our existence. It accumulates silently in the background.\n\n## Can Ghosts Be Exorcised?\n\nDeletion feels permanent, but is it? Cached copies, archives, backups—our digital selves are harder to kill than we think. Perhaps the only way is to make peace with these ghosts.\n\n---\n\n*Maybe the digital afterlife isn't something that comes after we die, but something we're building every day we're alive.*`,
    published: true,
    draft: false,
  }
];

export function getAllPosts(includeDrafts = false): Post[] {
  return staticPostsData
    .map(post => ({
      ...post,
      readingTime: getReadingTime(post.content)
    }))
    .filter(post => includeDrafts || (!post.draft && post.published))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const post = staticPostsData.find(p => p.slug === slug);
  if (!post) return null;
  
  return {
    ...post,
    readingTime: getReadingTime(post.content)
  };
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

export function getPostSlugs(): string[] {
  return staticPostsData.map(post => post.slug);
}
