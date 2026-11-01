import type { APIRoute } from 'astro';
import site from '../config/site.json';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('/sitemap-index.xml', site.siteUrl).href}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
