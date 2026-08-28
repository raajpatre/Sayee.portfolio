'use server'

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

/**
 * Generate SHA-1 signature for Cloudinary upload using Web Crypto API
 * (compatible with Cloudflare Workers, unlike Node.js crypto).
 */
async function generateSignature(params: Record<string, string>, apiSecret: string): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  const toSign = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + apiSecret;
  const encoder = new TextEncoder();
  const data = encoder.encode(toSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  // 1. Verify user — F-09/F-16: throw generic message; never leak Supabase error details.
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error('[uploadImage] Auth error:', authError?.message);
    return { error: 'Unauthorized' };
  }

  // 2. Extract file
  const file = formData.get('file') as File;
  if (!file) return { error: 'No file provided' };

  // 3. F-02: Enforce server-side file size limit (5 MB).
  if (file.size > MAX_BYTES) {
    return { error: 'File too large. Maximum allowed size is 5 MB.' };
  }

  // 4. Read bytes and detect real MIME type from magic bytes (not file.type).
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const detectedMime = detectMimeFromBytes(new Uint8Array(arrayBuffer));

  if (!detectedMime) {
    return { error: 'Unsupported file type. Only JPEG, PNG, WebP, and GIF images are allowed.' };
  }

  // 5. Upload to Cloudinary using fetch API (compatible with Cloudflare Workers).
  //    The Cloudinary Node.js SDK uses https.request which is NOT available in Workers.
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('[uploadImage] Missing Cloudinary env vars:', { cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret });
    return { error: 'Image upload is not configured. Missing Cloudinary credentials.' };
  }

  const base64Image = `data:${detectedMime};base64,${buffer.toString('base64')}`;
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const signatureParams: Record<string, string> = {
    folder: 'portfolio',
    timestamp,
  };

  try {
    const signature = await generateSignature(signatureParams, apiSecret);

    const uploadForm = new FormData();
    uploadForm.append('file', base64Image);
    uploadForm.append('folder', 'portfolio');
    uploadForm.append('timestamp', timestamp);
    uploadForm.append('api_key', apiKey);
    uploadForm.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: uploadForm }
    );

    const result = await response.json() as any;

    if (!response.ok || result.error) {
      const msg = result?.error?.message || `Upload failed (HTTP ${response.status})`;
      console.error('[uploadImage] Cloudinary API error:', msg);
      return { error: msg };
    }

    return { url: result.secure_url };
  } catch (err: any) {
    console.error('[uploadImage] Fetch error:', err?.message);
    return { error: err?.message || 'Image upload failed unexpectedly.' };
  }
}
