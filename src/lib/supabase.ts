import { createClient } from '@supabase/supabase-js';

// ============================================================
// ВАЖНО: Замени ги овие вредности со твоите Supabase credentials!
//
// 1. Оди на https://supabase.com и креирај бесплатен проект
// 2. Оди во Settings > API
// 3. Копирај го Project URL и anon/public key
// ============================================================

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);