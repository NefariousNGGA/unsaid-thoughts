'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "btn text-sm items-center gap-2",
          "hidden md:inline-flex"
        )}
        aria-label="Search"
      >
        <SearchIcon size={16} />
        <span className="text-text-secondary">Search...</span>
        <kbd className="ml-4 px-1.5 py-0.5 text-xs border border-border rounded bg-background-secondary">
          Ctrl+K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-32 px-4">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search unsaid thoughts..."
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-background-card border border-border focus:border-accent-blue focus:outline-none text-text-primary text-lg"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm text-text-secondary">
            <span>Press ESC to close</span>
            <button
              type="submit"
              className="btn px-6"
              disabled={!query.trim()}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}