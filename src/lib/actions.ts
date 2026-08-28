'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

async function checkAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    // F-09 FIX: Log internal detail server-side only; never expose to client.
    console.error('[checkAuth] Auth error:', error?.message || 'No user found');
    throw new Error('Unauthorized');
  }
  return supabase;
}

// F-08 FIX: Was incorrectly writing logs to the 'links' table, which also holds
// real social/portfolio links. The log rotation (keep latest 10) was deleting real links.
// Now writes to a dedicated 'activity_log' table. Run this SQL in Supabase:
//   CREATE TABLE public.activity_log (
//     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//     action text NOT NULL,
//     icon text DEFAULT 'info',
//     created_at timestamptz DEFAULT now() NOT NULL
//   );
//   ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "Admin read" ON public.activity_log FOR SELECT USING (auth.role() = 'authenticated');
//   CREATE POLICY "Admin write" ON public.activity_log FOR INSERT USING (auth.role() = 'authenticated');
//   CREATE POLICY "Admin delete" ON public.activity_log FOR DELETE USING (auth.role() = 'authenticated');
async function logActivity(supabase: any, actionText: string, icon: string = 'info') {
  try {
    const { error } = await supabase.from('activity_log').insert({
      action: actionText,
      icon: icon
    });
    if (error) {
      console.error('[logActivity] Insert error:', error);
      return;
    }

    // Keep only the most recent 10 activity log entries.
    const { data: logs } = await supabase
      .from('activity_log')
      .select('id')
      .order('created_at', { ascending: false });

    if (logs && logs.length > 10) {
      const idsToDelete = logs.slice(10).map((l: any) => l.id);
      await supabase.from('activity_log').delete().in('id', idsToDelete);
    }
  } catch (err) {
    console.error('[logActivity] Error:', err);
  }
}

