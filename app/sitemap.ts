import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const posts = getAllPosts();
  
  const routes = [
    '',
    '/thoughts',
    '/tags',
    '/archive',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/thoughts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...postRoutes];
}
