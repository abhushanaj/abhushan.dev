/* Get config properties */
export async function getConfigProperties() {
	const { default: robotsSitemapConfig } = await import('../../robots-config.mjs');
	const env = process.env['APP_EV'] || 'development';

	return robotsSitemapConfig[env];
}

/**
 *
 * @param {string} fullUrl : full url to include on the sitemap url entry
 * @param {Date} lastModified : date when the content was last modified
 * @returns {string}: the url entry on the sitemap as string
 */
export function generateUrlEntryForSitemap(fullUrl, lastModified) {
	return `<url>
			<loc>${fullUrl}</loc>
			<lastmod>${lastModified.toISOString()}</lastmod>
		</url>`;
}
