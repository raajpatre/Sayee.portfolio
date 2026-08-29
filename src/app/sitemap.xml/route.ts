import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/api';

export async function GET() {
  const baseUrl = 'https://sayee-portfolio.pages.dev';
  
  try {
    const projects = await getProjects();
    const projectUrls = projects
      .filter((p) => p.published)
      .map((project) => `
        <url>
          <loc>${baseUrl}/projects/${project.slug}</loc>
          <lastmod>${new Date(project.created_at || new Date()).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      ${projectUrls}
    </urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;
    return new NextResponse(xml, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
