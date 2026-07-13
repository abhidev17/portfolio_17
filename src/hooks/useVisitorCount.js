import { useState, useEffect } from 'react';

export function useVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem('portfolio-visitors') || '0');
    const hasVisited = sessionStorage.getItem('portfolio-visited');

    if (!hasVisited) {
      const newCount = stored + 1;
      localStorage.setItem('portfolio-visitors', newCount.toString());
      sessionStorage.setItem('portfolio-visited', 'true');
      setCount(newCount);
    } else {
      setCount(stored);
    }
  }, []);

  return count;
}