import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import TagCloud from '@/components/TagCloud';
import { SITE_CONFIG } from '@/lib/constants';
import { BookOpen, Sparkles, Coffee } from 'lucide-react';

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <BookOpen size={24} className="text-accent-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Unsaid Thoughts
            </h1>
          </div>
          
          <p className="text-xl text-text-secondary mb-8 max-w-2xl">
            A digital space for thoughts that linger in the periphery—too quiet for noise, 
            too heavy for air. No algorithms, no engagement. Just words.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-text-secondary">
              <Sparkles size={16} />
              <span className="text-sm">Minimalist design</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Coffee size={16} />
              <span className="text-sm">No distractions</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <BookOpen size={16} />
              <span className="text-sm">{posts.length} thoughts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Thoughts */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Recent Thoughts</h2>
            <a 
              href="/thoughts" 
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              View all →
            </a>
          </div>
          
          {latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} compact />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <BookOpen size={48} className="mx-auto mb-4 text-text-secondary" />
              <h3 className="text-xl font-semibold mb-2">No thoughts yet</h3>
              <p className="text-text-secondary">
                The first unsaid thought is waiting to be written.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tags & Sidebar */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">About This Space</h2>
              <div className="card">
                <p className="mb-4">
                  This isn't a blog. It's not a journal. It's somewhere in between—a space for 
                  thoughts that don't fit neatly into categories or conversations.
                </p>
                <p className="mb-4">
                  Here, thoughts exist without expectation. They're not written for engagement, 
                  SEO, or social validation. They're written because they needed to exist somewhere.
                </p>
                <p className="text-text-secondary">
                  You won't find comments sections here. Some thoughts are meant to be read, 
                  not responded to. Some ideas need to sit with you quietly.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <TagCloud />
              
              <div className="card mt-6">
                <h3 className="text-lg font-semibold mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Total Thoughts</span>
                    <span className="font-medium">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tags</span>
                    <span className="font-medium">
                      {Array.from(new Set(posts.flatMap(p => p.tags))).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Words</span>
                    <span className="font-medium">
                      {posts.reduce((acc, post) => acc + post.content.split(/\s+/).length, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}