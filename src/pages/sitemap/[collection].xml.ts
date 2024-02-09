import { getCollection } from 'astro:content';

import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionKey } from 'astro:content';

import { formatDataListToSitemapUrlLocationData, formatForSitemapResponseWithData } from '@/lib/sitemap';
import { getUriFromCollectionAndSlug, getUrlFromUri } from '@/lib/url';

type Props = Record<string, unknown>;

type Params = Record<'collection', CollectionKey>;

export const GET: APIRoute<Props, Params> = async ({ params }) => {
	const collectionName = params.collection;

	const collection = await getCollection(collectionName);

	const formmatedUrlsForSitemap = formatDataListToSitemapUrlLocationData(collection, (c) => ({
		url: getUrlFromUri(getUriFromCollectionAndSlug({ collection: c.collection, slug: c.slug }))
	}));

	const sitemap = formatForSitemapResponseWithData(formmatedUrlsForSitemap);

	const headers = new Headers();

	headers.append('Content-Type', 'text/xml');

	return new Response(sitemap, {
		headers
	});
};

export const getStaticPaths = (() => {
	const collectionsNames = ['blog'];

	return collectionsNames.map((name) => ({
		params: {
			collection: name
		}
	}));
}) satisfies GetStaticPaths;
