import { z } from 'zod';

const validDate = z.coerce.date().refine((d) => !isNaN(d.getTime()), {
  message: 'Invalid date value',
});

/** Zod schema for a blog post — extracted so tests can import it without astro:content. */
export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: validDate,
  updatedDate: validDate.optional(),
  author: z.string().default('AsiaFlare Team'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  heroImage: z
    .string()
    .refine(
      (v) => v.startsWith('/') || z.string().url().safeParse(v).success,
      { message: 'heroImage must be an absolute URL or an absolute path starting with /' },
    )
    .optional(),
  flag: z.string().optional(),
  location: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
