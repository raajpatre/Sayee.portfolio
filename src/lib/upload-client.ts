export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Upload failed' };
    }

    return { url: data.url };
  } catch (err: any) {
    return { error: err?.message || 'Network error during upload' };
  }
}
