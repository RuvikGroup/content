import { describe, it, expect } from 'vitest';
// Imports from the schema module — will fail until blog-schema.ts exists
import { blogSchema } from '../blog-schema.js';

describe('blog content collection schema', () => {
  it('rejects a post missing the title field', () => {
    const result = blogSchema.safeParse({
      description: 'A post without a title',
      pubDate: '2026-06-19',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain('title');
    }
  });

  it('accepts a valid post', () => {
    const result = blogSchema.safeParse({
      title: 'Welcome',
      description: 'Hello world',
      pubDate: '2026-06-19',
    });
    expect(result.success).toBe(true);
  });
});
