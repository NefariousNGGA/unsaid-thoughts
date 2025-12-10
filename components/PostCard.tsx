import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Post } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article className={cn(
      "card group hover:shadow-xl transition-all duration-300",
      compact && "p-4"
    )}>
      <Link href={`/thoughts/${post.slug}`} className="block">
        <div className="flex flex-col h-full">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-text-secondary text-sm mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {!compact && (
            <p className="text-text-secondary mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="tag text-xs flex items-center gap-1"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="tag text-xs">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read more indicator */}
          <div className="mt-4 pt-4 border-t border-border group-hover:border-accent-hover transition-colors">
            <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
              Read thought →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}