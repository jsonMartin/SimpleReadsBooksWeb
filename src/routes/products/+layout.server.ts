import type { LayoutServerLoad } from '../../../.svelte-kit/types/src/routes/terms';
import { fetchProductData } from '$lib/database/products';

// This keeps the URL private from the client. Normally we would use an ENV file / private repo for API keys,
// But this file is a read-only public URL, so this is safe to expose on Github.
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1_We5tuuuMtIETdyutjqacA7ZBNimaZymn7NNhLDC1zs/export?format=csv'

export const load = (async () => {

  const products = await fetchProductData(SPREADSHEET_URL);

  console.info("[Server-Side] Successfully fetched products from Google Sheets.")

  return {
    products
  };
}) satisfies LayoutServerLoad;
