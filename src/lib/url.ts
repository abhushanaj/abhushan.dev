import { getActiveEnv } from './env';

export type Uri = `/${string}/` | `/`;

export const getUriFromSlug = (slug?: string): Uri => (slug ? `/${slug}/` : `/`);

export const getUriFromCollectionAndSlug = ({ collection, slug }: { collection: string; slug: string }): Uri =>
	getUriFromSlug(`${collection}/${slug}`);

export const getUrlFromUri = (uri: Uri) => {
	const env = getActiveEnv();

	const url = new URL(env === 'production' ? 'https://abhushan.dev' : 'http://localhost:3000');

	url.pathname = uri;

	return url.href;
};
