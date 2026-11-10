import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

// Only the publishable key belongs in a browser build. Never expose a
// Supabase service-role/secret key through VITE_* variables.
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        },
    })
    : null;
