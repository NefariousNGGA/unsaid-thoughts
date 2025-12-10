import { getAllTags, getAllPosts } from '@/lib/posts';
import { Tag as TagIcon, Hash } from 'lucide-react';
import Link from 'next/link';

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();
  const totalPosts = posts.length;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <TagIcon size={24} className="text-accent-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Tags</h1>
          </div>
          <p className="text-text-secondary">
            Categories of thought. Click any tag to see related posts.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
            <span>{tags.length} unique tags</span>
            <span>•</span>
            <span>{totalPosts} total thoughts</span>
          </div>
        </div>

        {/* Tags Cloud */}
        {tags.length > 0 ? (
          <div className="card p-6">
            <div className="flex flex-wrap gap-3">
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="group relative"
                >
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background-secondary border border-border hover:border-accent-hover hover:bg-background-primary transition-all group-hover:scale-105">
                    <Hash size={14} className="text-text-secondary" />
                    <span className="font-medium">{tag}</span>
                    <span className="text-text-secondary text-sm">({count})</span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 group-hover:w-full bg-accent-blue transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="card text-center py-16">
            <TagIcon size={64} className="mx-auto mb-6 text-text-secondary opacity-50" />
            <h2 className="text-2xl font-semibold mb-3">No tags yet</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Add tags to your posts in the frontmatter to organize your thoughts.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card">
            <h3 className="text-lg font-semibold mb-3">Most Used</h3>
            {tags.slice(0, 3).map(({ tag, count }) => (
              <div key={tag} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-text-primary">{tag}</span>
                <span className="text-text-secondary">{count}</span>
              </div>
            ))}
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-3">Tag Density</h3>
            <div className="space-y-2">
              {tags.slice(0, 5).map(({ tag, count }) => {
                const percentage = (count / totalPosts) * 100;
                return (
                  <div key={tag} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{tag}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-background-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-blue rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-3">Average</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Tags per post</span>
                <span className="font-medium">
                  {(tags.reduce((acc, t) => acc + t.count, 0) / totalPosts || 0).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Untagged posts</span>
                <span className="font-medium">
                  {posts.filter(p => p.tags.length === 0).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}