import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.latinflareapp.com',
  integrations: [sitemap()],
  output: 'static',
});
