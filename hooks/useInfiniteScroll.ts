import { useEffect, RefObject } from 'react';

interface UseInfiniteScrollProps {
  sentinelRef: RefObject<HTMLDivElement | null>;
  onIntersect: () => void;
  enabled: boolean;
  isLoading: boolean;
}

export function useInfiniteScroll({
  sentinelRef,
  onIntersect,
  enabled,
  isLoading
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !enabled || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelRef, onIntersect, enabled, isLoading]);
}
