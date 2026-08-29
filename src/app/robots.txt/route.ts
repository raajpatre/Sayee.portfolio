import { NextResponse } from 'next/server';

export async function GET() {
  const text = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://sayee-portfolio.pages.dev/sitemap.xml
`;

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
