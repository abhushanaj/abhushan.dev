// import fg from 'fast-glob';

import type { APIRoute } from 'astro';

import { formatForSitemapResponseWithData } from '@/lib/sitemap';
import { getUriFromSlug, getUrlFromUri } from '@/lib/url';

export const GET: APIRoute = () => {
	const sitemap = formatForSitemapResponseWithData([
		{
			url: getUrlFromUri(getUriFromSlug())
		},
		{
			url: getUrlFromUri(getUriFromSlug('blog'))
		},
		{
			url: getUrlFromUri(getUriFromSlug('recreates'))
		}
	]);

	const headers = new Headers();
	headers.append('Content-Type', 'text/xml');

	return new Response(sitemap, {
		headers
	});
};
