'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      
      const scrollableHeight = fullHeight - windowHeight;
      const currentProgress = scrollableHeight > 0 
        ? (scrollPosition / scrollableHeight) * 100 
        : 0;
      
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
      <div 
        className="h-full bg-gradient-to-r from-accent-blue to-accent-hover transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}