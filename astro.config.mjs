import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3000
	},
	site: 'https://abhushan.dev',
	integrations: [expressiveCode(), react(), tailwind(), mdx()]
});
