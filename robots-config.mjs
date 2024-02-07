/**
 * Configuration object for robots.txt settings based on different environments.
 *
 * @typedef {Object} Config
 * @property {string} siteUrl - The base URL of the website.
 * @property {Object<string, {allow?: string[], disallow: string[]}>} crawlPolicies - Policies for web crawlers.
 * @property {string[]} additionalSitemaps - Additional sitemaps to include.
 */

/**
 * Configuration object for robots.txt settings based on different environments.
 *
 * @type {Object<string, Config>}
 */
const robotsConfig = {
	development: {
		siteUrl: 'https://abhushan.dev',
		crawlPolicies: {
			'*': {
				disallow: ['/']
			}
		},
		additionalSitemaps: []
	},
	preview: {
		siteUrl: 'https://abhushan.dev',
		crawlPolicies: {
			'*': {
				disallow: ['/']
			}
		},
		additionalSitemaps: []
	},
	production: {
		siteUrl: 'https://abhushan.dev',
		crawlPolicies: {},
		additionalSitemaps: ['/sitemap/blogs.xml']
	}
};

export default robotsConfig;
