import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { SITE_CONFIG } from '@/lib/constants';

export async function GET() {
  const posts = getAllPosts();
  
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <description>${SITE_CONFIG.description}</description>
    <link>${SITE_CONFIG.url}</link>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${SITE_CONFIG.url}/thoughts/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/thoughts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
