'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getSearchSuggestions } from '@/lib/search';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  useEffect(() => {
    if (query.trim().length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const suggestions = getSearchSuggestions(query);
        setSuggestions(suggestions);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Keyboard shortcuts
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

  // Mobile open event listener
  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    document.addEventListener('openSearch', handleOpenSearch);
    
    return () => {
      document.removeEventListener('openSearch', handleOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
        <span className="text-text-secondary">Search thoughts...</span>
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
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search through unsaid thoughts..."
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
          
          {/* Search suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background-card border border-border rounded-lg shadow-xl z-10">
              <div className="p-2">
                <div className="text-xs text-text-secondary px-3 py-2">Suggestions</div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-background-secondary rounded text-sm flex items-center gap-2"
                  >
                    <SearchIcon size={14} className="text-text-secondary" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center text-sm text-text-secondary">
            <span>Press ESC to close • Enter to search</span>
            <button
              type="submit"
              className="btn px-6"
              disabled={!query.trim()}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
