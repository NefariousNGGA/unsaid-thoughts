'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPosts } from '@/lib/search';
import { Post } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Search, Filter, X, Clock, Hash } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const startTime = performance.now();
      
      const timer = setTimeout(() => {
        const searchResults = searchPosts(query);
        const endTime = performance.now();
        
        setResults(searchResults);
        setSearchTime(endTime - startTime);
        setIsSearching(false);
      }, 150);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setSearchTime(0);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearchTime(0);
  };

  // Get all unique tags from results
  const allTags = Array.from(new Set(results.flatMap(post => post.tags)));

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Search header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <Search size={24} className="text-accent-blue" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Search</h1>
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
                className="w-full pl-12 pr-12 py-3 md:py-4 rounded-xl bg-background-card border border-border focus:border-accent-blue focus:outline-none text-text-primary text-base md:text-lg"
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
            
            {/* Search stats */}
            {query && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Filter size={14} />
                  <span>
                    {isSearching ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''}`}
                  </span>
                </div>
                {searchTime > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{searchTime.toFixed(0)}ms</span>
                  </div>
                )}
                {allTags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Hash size={14} />
                    <span>{allTags.length} tags</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          {query.trim() ? (
            <>
              {isSearching ? (
                <div className="card text-center py-12">
                  <div className="animate-pulse">
                    <Search size={48} className="mx-auto mb-4 text-text-secondary" />
                    <p className="text-text-secondary">Searching through thoughts...</p>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <>
                  {/* Tags from results */}
                  {allTags.length > 0 && (
                    <div className="mb-6 card">
                      <h3 className="text-lg font-semibold mb-3">Tags in results</h3>
                      <div className="flex flex-wrap gap-2">
                        {allTags.slice(0, 10).map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                            className="tag"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results list */}
                  <div className="grid gap-4 md:gap-6">
                    {results.map((post) => (
                      <PostCard key={post.slug} post={post} compact />
                    ))}
                  </div>
                </>
              ) : (
                <div className="card text-center py-12 md:py-16">
                  <Search size={48} className="mx-auto mb-6 text-text-secondary opacity-50" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">No thoughts found</h3>
                  <p className="text-text-secondary max-w-md mx-auto mb-6">
                    Nothing matches "{query}". Try different words or browse all thoughts.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                      href="/thoughts"
                      className="tag hover:bg-background-primary"
                    >
                      Browse all thoughts
                    </Link>
                    <button
                      onClick={() => setQuery('thought')}
                      className="tag hover:bg-background-primary"
                    >
                      thought
                    </button>
                    <button
                      onClick={() => setQuery('digital')}
                      className="tag hover:bg-background-primary"
                    >
                      digital
                    </button>
                    <button
                      onClick={() => setQuery('memory')}
                      className="tag hover:bg-background-primary"
                    >
                      memory
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="card">
              <div className="p-6 md:p-8 text-center">
                <Search size={48} className="mx-auto mb-6 text-text-secondary opacity-30" />
                <h3 className="text-xl font-semibold mb-3">Search unsaid thoughts</h3>
                <p className="text-text-secondary max-w-md mx-auto mb-6">
                  Enter a word or phrase above to search through all published thoughts.
                  The search looks through titles, content, excerpts, and tags.
                </p>
                <div className="inline-flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-text-secondary">Try:</span>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-base font-semibold">Titles</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-base font-semibold">Content</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-base font-semibold">Excerpts</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background-secondary">
                    <div className="text-base font-semibold">Tags</div>
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
