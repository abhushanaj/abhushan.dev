/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from 'astro:content';

import { seoMetaDataSchema } from './seo-meta';

const recreatesToSchema = z.object({
	title: z.string(),
	isDone: z.boolean().default(false)
});

export const recreatesSchema = z.object({
	seoMetaData: seoMetaDataSchema,
	title: z.string(),
	publishedDate: z.date(),
	todos: z.array(recreatesToSchema).optional().default([])
});
