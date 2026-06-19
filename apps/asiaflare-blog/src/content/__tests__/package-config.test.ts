import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

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
  });

  it('has a postbuild script that runs pagefind', () => {
    expect(pkg.scripts).toBeDefined();
    expect(pkg.scripts!['postbuild']).toBe('pagefind --site dist');
  });
});
