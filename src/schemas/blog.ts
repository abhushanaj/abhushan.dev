/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * CHORE: Not sure how to get rid of these linter waning while using zod
 */

import { reference, z } from 'astro:content';

import { seoMetaDataSchema } from './seo-meta';

const blogMeta = z.discriminatedUnion('type', [
	z.object({ type: z.literal('series'), relatedBlogs: z.array(reference('blog')) }),
	z.object({ type: z.literal('series-part'), seriesParentSlug: reference('blog') }),
	z.object({ type: z.literal('standalone') })
]);

export const blogSchema = z.object({
	seoMetaData: seoMetaDataSchema,
	title: z.string(),
	publishedDate: z.date(),
	inProgress: z.boolean().optional().default(false),
	blogMeta
});
