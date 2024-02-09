export type SitemapUrlLocationType = {
	url: string;
	lastModified?: string;
	changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
};

/* Utility function to format for sitemap response with data */
export const formatForSitemapResponseWithData = (dataList: SitemapUrlLocationType[]) => {
	const sitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${dataList
		.map(({ url, changeFreq, lastModified, priority }) => {
			const locTag = `<loc>${url}</loc>`;
			const lasModTag = `<lastmod>${lastModified ?? new Date().toISOString()}</lastmod>`;
			const changeFreqTag = changeFreq ? `<changefreq>${changeFreq}</changefreq>` : '';
			const priorityTag = priority ? `<priority>${priority}</priority>` : '';

			return `
				<url>
					${locTag}
					${lasModTag}
					${changeFreqTag}
					${priorityTag}
				</url>
			`;
		})
		.join('')}
	</urlset>`;

	return sitemap.trim();
};

/* Utility function to send sitemap information */
export const formatDataListToSitemapUrlLocationData = <D>(
	dataList: D[],
	formatter: (data: D, index: number) => SitemapUrlLocationType
): SitemapUrlLocationType[] => dataList.map(formatter);
