'use client';

import { Eye, Heart, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PostMetricsProps {
  slug: string;
}

export default function PostMetrics({ slug }: PostMetricsProps) {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Load views and likes from localStorage or API
    const storedViews = localStorage.getItem(`views_${slug}`);
    const storedLikes = localStorage.getItem(`likes_${slug}`);
    const storedHasLiked = localStorage.getItem(`liked_${slug}`);

    if (storedViews) setViews(parseInt(storedViews));
    if (storedLikes) setLikes(parseInt(storedLikes));
    if (storedHasLiked) setHasLiked(true);
  }, [slug]);

  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      localStorage.setItem(`likes_${slug}`, newLikes.toString());
      localStorage.setItem(`liked_${slug}`, 'true');
    }
  };

  return (
    <div className="flex items-center gap-6 text-text-secondary text-sm">
      <div className="flex items-center gap-2">
        <Eye size={16} />
        <span>{views.toLocaleString()} views</span>
      </div>
      
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`flex items-center gap-2 transition-colors ${
          hasLiked 
            ? 'text-red-500' 
            : 'hover:text-text-primary'
        }`}
      >
        <Heart size={16} className={hasLiked ? 'fill-red-500' : ''} />
        <span>{likes.toLocaleString()} likes</span>
      </button>
      
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>Last read: Just now</span>
      </div>
    </div>
  );
}