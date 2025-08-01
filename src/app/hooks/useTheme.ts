import { useEffect, useState } from 'react';

export const useTheme = () => {
  // Always start with dark mode to match server rendering
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // On hydration, check the actual DOM state
    if (typeof window !== 'undefined') {
      const actualTheme = document.documentElement.classList.contains('dark');
      setIsDarkMode(actualTheme);
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    // Only update DOM after hydration to avoid conflicts
    if (isHydrated) {
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.classList.toggle('light', !isDarkMode);
    }
  }, [isDarkMode, isHydrated]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  return { isDarkMode, toggleTheme };
};