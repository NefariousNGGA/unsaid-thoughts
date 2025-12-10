import { Github, Heart, Coffee, Rss, Map } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background-primary">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-text-secondary text-sm">
              © {currentYear} {SITE_CONFIG.name}. All thoughts unsaid.
            </p>
            <p className="text-text-secondary text-sm mt-1">
              Built with <Heart className="inline-block w-3 h-3 fill-red-500 text-red-500" /> and <Coffee className="inline-block w-3 h-3 text-amber-600" />
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/feed.xml"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
              aria-label="RSS Feed"
            >
              <Rss size={16} />
              <span className="hidden sm:inline">RSS</span>
            </a>
            <a
              href="/sitemap.xml"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
              aria-label="Sitemap"
            >
              <Map size={16} />
              <span className="hidden sm:inline">Sitemap</span>
            </a>
            <a
              href="https://github.com/NefariousNGGA/unsaid-thoughts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
              aria-label="GitHub"
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-text-secondary text-xs max-w-2xl mx-auto">
            This is a space for thoughts that don't fit anywhere else.
            No algorithms, no engagement metrics, just words. 
            All content is written to exist, not to perform.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-text-secondary">
            <span>Built with Next.js & Tailwind</span>
            <span>•</span>
            <span>Deployed on Vercel</span>
            <span>•</span>
            <span>Dark theme only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
