'use client';

import Link from 'next/link';
import { Tag } from 'lucide-react';
import { getAllTags } from '@/lib/posts';
import { cn } from '@/lib/utils';

export default function TagCloud() {
  const tags = getAllTags();
  
  if (tags.length === 0) {
    return null;
  }

  // Calculate size based on count
  const maxCount = Math.max(...tags.map(t => t.count));
  const minCount = Math.min(...tags.map(t => t.count));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Tag size={18} />
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => {
          const size = ((count - minCount) / (maxCount - minCount || 1)) * 0.8 + 0.8;
          
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className={cn(
                "tag inline-flex items-center gap-1 transition-all hover:scale-105",
                `text-[${size}rem]`
              )}
              style={{ fontSize: `${size}rem` }}
            >
              {tag}
              <span className="text-text-secondary text-xs ml-1">
                ({count})
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}