import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, '../../../package.json'), 'utf-8'),
) as {
  scripts?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

describe('asiaflare-blog package.json', () => {
  it('lists pagefind as a devDependency', () => {
    expect(pkg.devDependencies).toBeDefined();
    expect(Object.keys(pkg.devDependencies!)).toContain('pagefind');
    expect(pkg.devDependencies!['pagefind']).toMatch(/^\^?\d+\.\d+\.\d+/);
  });

  it('has a postbuild script that runs pagefind', () => {
    expect(pkg.scripts).toBeDefined();
    expect(pkg.scripts!['postbuild']).toBe('npx pagefind --site dist');
  });
});
