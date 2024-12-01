import { defineCollection, z,reference } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    category: z.enum(['programming', 'data-science', 'design']),
    id: z.string(),
    image: z.string(),
  })
});

export const collections = {
  'blog': blogCollection
};


