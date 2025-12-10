'use client';

import { useEffect } from 'react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Force dark theme always
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    
    // Set background color to prevent flash
    document.documentElement.style.backgroundColor = '#0a0a0a';
  }, []);

  return <>{children}</>;
}