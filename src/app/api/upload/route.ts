import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

async function generateSignature(params: Record<string, string>, apiSecret: string): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  const toSign = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + apiSecret;
  const encoder = new TextEncoder();
  const data = encoder.encode(toSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large. Maximum allowed size is 5 MB.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const detectedMime = detectMimeFromBytes(new Uint8Array(arrayBuffer));

    if (!detectedMime) {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Missing Cloudinary credentials.' }, { status: 500 });
    }

    const base64Image = `data:${detectedMime};base64,${buffer.toString('base64')}`;
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const signatureParams: Record<string, string> = {
      folder: 'portfolio',
      timestamp,
    };

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
      return NextResponse.json({ error: msg }, { status: response.status || 500 });
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (err: any) {
    console.error('[API Upload Error]', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
