import Link from 'next/link';
import { Menu, Search, Home } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background-primary/80 backdrop-blur-sm">
      <div className={cn("flex items-center justify-between py-4", "max-w-4xl mx-auto px-4")}>
        {/* Logo */}
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
          <SearchBar />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg border border-border hover:border-accent-hover transition-colors"
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}