import { z } from 'zod';

/** Zod schema for a blog post — extracted so tests can import it without astro:content. */
export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('AsiaFlare Team'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
