'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { GalleryImage, ApiResponse } from '@/types/gallery';
import { buildQueryUrl } from '@/lib/utils';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ImageCard from './ImageCard';
import styles from './Gallery.module.css';

import { PAGE_LIMIT, AVAILABLE_TAGS } from '@/constants/gallery';

function GalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Initialize state
  const initialTag = searchParams.get('tag');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Fetch management with race-condition protection
  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_LIMIT.toString(),
        });
        if (activeTag) params.set('tag', activeTag);

        const res = await fetch(`/api/images?${params.toString()}`);
        const json: ApiResponse = await res.json();

        if (!ignore) {
          // If page 1, overwrite; otherwise, append
          setImages(prev => page === 1 ? json.data : [...prev, ...json.data]);
          setHasMore(json.hasMore);
        }
      } catch (err) {
        // Silently fail or implement a UI error state in production
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadData();
    return () => { ignore = true; };
  }, [page, activeTag]);

  // Use our custom hook for infinite scroll
  useInfiniteScroll({
    sentinelRef,
    onIntersect: () => setPage(prev => prev + 1),
    enabled: hasMore,
    isLoading: loading
  });

  // Track scroll for Back to Top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document title dynamically
  useEffect(() => {
    const baseTitle = 'Photo Gallery | Full-Stack SPA';
    document.title = activeTag 
      ? `Photos tagged #${activeTag} | ${baseTitle}` 
      : baseTitle;
  }, [activeTag]);

  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag;
    setActiveTag(newTag);
    setImages([]);
    setPage(1);
    setHasMore(true);
    router.push(buildQueryUrl(pathname, searchParams.toString(), newTag), { scroll: false });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <select 
          className={styles.dropdown}
          value={activeTag || ''}
          onChange={(e) => handleTagClick(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {AVAILABLE_TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {activeTag && (
        <div className={styles.filterBar}>
          <span>Showing: <strong>#{activeTag}</strong></span>
          <button className={styles.clearFilter} onClick={() => handleTagClick(activeTag)}>
            ✕
          </button>
        </div>
      )}

      {loading && images.length === 0 && (
        <div className={styles.grid}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}><div className={styles.skeletonShimmer} /></div>
          ))}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className={styles.emptyState}>
          <p>No results found for #{activeTag}</p>
          <button className={styles.clearFilter} onClick={() => handleTagClick(activeTag!)}>Clear search</button>
        </div>
      )}

      <div className={styles.grid}>
        {images.map((image, index) => (
          <ImageCard
            key={`${image.id}-${activeTag}`}
            image={image}
            activeTag={activeTag}
            onTagClick={handleTagClick}
            priority={index < 4}
          />
        ))}
      </div>

      <div ref={sentinelRef} className={styles.sentinel}>
        {loading && images.length > 0 && <div className="loader" />}
      </div>

      {!hasMore && images.length > 0 && (
        <p className={styles.endMessage}>— You&apos;ve reached the end —</p>
      )}

      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">↑</button>
      )}
    </div>
  );
}

export default function Gallery() {
  return (
    <Suspense fallback={<div className="loader" style={{margin: '4rem auto'}} />}>
      <GalleryContent />
    </Suspense>
  );
}
