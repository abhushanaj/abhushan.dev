import { writeFile } from 'fs/promises';
import path from 'path';
import { globby } from 'globby';

import { generateUrlEntryForSitemap, getConfigProperties } from './utils.mjs';

const ignoreInternalPages = ['!src/pages/404.astro'];

/* Get all page paths for static root sitemap */
async function getAllPagePathForStaticRootSitemap() {
	try {
		// write a globby match pattern on pages and ignore files like 404 pages
		const pages = await globby(['src/pages/**/*.astro', ...ignoreInternalPages], {
			expandDirectories: true
		});

		const pagePaths = pages.map((page) => {
			// replace all "src/pages/" with ""
			const pathWithoutPageKeyword = page.replace(/^src\/pages\//, '');
			// replace all astro extensions with ''
			const pathWithoutExtension = pathWithoutPageKeyword.replace(/\.(astro)$/, '');
			// replace all index with '' and /index with ''
			const pathWithoutIndex = pathWithoutExtension.replace(/\/index$/, '');
			return pathWithoutIndex === 'index' ? '' : pathWithoutIndex;
		});

		// ignore dynamic routes
		return pagePaths.filter((pagePath) => !pagePath.includes('[') && !pagePath.endsWith(']') && pagePath !== '');
	} catch (err) {
		console.error(err, '❌ Error getting all static paths for root sitemap');
		return [];
	}
}

/* Generate a root sitemap that consists for static paths */
async function generateRootSitemap() {
	try {
		const configProperties = await getConfigProperties();

		if (!configProperties) {
			throw new Error('Update config to have right settings at robots-config.mjs');
		}

		const { siteUrl } = configProperties;

		const staticRoutesForRootSitemap = await getAllPagePathForStaticRootSitemap();

		const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${generateUrlEntryForSitemap(siteUrl, new Date())}
		${staticRoutesForRootSitemap
			.map((uri) => {
				const fullUrl = `${siteUrl}/${uri}`;
				return generateUrlEntryForSitemap(fullUrl, new Date());
			})
			.join('')}
		</urlset>`;

		const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');

		await writeFile(outputPath, sitemapContent);
	} catch (err) {
		console.error(err, '❌ Error generating root sitemap');
	}
}

await generateRootSitemap();
// eslint-disable-next-line no-console
console.log('✅', 'Root sitemap generated successfully!');
