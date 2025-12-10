'use client';

import Link from 'next/link';
import { Menu, Search, Home } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background-primary/95 backdrop-blur-sm">
      <div className={cn("flex items-center justify-between py-4", "max-w-4xl mx-auto px-4")}>
        {/* Logo - Same on all devices */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="p-2 rounded-lg bg-background-card border border-border group-hover:border-accent-hover transition-colors">
            <Home size={20} className="text-text-secondary group-hover:text-text-primary transition-colors" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-px h-6 bg-border" />
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile search button */}
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('openSearch'))}
            className="p-2 rounded-lg border border-border hover:border-accent-hover transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-border hover:border-accent-hover transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background-primary animate-in slide-in-from-top-5">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="text-xs text-text-secondary mb-2">Search thoughts</div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.dispatchEvent(new CustomEvent('openSearch'));
                  }}
                  className="w-full btn justify-center"
                >
                  <Search size={18} />
                  <span>Open Search</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Global search (works on mobile too) */}
      <SearchBar />
    </header>
  );
}