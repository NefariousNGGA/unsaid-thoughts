// Theme constants
export const THEME = {
  colors: {
    background: {
      primary: '#0a0a0a',
      secondary: '#111111',
      card: '#1a1a1a',
    },
    text: {
      primary: '#e5e5e5',
      secondary: '#a3a3a3',
      accent: '#737373',
    },
    border: '#262626',
    accent: {
      blue: '#3b82f6',
      hover: '#525252',
    }
  },
  fonts: {
    sans: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
    serif: "'Source Serif Pro', serif",
  },
  spacing: {
    container: 'max-w-4xl mx-auto px-4',
  }
} as const;

// Site configuration
export const SITE_CONFIG = {
  name: 'Unsaid Thoughts',
  description: 'A space for thoughts that usually go unsaid.',
  url: 'https://unsaid-thoughts.vercel.app', // Change to your domain
  author: 'You',
  postsPerPage: 10,
} as const;

// Navigation
export const NAV_LINKS = [
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'Tags', href: '/tags' },
  { name: 'Archive', href: '/archive' },
  { name: 'Search', href: '/search' },
] as const;