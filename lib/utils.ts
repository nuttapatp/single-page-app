/**
 * Helper to build a URL with search parameters
 */
export const buildQueryUrl = (pathname: string, searchParams: string, tag: string | null) => {
  const params = new URLSearchParams(searchParams);
  if (tag) {
    params.set('tag', tag);
  } else {
    params.delete('tag');
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
};

/**
 * Delay function for simulating network latency
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
