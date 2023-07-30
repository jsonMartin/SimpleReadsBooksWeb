import type { LayoutServerLoad } from './terms/$types';
import { fetchProductData } from '$lib/stores/products';

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1_We5tuuuMtIETdyutjqacA7ZBNimaZymn7NNhLDC1zs/export?format=csv'

// Can't write to store directly, because the store isn't shared between client and server.
// stores are shared between all server envronment (bad for leaking data between users)
// and the client environment is seperate with it's own memory space so users receive a blank store upon page load.
export const load = (async () => {
  // Fetch data server side, to send to layout svelte file where it will be loaded into the store.
  // This keeps the URL private from the client. Normally we would use an ENV file / private repo for API keys,
  // But this file is a read-only public URL, so this is safe to expose on Github.

  const result = await fetchProductData(SPREADSHEET_URL);
  console.info("Server load products result:", result);

  return {
    products: result
  };
}) satisfies LayoutServerLoad;