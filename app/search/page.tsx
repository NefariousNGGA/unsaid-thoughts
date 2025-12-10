'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPosts } from '@/lib/search';
import { Post } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Search, Filter, X } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const searchResults = searchPosts(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Search header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <Search size={24} className="text-accent-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Search</h1>
          </div>
          
          {/* Search input */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search through all unsaid thoughts..."
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-background-card border border-border focus:border-accent-blue focus:outline-none text-text-primary text-lg"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            {/* Search tips */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Filter size={14} />
                <span>Searches titles, content, and tags</span>
              </div>
              <div>
                <span>Try: "loneliness", "digital", "memory"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {query.trim() ? (
            <>
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {isSearching ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
                </h2>
                {!isSearching && results.length > 0 && (
                  <button
                    onClick={clearSearch}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Clear results
                  </button>
                )}
              </div>

              {/* Results list */}
              {isSearching ? (
                <div className="card text-center py-12">
                  <div className="animate-pulse">
                    <Search size={48} className="mx-auto mb-4 text-text-secondary" />
                    <p className="text-text-secondary">Searching through thoughts...</p>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid gap-6">
                  {results.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="card text-center py-16">
                  <Search size={64} className="mx-auto mb-6 text-text-secondary opacity-50" />
                  <h3 className="text-2xl font-semibold mb-3">No thoughts found</h3>
                  <p className="text-text-secondary max-w-md mx-auto mb-6">
                    Nothing matches "{query}". Try different words or browse all thoughts.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => setQuery('thought')}
                      className="tag"
                    >
                      thought
                    </button>
                    <button
                      onClick={() => setQuery('digital')}
                      className="tag"
                    >
                      digital
                    </button>
                    <button
                      onClick={() => setQuery('existence')}
                      className="tag"
                    >
                      existence
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="card">
              <div className="p-8 text-center">
                <Search size={64} className="mx-auto mb-6 text-text-secondary opacity-30" />
                <h3 className="text-xl font-semibold mb-3">Search unsaid thoughts</h3>
                <p className="text-text-secondary max-w-md mx-auto mb-6">
                  Enter a word or phrase above to search through all published thoughts.
                  The search looks through titles, content, excerpts, and tags.
                </p>
                <div className="inline-flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-text-secondary">Try searching for:</span>
                  <button
                    onClick={() => setQuery('silence')}
                    className="tag text-sm"
                  >
                    silence
                  </button>
                  <button
                    onClick={() => setQuery('time')}
                    className="tag text-sm"
                  >
                    time
                  </button>
                  <button
                    onClick={() => setQuery('human')}
                    className="tag text-sm"
                  >
                    human
                  </button>
                  <button
                    onClick={() => setQuery('space')}
                    className="tag text-sm"
                  >
                    space
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="border-t border-border p-6">
                <h4 className="text-sm font-medium text-text-secondary mb-3">Search covers:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-lg font-semibold">Titles</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-lg font-semibold">Content</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-lg font-semibold">Excerpts</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-lg font-semibold">Tags</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}