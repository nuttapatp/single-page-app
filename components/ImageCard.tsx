'use client';

import Image from 'next/image';
import { GalleryImage } from '@/types/gallery';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  image: GalleryImage;
  activeTag: string | null;
  onTagClick: (tag: string) => void;
  priority?: boolean;
}

export default function ImageCard({ 
  image, 
  activeTag, 
  onTagClick, 
  priority = false 
}: ImageCardProps) {
  return (
    <article className={styles.imageCard}>
      <div className={styles.imageContainer}>
        <Image
          src={image.url}
          alt={`Gallery image ${image.id}`}
          width={image.width}
          height={image.height}
          className={styles.image}
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        
        <div className={styles.overlay}>
          <div className={styles.tagList}>
            {image.tags.map((tag) => (
              <button
                key={tag}
                className={`${styles.tag} ${activeTag === tag ? styles.activeTag : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
