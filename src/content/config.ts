import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),                 // YYYY-MM-DD
    desc: z.string().default(''),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { posts };
