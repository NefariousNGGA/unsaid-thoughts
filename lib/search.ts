import Fuse from 'fuse.js';
import { Post, getAllPosts } from './posts';

let fuseInstance: Fuse<Post> | null = null;

function getFuseInstance() {
  if (!fuseInstance) {
    const posts = getAllPosts();
    const options = {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'content', weight: 1 },
        { name: 'tags', weight: 1.5 },
        { name: 'excerpt', weight: 1.2 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    };
    fuseInstance = new Fuse(posts, options);
  }
  return fuseInstance;
}

export function searchPosts(query: string): Post[] {
  if (!query.trim()) {
    return getAllPosts();
  }
  
  const fuse = getFuseInstance();
  const results = fuse.search(query);
  return results.map(result => result.item);
}

// ADD THIS FUNCTION:
export function getSearchSuggestions(query: string, limit: number = 5): string[] {
  const posts = getAllPosts();
  const suggestions = new Set<string>();
  
  // Add matching titles
  posts.forEach(post => {
    if (post.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(post.title);
    }
  });
  
  // Add matching tags
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
  });
  
  // Add matching words from excerpts
  posts.forEach(post => {
    const words = post.excerpt.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.includes(query.toLowerCase()) && word.length > 3) {
        suggestions.add(word);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, limit);
}