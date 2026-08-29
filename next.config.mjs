/** @type {import('next').NextConfig} */
const nextConfig = {
  // F-05 FIX: Removed ignoreBuildErrors and ignoreDuringBuilds.
  // TypeScript and ESLint errors now correctly fail the build, preventing
  // silent security regressions from shipping to production.

  // F-03 FIX: Security headers applied to every response.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking: disallows embedding this site in any iframe.
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME-sniffing: browsers must respect declared Content-Type.
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Force HTTPS for 2 years and include subdomains.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Limit referrer data sent to third parties.
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Disable access to sensitive browser APIs not needed by this app.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content Security Policy.
          // Allows: self, Cloudinary images, Google/Fontshare fonts,
          // Material Symbols (Google), and Supabase for auth cookies.
          // 'unsafe-inline' for styles is required by Tailwind + Next.js.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
              "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com",
              "img-src 'self' https://res.cloudinary.com https://lh3.googleusercontent.com data: blob:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
