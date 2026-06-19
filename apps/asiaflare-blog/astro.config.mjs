import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.asiaflare.com',
  integrations: [sitemap()],
  output: 'static',
});
