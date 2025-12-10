import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Tag as TagIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();
  const currentTag = allTags.find(t => t.tag === tag);

  if (!currentTag) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            All tags
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <TagIcon size={24} className="text-accent-blue" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold capitalize">
                {tag.replace(/-/g, ' ')}
              </h1>
              <p className="text-text-secondary mt-2">
                {posts.length} thought{posts.length !== 1 ? 's' : ''} tagged with "{tag}"
              </p>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-16">
            <TagIcon size={64} className="mx-auto mb-6 text-text-secondary opacity-50" />
            <h2 className="text-2xl font-semibold mb-3">No thoughts with this tag</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              This tag exists but hasn't been assigned to any published thoughts yet.
            </p>
          </div>
        )}

        {/* Related tags */}
        {posts.length > 0 && (
          <div className="mt-12 card">
            <h3 className="text-lg font-semibold mb-4">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.flatMap(p => p.tags)))
                .filter(t => slugify(t) !== tag)
                .slice(0, 10)
                .map(relatedTag => (
                  <Link
                    key={relatedTag}
                    href={`/tags/${slugify(relatedTag)}`}
                    className="tag"
                  >
                    {relatedTag}
                  </Link>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function (add to lib/utils.ts if not there)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}