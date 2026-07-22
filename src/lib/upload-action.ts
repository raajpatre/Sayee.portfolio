'use server'

import cloudinary from '@/utils/cloudinary';
import { createClient } from '@/utils/supabase/server';

// F-02: Allowed MIME types and their magic-byte signatures.
// We validate against actual file bytes, NOT the browser-supplied file.type
// (which is trivially spoofable). Only image uploads are accepted.
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'ffd8ff',
  'image/png':  '89504e47',
  'image/webp': '52494646',
  'image/gif':  '47494638',
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function detectMimeFromBytes(bytes: Uint8Array): string | null {
  const hex = Array.from(bytes.slice(0, 4))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  for (const [mime, signature] of Object.entries(ALLOWED_TYPES)) {
    if (hex.startsWith(signature)) return mime;
  }
  return null;
}

export async function uploadImage(formData: FormData) {
  // 1. Verify user — F-09/F-16: throw generic message; never leak Supabase error details.
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    // Log internally but never expose Supabase error message to the client.
    console.error('[uploadImage] Auth error:', authError?.message);
    throw new Error('Unauthorized');
  }

  // 2. Extract file
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  // 3. F-02: Enforce server-side file size limit (5 MB).
  if (file.size > MAX_BYTES) {
    throw new Error(`File too large. Maximum allowed size is 5 MB.`);
  }

  // 4. Read bytes and detect real MIME type from magic bytes (not file.type).
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const detectedMime = detectMimeFromBytes(new Uint8Array(arrayBuffer));

  if (!detectedMime) {
    throw new Error('Unsupported file type. Only JPEG, PNG, WebP, and GIF images are allowed.');
  }

  // 5. Upload to Cloudinary using verified MIME type and restrict to images only.
  const base64Image = `data:${detectedMime};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: 'portfolio',
    resource_type: 'image', // F-02: was 'auto' — now locked to images only
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  });

  return result.secure_url;
}
