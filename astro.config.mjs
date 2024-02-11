import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3000
	},
	site: 'https://abhushan.dev',
	integrations: [react(), tailwind(), mdx()]
});
