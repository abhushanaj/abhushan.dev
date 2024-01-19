/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * CHORE: Not sure how to get rid of these linter waning while using zod
 */

import { z } from 'astro:content';

export const seoMetaDataSchema = z.object({
	title: z.string(),
	description: z.string(),
	ogImage: z.string(),
	ogImageAlt: z.string(),
	robots: z.enum(['index, follow', 'noindex, follow', 'noindex, nofollow']).optional()
});

export type SeoMetaData = z.infer<typeof seoMetaDataSchema>;
