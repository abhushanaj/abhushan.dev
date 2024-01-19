/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { defineCollection } from 'astro:content';

import { blogSchema } from '@/schemas/blog';

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema
});

export const collections = {
	blog: blogCollection
};
