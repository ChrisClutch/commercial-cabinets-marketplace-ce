import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const site = JSON.parse(readFileSync(new URL('./src/config/site.json', import.meta.url), 'utf8'));

export default defineConfig({
  site: site.siteUrl,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thanks|request-update|404)$/.test(page),
    }),
  ],
});
