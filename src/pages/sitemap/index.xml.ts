// import fg from 'fast-glob';

import type { APIRoute } from 'astro';

import { formatForSitemapResponseWithData } from '@/lib/sitemap';
import { getUrlFromUri } from '@/lib/url';

export const GET: APIRoute = () => {
	const sitemap = formatForSitemapResponseWithData([
		{
			url: getUrlFromUri('/')
		},
		{
			url: getUrlFromUri('/blog')
		}
	]);

	const headers = new Headers();
	headers.append('Content-Type', 'text/xml');

	return new Response(sitemap, {
		headers
	});
};
