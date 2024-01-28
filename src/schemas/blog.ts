/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * CHORE: Not sure how to get rid of these linter waning while using zod
 */

import { z } from 'astro:content';

import { seoMetaDataSchema } from './seo-meta';

export const blogSchema = z.object({
	seoMetaData: seoMetaDataSchema,
	title: z.string(),
	publishedDate: z.date(),
	inProgress: z.boolean().optional().default(false),
	type: z.enum(['series', 'standalone']).optional().default('standalone')
});
