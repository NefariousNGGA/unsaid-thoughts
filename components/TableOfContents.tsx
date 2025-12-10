'use client';

import { useEffect, useState } from 'react';
import { Hash } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      
      extractedHeadings.push({ id, text, level });
    }
    
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 card max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Contents</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`
              flex items-start gap-2 text-sm transition-colors
              ${activeId === heading.id 
                ? 'text-text-primary font-medium' 
                : 'text-text-secondary hover:text-text-primary'
              }
              ${heading.level === 3 ? 'ml-4' : ''}
              ${heading.level === 4 ? 'ml-8' : ''}
            `}
          >
            <Hash size={12} className="mt-0.5 flex-shrink-0" />
            <span className="leading-tight">{heading.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}