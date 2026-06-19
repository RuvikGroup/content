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

  it('BaseLayout.astro includes pagefind-ui.css in <head>', () => {
    const content = readFileSync(
      resolve(srcDir, 'layouts/BaseLayout.astro'),
      'utf-8',
    );
    expect(content).toContain('pagefind-ui.css');
  });
});
