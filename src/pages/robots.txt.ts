import type { APIRoute } from 'astro';

import { getActiveEnv } from '@/lib/env';
import { getUrlFromUri } from '@/lib/url';

type RobotsConfig = {
	siteUrl: string;
	crawlPolicies: Record<string, { disallow?: string[]; allow?: string[] }>;
	additionalSitemaps: string[];
};

const robotsConfig: Record<PossibleEnv, RobotsConfig> = {
	development: {
		siteUrl: getUrlFromUri('/'),
		crawlPolicies: {
			'*': {
				disallow: ['/']
			}
		},
		additionalSitemaps: []
	},
	preview: {
		siteUrl: getUrlFromUri('/'),
		crawlPolicies: {
			'*': {
				disallow: ['/']
			}
		},
		additionalSitemaps: []
	},
	production: {
		siteUrl: getUrlFromUri('/'),
		crawlPolicies: {},
		additionalSitemaps: ['/sitemap/blogs.xml']
	}
} as const;

const asciiArt = `
#         _     _               _                      _            
#    __ _| |__ | |__  _   _ ___| |__   __ _ _ __    __| | _____   __
#   / _\` | '_ \\| '_ \\| | | / __| '_ \\ / _\` | '_ \\  / _\` |/ _ \\ \\ / /
#  | (_| | |_) | | | | |_| \\__ \\ | | | (_| | | | || (_| |  __/\\ V / 
#   \\__,_|_.__/|_| |_|\\__,_|___/_| |_|\\__,_|_| |_|\\__,_|\\___| \\_/  
#                                                                     
`;

export const GET: APIRoute = () => {
	const env = getActiveEnv();

	const { siteUrl, additionalSitemaps, crawlPolicies } = robotsConfig[env];

	const robotsContent = [];

	// Push Crawl Policies into robots file
	if (Object.entries(crawlPolicies).length > 0) {
		Object.entries(crawlPolicies).forEach(([policy, { allow = [], disallow = [] }]) => {
			robotsContent.push(`User-agent: ${policy}`);
			if (allow.length > 0) {
				allow.forEach((allowOption) => {
					robotsContent.push(`Allow: ${allowOption}`);
				});
				robotsContent.push('\n');
			}
			if (disallow.length > 0) {
				disallow.forEach((allowOption) => {
					robotsContent.push(`Disallow: ${allowOption}`);
				});
				robotsContent.push('\n');
			}
		});
	}

	if (siteUrl) {
		// Push root sitemap to robots file
		robotsContent.push(`# Sitemaps:`);
		robotsContent.push(`Sitemap: ${siteUrl}/sitemap.xml`);

		if (additionalSitemaps.length > 0) {
			robotsContent.push(
				...additionalSitemaps.map((sitemap) => {
					const sitemapEntry = `Sitemap: ${siteUrl}${sitemap}`;
					return sitemapEntry;
				})
			);
		}
	}

	robotsContent.push(asciiArt);

	const headers = new Headers();
	headers.append('Content-Type', 'text/plain');

	return new Response(robotsContent.join('\n'), {
		headers
	});
};
