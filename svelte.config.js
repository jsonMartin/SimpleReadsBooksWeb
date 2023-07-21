import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		adapter: adapter({
			edge: true, // if true, will create a Netlify Edge Function rather than using standard Node-based functions
			split: false // if true, will split your app into multiple functions instead of creating a single one for the entire app. If `edge` is true, this option cannot be used
		})
	}
};

export default config;
