import { v2 as cloudinary } from 'cloudinary';

// F-06 FIX: CLOUDINARY_API_KEY no longer uses NEXT_PUBLIC_ prefix.
// It is only used server-side and must never be shipped in the browser bundle.
// In your Cloudflare Pages dashboard, set the variable as CLOUDINARY_API_KEY (not NEXT_PUBLIC_).
// In .env.local: rename NEXT_PUBLIC_CLOUDINARY_API_KEY → CLOUDINARY_API_KEY.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
