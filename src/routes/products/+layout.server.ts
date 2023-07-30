import { fetchProductData } from '$lib/database/products';

// This keeps the URL private from the client. Normally we would use an ENV file / private repo for API keys,
// But this file is a read-only public URL, so this is safe to expose on Github.
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1_We5tuuuMtIETdyutjqacA7ZBNimaZymn7NNhLDC1zs/export?format=csv'
const API_CACHE_DURATION = 30 * 1000; // in seconds

type ApiCacheType = {
  products: any[];
  lastFetch: number;
}
const apiCache: ApiCacheType = {
  products: [],
  lastFetch: 0
};

export const load = (async () => {
  // Check if we have a cached version of the products, and if it's still valid.
  const NOW = Date.now();
  const remainingTime = NOW - apiCache.lastFetch;

  if (apiCache.products && (remainingTime < API_CACHE_DURATION)) {
    console.log(`Cache hit! Returning cached products (${remainingTime}ms remaining)`);
    return {
      products: apiCache.products
    };
  }

  // If no cached version available, fetch from Google Sheets and set the cache.
  apiCache.products = await fetchProductData(SPREADSHEET_URL);
  apiCache.lastFetch = NOW;

  console.info("[Server-Side] Successfully fetched products from Google Sheets.")

  return {
    products: apiCache.products
  };
});
