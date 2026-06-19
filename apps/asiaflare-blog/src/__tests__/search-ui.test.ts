import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '..');

describe('Pagefind search UI integration', () => {
  it('Header.astro contains a /search/ nav link', () => {
    const content = readFileSync(
      resolve(srcDir, 'components/Header.astro'),
      'utf-8',
    );
    expect(content).toContain('/search/');
  });

  it('src/pages/search.astro exists', () => {
    expect(existsSync(resolve(srcDir, 'pages/search.astro'))).toBe(true);
  });

  it('search.astro includes pagefind-ui.css', () => {
    const content = readFileSync(
      resolve(srcDir, 'pages/search.astro'),
      'utf-8',
    );
    expect(content).toContain('pagefind-ui.css');
  });

  it('search.astro includes pagefind-ui.js with is:inline', () => {
    const content = readFileSync(
      resolve(srcDir, 'pages/search.astro'),
      'utf-8',
    );
    expect(content).toContain('pagefind-ui.js');
    expect(content).toContain('is:inline');
  });

  it('search.astro mounts PagefindUI on the #search element', () => {
    const content = readFileSync(
      resolve(srcDir, 'pages/search.astro'),
      'utf-8',
    );
    expect(content).toContain('id="search"');
    expect(content).toContain('PagefindUI');
  });

  it('BaseLayout.astro exposes a head slot for per-page assets', () => {
    const content = readFileSync(
      resolve(srcDir, 'layouts/BaseLayout.astro'),
      'utf-8',
    );
    expect(content).toContain('slot name="head"');
  });
});
