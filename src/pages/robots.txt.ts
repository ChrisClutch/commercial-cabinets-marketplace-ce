import type { APIRoute } from 'astro';
import site from '../config/site.json';

// While previewNoindex is on (bake-off / staging), ask every crawler to stay out.
export const GET: APIRoute = () =>
  new Response(
    site.previewNoindex
      ? `User-agent: *\nDisallow: /\n`
      : `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('/sitemap-index.xml', site.siteUrl).href}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