export async function addProject(formData: FormData) {
  const supabase = await checkAuth();
  
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const cover_image = formData.get('cover_image') as string;
  const aspect_ratio = (formData.get('aspect_ratio') as string) || '1:1';
  const client_name = formData.get('client_name') as string;

  const { error } = await supabase.from('projects').insert({
    title,
    category,
    slug,
    description,
    content,
    cover_image,
    aspect_ratio,
    client_name
  });

  if (error) {
    if (error.message.includes('schema cache') || error.message.includes('column') || error.code === 'PGRST204') {
      throw new Error('Database column "client_name" is missing. Please run this SQL in your Supabase Dashboard: ALTER TABLE public.projects ADD COLUMN client_name text;');
    }
    throw new Error(error.message);
  }
  await logActivity(supabase, `Added project: ${title}`, 'folder_copy');
  
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

export async function updateProject(formData: FormData) {
  const supabase = await checkAuth();
  
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const cover_image = formData.get('cover_image') as string;
  const aspect_ratio = (formData.get('aspect_ratio') as string) || '1:1';
  const client_name = formData.get('client_name') as string;

  const { error } = await supabase.from('projects').update({
    title,
    category,
    slug,
    description,
    cover_image,
    aspect_ratio,
    client_name
  }).eq('id', id);

  if (error) {
    if (error.message.includes('schema cache') || error.message.includes('column') || error.code === 'PGRST204') {
      throw new Error('Database column "client_name" is missing. Please run this SQL in your Supabase Dashboard: ALTER TABLE public.projects ADD COLUMN client_name text;');
    }
    throw new Error(error.message);
  }
  await logActivity(supabase, `Updated project: ${title}`, 'edit_document');

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

export async function deleteProject(id: string) {
  const supabase = await checkAuth();
  
  // Get title for logging
  const { data: proj } = await supabase.from('projects').select('title').eq('id', id).single();
  const title = proj?.title || 'Unknown Project';

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await logActivity(supabase, `Removed project: ${title}`, 'delete');

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

export async function addService(formData: FormData) {
  const supabase = await checkAuth();
  
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const card_color = (formData.get('card_color') as string) || 'bg-white';
  const text_color = (formData.get('text_color') as string) || 'text-brand-black';

  const { error } = await supabase.from('services').insert({
    title,
    description,
    icon,
    card_color,
    text_color
  });

  if (error) throw new Error(error.message);
  await logActivity(supabase, `Added service: ${title}`, 'build');

  revalidatePath('/');
  revalidatePath('/admin/services');
}

export async function updateService(formData: FormData) {
  const supabase = await checkAuth();
  
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const card_color = (formData.get('card_color') as string) || 'bg-white';
  const text_color = (formData.get('text_color') as string) || 'text-brand-black';

  const { error } = await supabase.from('services').update({
    title,
    description,
    icon,
    card_color,
    text_color
  }).eq('id', id);

  if (error) throw new Error(error.message);
  await logActivity(supabase, `Updated service: ${title}`, 'edit_document');

  revalidatePath('/');
  revalidatePath('/admin/services');
}

export async function deleteService(id: string) {
  const supabase = await checkAuth();
  
  // Get title for logging
  const { data: s } = await supabase.from('services').select('title').eq('id', id).single();
  const title = s?.title || 'Unknown Service';

  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await logActivity(supabase, `Removed service: ${title}`, 'delete');

  revalidatePath('/');
  revalidatePath('/admin/services');
}

export async function addTestimonial(formData: FormData) {
  const supabase = await checkAuth();
  
  const author_name = formData.get('author_name') as string;
  const content = formData.get('content') as string;
  const author_image = formData.get('author_image') as string;

  const { error } = await supabase.from('testimonials').insert({
    author_name,
    content,
    author_image
  });

  if (error) throw new Error(error.message);
  await logActivity(supabase, `Added journal entry: ${author_name}`, 'book_4');

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

export async function updateTestimonial(formData: FormData) {
  const supabase = await checkAuth();
  
  const id = formData.get('id') as string;
  const author_name = formData.get('author_name') as string;
  const content = formData.get('content') as string;
  const author_image = formData.get('author_image') as string;

  const { error } = await supabase.from('testimonials').update({
    author_name,
    content,
    author_image
  }).eq('id', id);

  if (error) throw new Error(error.message);
  await logActivity(supabase, `Updated journal entry: ${author_name}`, 'edit_document');

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  const supabase = await checkAuth();

  // Get author_name for logging
  const { data: t } = await supabase.from('testimonials').select('author_name').eq('id', id).single();
  const author = t?.author_name || 'Unknown Entry';

  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await logActivity(supabase, `Removed journal entry: ${author}`, 'delete');

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

export async function addCredential(formData: FormData) {
  const supabase = await checkAuth();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const date = formData.get('date') as string;
  const type = formData.get('type') as string;
  const url = formData.get('url') as string | null;
  const image_url = formData.get('image_url') as string | null;

  const { error } = await supabase.from('credentials').insert({ title, description, date, type, url: url || null, image_url: image_url || null });
  if (error) throw new Error(error.message);
  await logActivity(supabase, `Added credential: ${title}`, 'verified');

  revalidatePath('/admin/credentials');
  revalidatePath('/about');
}

export async function updateCredential(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const date = formData.get('date') as string;
  const type = formData.get('type') as string;
  const url = formData.get('url') as string | null;
  const image_url = formData.get('image_url') as string | null;

  const { error } = await supabase.from('credentials').update({ title, description, date, type, url: url || null, image_url: image_url || null }).eq('id', id);
  if (error) throw new Error(error.message);
  await logActivity(supabase, `Updated credential: ${title}`, 'edit_document');

  revalidatePath('/admin/credentials');
  revalidatePath('/about');
}

export async function deleteCredential(id: string) {
  const supabase = await checkAuth();

  // Get title for logging
  const { data: c } = await supabase.from('credentials').select('title').eq('id', id).single();
  const title = c?.title || 'Unknown Credential';

  const { error } = await supabase.from('credentials').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await logActivity(supabase, `Removed credential: ${title}`, 'delete');

  revalidatePath('/admin/credentials');
}

export async function addLink(formData: FormData) {
  const supabase = await checkAuth();

  const title = formData.get('title') as string;
  const icon = formData.get('platform') as string; // Maps to platform in UI
  const url = formData.get('url') as string;

  const { error } = await supabase.from('links').insert({
    title,
    icon,
    url
  });

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/links');
}

export async function updateLink(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const icon = formData.get('platform') as string;
  const url = formData.get('url') as string;

  const { error } = await supabase.from('links').update({
    title,
    icon,
    url
  }).eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/links');
}

export async function deleteLink(id: string) {
  const supabase = await checkAuth();
  const { error } = await supabase.from('links').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/links');
}

export async function updateProfile(formData: FormData) {
  const supabase = await checkAuth();
  
  const display_name = formData.get('display_name') as string;
  const email = formData.get('email') as string;
  const bio = formData.get('bio') as string;
  const tagline = formData.get('tagline') as string;
  const availability_status = formData.get('availability_status') as string;
  const avatar = formData.get('avatar') as string;
  const hero_image = formData.get('hero_image') as string;
  const about_image = formData.get('about_image') as string;
  const marquee = formData.get('marquee') as string;
  const instagram_url = formData.get('instagram_url') as string;
  const linkedin_url = formData.get('linkedin_url') as string;
  const resume_url = formData.get('resume_url') as string;

  const about_description = formData.get('about_description') as string;
  const currently = formData.get('currently') as string;
  const college = formData.get('college') as string;
  const school = formData.get('school') as string;
  const higher_secondary_education = formData.get('higher_secondary_education') as string;
  const born_in = formData.get('born_in') as string;
  const currently_based_in = formData.get('currently_based_in') as string;

  // Get existing profile id if any
  const { data: existing } = await supabase.from('profile').select('id').limit(1).single();

  const profileData = {
    display_name,
    email,
    bio,
    tagline,
    availability_status,
    avatar,
    hero_image,
    about_image,
    marquee,
    instagram_url,
    linkedin_url,
    resume_url,
    about_description,
    currently,
    college,
    school,
    currently_based_in,
    born_in,
    higher_secondary_education
  };

  if (existing?.id) {
    const { error } = await supabase.from('profile').update(profileData).eq('id', existing.id);
    if (error) {
      if (error.message.includes('schema cache') || error.message.includes('column') || error.code === 'PGRST204') {
        throw new Error('Database column "email" is missing. Please run this SQL in your Supabase Dashboard: ALTER TABLE public.profile ADD COLUMN email text;');
      }
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from('profile').insert(profileData);
    if (error) {
      if (error.message.includes('schema cache') || error.message.includes('column') || error.code === 'PGRST204') {
        throw new Error('Database column "email" is missing. Please run this SQL in your Supabase Dashboard: ALTER TABLE public.profile ADD COLUMN email text;');
      }
      throw new Error(error.message);
    }
  }
  
  await logActivity(supabase, `Edited bio & profile`, 'person');

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/profile');
}

export async function updateAvailability(status: string) {
  const supabase = await checkAuth();
  const { data: existing } = await supabase.from('profile').select('id').limit(1).single();
  
  if (existing?.id) {
    const { error } = await supabase.from('profile').update({
      availability_status: status
    }).eq('id', existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('profile').insert({
      availability_status: status
    });
    if (error) throw new Error(error.message);
  }

  await logActivity(supabase, `Updated availability to ${status === 'working' ? 'Unavailable' : 'Open for Work'}`, 'work');

  revalidatePath('/');
  revalidatePath('/admin');
}
