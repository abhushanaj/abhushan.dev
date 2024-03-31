import { getActiveEnv } from './env';

export type Uri = `/${string}/` | `/`;

export const getUriFromSlug = (slug?: string): Uri => (slug ? `/${slug}/` : `/`);

export const getUriFromCollectionAndSlug = ({
	collection,
	slug
}: {
	collection: string;
	slug?: string | undefined;
}): Uri => {
	if (slug) {
		return getUriFromSlug(`${collection}/${slug}`);
	}

	return getUriFromSlug(collection);
};

export const getUrlFromUri = (uri: Uri) => {
	const env = getActiveEnv();

	const url = new URL(env === 'production' ? 'https://abhushan.dev' : 'http://localhost:3000');

	url.pathname = uri;

	return url.href;
};

export const getSlugDepth = (slug: string) => {
	const parts = slug.split('/');
	return parts.length;
};

export const getParentSeriesSlug = (slug: string) => {
	const [parentSlug] = slug.split('/');
	return parentSlug;
};
