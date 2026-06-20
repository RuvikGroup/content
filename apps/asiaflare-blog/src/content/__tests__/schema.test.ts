import { describe, it, expect } from 'vitest';
import { blogSchema } from '../blog-schema.js';

const validPost = {
  title: 'Welcome',
  description: 'Hello world',
  pubDate: '2026-06-19',
};

describe('blog content collection schema', () => {
  describe('required fields', () => {
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

    it('rejects a post missing the description field', () => {
      const result = blogSchema.safeParse({ title: 'No desc', pubDate: '2026-06-19' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const fields = result.error.issues.map((i) => i.path[0]);
        expect(fields).toContain('description');
      }
    });
  });

  describe('date validation', () => {
    it('rejects an invalid pubDate string', () => {
      const result = blogSchema.safeParse({ ...validPost, pubDate: 'not-a-date' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const fields = result.error.issues.map((i) => i.path[0]);
        expect(fields).toContain('pubDate');
      }
    });

    it('rejects an invalid updatedDate string', () => {
      const result = blogSchema.safeParse({ ...validPost, updatedDate: 'garbage' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const fields = result.error.issues.map((i) => i.path[0]);
        expect(fields).toContain('updatedDate');
      }
    });

    it('coerces a valid ISO date string to a Date', () => {
      const result = blogSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pubDate).toBeInstanceOf(Date);
        expect(isNaN(result.data.pubDate.getTime())).toBe(false);
      }
    });
  });

  describe('defaults', () => {
    it('defaults draft to false', () => {
      const result = blogSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.draft).toBe(false);
    });

    it('defaults tags to an empty array', () => {
      const result = blogSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.tags).toEqual([]);
    });

    it('defaults author to AsiaFlare Team', () => {
      const result = blogSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.author).toBe('AsiaFlare Team');
    });
  });

  it('accepts a fully valid post with all optional fields', () => {
    const result = blogSchema.safeParse({
      ...validPost,
      updatedDate: '2026-06-20',
      author: 'Test Author',
      tags: ['dating-tips', 'first-date'],
      draft: false,
      heroImage: 'https://example.com/image.jpg',
    });
    expect(result.success).toBe(true);
  });

  it('accepts a local-path heroImage', () => {
    const result = blogSchema.safeParse({
      ...validPost,
      heroImage: '/images/hero-dating-tips.jpg',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a relative heroImage path not starting with /', () => {
    const result = blogSchema.safeParse({
      ...validPost,
      heroImage: 'images/hero.jpg',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a non-string heroImage', () => {
    const result = blogSchema.safeParse({
      ...validPost,
      heroImage: 42,
    });
    expect(result.success).toBe(false);
  });
});
