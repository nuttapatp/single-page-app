import { GalleryImage } from '@/types/gallery';
import { AVAILABLE_TAGS } from '@/constants/gallery';

const SAMPLE_TAGS = AVAILABLE_TAGS;

export const generateMockImages = (count: number): GalleryImage[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    // Randomize dimensions to satisfy "different sizes" requirement
    const width = Math.floor(Math.random() * (800 - 400 + 1)) + 400;
    const height = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    
    // Randomize number of tags (1 to 5)
    const numTags = Math.floor(Math.random() * 5) + 1;
    const tags = Array.from({ length: numTags }, () => 
      SAMPLE_TAGS[Math.floor(Math.random() * SAMPLE_TAGS.length)]
    );

    // Remove duplicates
    const uniqueTags = Array.from(new Set(tags));

    return {
      id,
      url: `https://placehold.co/${width}x${height}?text=Image+${id}`,
      width,
      height,
      tags: uniqueTags,
    };
  });
};

// Singleton instance for the mock database
const MOCK_DB = generateMockImages(100);

export const getImages = (page: number, limit: number, filterTag?: string) => {
  let filtered = MOCK_DB;
  if (filterTag) {
    filtered = MOCK_DB.filter(img => img.tags.includes(filterTag));
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    hasMore: end < filtered.length
  };
};
