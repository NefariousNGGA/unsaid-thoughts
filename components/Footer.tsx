import { Github, Heart, Coffee } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background-primary">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="/rss.xml"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              RSS
            </a>
            <a
              href="/sitemap.xml"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Sitemap
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-text-secondary text-xs">
            This is a space for thoughts that don't fit anywhere else.
            No algorithms, no engagement metrics, just words.
          </p>
        </div>
      </div>
    </footer>
  );
}