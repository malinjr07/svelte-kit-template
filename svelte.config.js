import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html', // SPA fallback for Firebase Hosting
			precompress: false,
			strict: false
		}),
		alias: {
			'@common': 'src/lib/components/common',
			'@core': 'src/lib/components/core',
			'@svg': 'src/lib/components/svg',
			'@shadcn': 'src/lib/components/shadcn',
			'@ui': 'src/lib/components/shadcn/ui',
			'@constants': 'src/lib/utils/constants',
			'@services': 'src/lib/utils/services',
			'@store': 'src/lib/utils/store',
			'@types': 'src/lib/utils/types',
			'@hooks': 'src/lib/utils/hooks',
			'@components': 'src/lib/components',
			'@utils': 'src/lib/utils'
		}
	}
};

export default config;
