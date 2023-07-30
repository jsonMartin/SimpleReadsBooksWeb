import type { LayoutServerLoad } from './terms/$types';
import { fetchProductData } from '$lib/stores/products';

export const load = (async () => {
  // Fetch data server side, to send to layout svelte file where it will be loaded into the store.
  // This keeps the URL private from the client. Normally we would use an ENV file / private repo for API keys,
  // But this file is a read-only public URL, so this is safe to expose on Github.
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1_We5tuuuMtIETdyutjqacA7ZBNimaZymn7NNhLDC1zs/export?format=csv'

  const result = await fetchProductData(SPREADSHEET_URL);
  console.info("Server load products result:", result);

  return {
    products: result
  };
}) satisfies LayoutServerLoad;