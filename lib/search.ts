import Fuse from 'fuse.js';
import { Post, getAllPosts } from './posts';

let fuse: Fuse<Post> | null = null;

export function initializeSearch() {
  const posts = getAllPosts();
  
  const options = {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'content', weight: 1 },
      { name: 'tags', weight: 1.5 },
      { name: 'excerpt', weight: 1.2 },
    ],
    threshold: 0.3,
    includeScore: true,
  };

  fuse = new Fuse(posts, options);
}

export function searchPosts(query: string): Post[] {
  if (!fuse) {
    initializeSearch();
  }

  if (!query.trim()) {
    return getAllPosts();
  }

  const results = fuse!.search(query);
  return results.map(result => result.item);
}