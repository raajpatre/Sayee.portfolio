import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'sayeelovesicecream@admin.com',
    password: 'lifeisgoodandiloveit',
  });

  if (error) {
    console.error('Error creating admin:', error);
  } else {
    console.log('Admin user created successfully:', data.user?.email);
    console.log('NOTE: If email confirmations are enabled in Supabase, the user will need to confirm the email. Or you can disable it in the dashboard.');
  }
}

createAdmin();
