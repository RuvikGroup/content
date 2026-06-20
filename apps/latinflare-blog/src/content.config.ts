import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Uses Astro's built-in z (zod v4) so TypeScript types resolve correctly.
// The standalone blog-schema.ts uses zod v3 and exists only for unit tests.
const validDate = z.coerce.date().refine((d) => !isNaN(d.getTime()), {
  message: 'Invalid date value',
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: validDate,
    updatedDate: validDate.optional(),
    author: z.string().default('LatinFlare Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z
      .string()
      .refine(
        (v) => v.startsWith('/') || z.string().url().safeParse(v).success,
        { message: 'heroImage must be an absolute URL or an absolute path starting with /' },
      )
      .optional(),
  }),
});

export const collections = { blog };
