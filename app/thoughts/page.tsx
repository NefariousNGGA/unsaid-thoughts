import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { BookOpen, Filter } from 'lucide-react';

export default function ThoughtsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <BookOpen size={24} className="text-accent-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">All Thoughts</h1>
          </div>
          <p className="text-text-secondary">
            Every thought, unsorted and unfiltered. Chronological order, newest first.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <Filter size={14} />
              <span>{posts.length} thoughts</span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-16">
            <BookOpen size={64} className="mx-auto mb-6 text-text-secondary opacity-50" />
            <h2 className="text-2xl font-semibold mb-3">No thoughts yet</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              The silence is waiting to be broken. Write your first thought in the content/posts folder.
            </p>
          </div>
        )}

        {/* Footer note */}
        {posts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-text-secondary text-sm">
              You've reached the end. {posts.length} thoughts, and counting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}