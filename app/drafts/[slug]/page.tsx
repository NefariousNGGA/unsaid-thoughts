import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, Tag, EyeOff, Lock } from 'lucide-react';

interface DraftPageProps {
  params: Promise<{ slug: string }>
}

export default async function DraftPage({ params }: DraftPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Only show in development
  if (!post || !post.draft || process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Draft warning */}
        <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <EyeOff size={18} />
            <span className="font-medium">DRAFT PREVIEW</span>
          </div>
          <p className="text-yellow-600 text-sm">
            This is a draft post and is only visible in development mode.
            It will not appear in production until published.
          </p>
        </div>

        {/* Article */}
        <article>
          <header className="mb-12">
            {/* Draft badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-card border border-border mb-6">
              <Lock size={12} />
              <span className="text-xs font-medium">DRAFT</span>
            </div>

            {/* Meta info */}
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

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
              <span className="text-text-secondary ml-2 text-lg">(Draft)</span>
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag flex items-center gap-1 opacity-70"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Draft actions note */}
          <div className="card border-dashed">
            <div className="flex items-start gap-3">
              <Lock size={20} className="text-text-secondary mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Draft Actions</h3>
                <p className="text-text-secondary text-sm mb-3">
                  To publish this draft, remove <code className="px-1 py-0.5 bg-background-secondary rounded text-xs">draft: true</code> from the frontmatter or change it to <code className="px-1 py-0.5 bg-background-secondary rounded text-xs">draft: false</code>.
                </p>
                <div className="text-xs text-text-secondary space-y-1">
                  <p>File: <code>content/posts/{slug}.md</code></p>
                  <p>Current frontmatter includes: <code>draft: true</code></p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}