import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import PostMetrics from '@/components/PostMetrics';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.draft) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/thoughts"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              ← All thoughts
            </Link>
          </div>

          {/* Article header */}
          <article>
            <header className="mb-12">
              <div className="flex items-center gap-4 text-text-secondary text-sm mb-6">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="tag flex items-center gap-1"
                    >
                      <Tag size={12} />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <PostMetrics slug={post.slug} />
                
                <div className="flex items-center gap-3">
                  <button
                    className="p-2 rounded-lg border border-border hover:border-accent-hover transition-colors"
                    aria-label="Bookmark"
                  >
                    <Bookmark size={18} />
                  </button>
                  <button
                    className="p-2 rounded-lg border border-border hover:border-accent-hover transition-colors"
                    aria-label="Share"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </header>

            {/* Content with sidebar */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Table of Contents Sidebar */}
              <div className="lg:col-span-1">
                <TableOfContents content={post.content} />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div 
                  className="prose prose-lg prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Post footer */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-text-secondary text-sm">
                        Thought #{post.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="btn"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        Back to top ↑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related posts could go here */}
        </div>
      </div>
    </>
  );
}