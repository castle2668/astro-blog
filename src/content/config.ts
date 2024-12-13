import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    author: z.string(),
    image: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
}
