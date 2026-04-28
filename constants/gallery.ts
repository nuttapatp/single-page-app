export const PAGE_LIMIT = 12;

export const AVAILABLE_TAGS = [
  'nature', 'city', 'tech', 'abstract', 'minimal',
  'vintage', 'modern', 'colors', 'dark', 'light',
  'portrait', 'landscape', 'architecture', 'space', 'ocean'
] as const;

export type GalleryTag = typeof AVAILABLE_TAGS[number];
