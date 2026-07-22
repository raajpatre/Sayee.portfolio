import { createClient } from '@/utils/supabase/server';

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) console.error('Error fetching projects:', error);
  return data || [];
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
  if (error) console.error('Error fetching project:', error);
  return data;
}

export async function getProjectById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) console.error('Error fetching project:', error);
  return data;
}

export async function getServices() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  if (error) console.error('Error fetching services:', error);
  return data || [];
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (error) console.error('Error fetching testimonials:', error);
  return data || [];
}

export async function getLinks() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('links').select('*').order('created_at', { ascending: false });
  if (error) console.error('Error fetching links:', error);
  return data || [];
}

export async function getProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('profile').select('*').single();
  // It's possible the profile is empty initially
  if (error && error.code !== 'PGRST116') console.error('Error fetching profile:', error);
  return data;
}

export async function getCredentials() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('credentials').select('*').order('created_at', { ascending: false });
  if (error) console.error('Error fetching credentials:', error);
  return data || [];
}

