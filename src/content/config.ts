/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { defineCollection } from 'astro:content';

import { blogSchema } from '@/schemas/blog';
import { recreatesSchema } from '@/schemas/recreates';

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema
});

const recreatesCollection = defineCollection({
	type: 'content',
	schema: recreatesSchema
});

export const collections = {
	blog: blogCollection,
	recreates: recreatesCollection
};
