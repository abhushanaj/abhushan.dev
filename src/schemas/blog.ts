/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from 'astro:content';

import { seoMetaDataSchema } from './seo-meta';

export const blogSchema = z.object({
	seoMetaData: seoMetaDataSchema,
	title: z.string(),
	publishedDate: z.date(),
	inProgress: z.boolean().optional().default(false)
});
