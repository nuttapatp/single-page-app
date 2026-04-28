import { NextRequest, NextResponse } from 'next/server';
import { getImages } from '@/lib/mock-data';
import { ApiResponse } from '@/types/gallery';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const tag = searchParams.get('tag') || undefined;

  // Simulate network delay for realistic testing
  await new Promise(resolve => setTimeout(resolve, 500));

  const result = getImages(page, limit, tag);

  return NextResponse.json(result);
}
