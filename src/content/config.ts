/**
 * Content Collections Configuration
 * 
 * Define content schemas for blog posts and other markdown content.
 * Astro will use this to validate and type-check content.
 */

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(100),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    author: z.string().default('Shiv Yatra Tourism'),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).optional(),
    category: z.enum([
      'Guide',
      'Travel Tips',
      'Pilgrimage',
      'Destinations',
      'Preparation',
      'Culture',
      'Photography',
      'Mythology',
    ]).default('Guide'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
    relatedPosts: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};

