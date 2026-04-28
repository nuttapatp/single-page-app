export interface GalleryImage {
  id: string;
  url: string;
  width: number;
  height: number;
  tags: string[];
}

export interface ApiResponse {
  data: GalleryImage[];
  total: number;
  hasMore: boolean;
}
