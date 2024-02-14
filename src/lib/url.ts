import { getActiveEnv } from './env';

export const getUriFromCollectionAndSlug = ({ collection, slug }: { collection: string; slug: string }) =>
	`/${collection}/${slug}/` as const;

export const getUrlFromUri = (uri?: `/${string}`) => {
	const env = getActiveEnv();

	const url = new URL(env === 'production' ? 'https://abhushan.dev' : 'http://localhost:3000');

	if (uri) {
		url.pathname = uri;
	}

	if (uri === '/') {
		return url.origin;
	}

	if (uri?.endsWith('/')) {
		return url.href;
	}

	return `${url.href}/`;
};
