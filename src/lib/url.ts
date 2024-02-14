import { getActiveEnv } from './env';

export type Path = `/${string}/`;

export const getUriFromSlug = (slug: string): Path => `/${slug}/` satisfies Path;

export const getUriFromCollectionAndSlug = ({ collection, slug }: { collection: string; slug: string }): Path =>
	getUriFromSlug(`${collection}/${slug}`);

export const getUrlFromUri = (uri: `/${string}`) => {
	const env = getActiveEnv();

	const url = new URL(env === 'production' ? 'https://abhushan.dev' : 'http://localhost:3000');

	url.pathname = uri;

	if (uri === '/') {
		return `${url.origin}/`;
	}

	if (uri?.endsWith('/')) {
		return url.href;
	}

	return `${url.href}/`;
};
