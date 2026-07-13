import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// ┌───────────────────────────────────────────────────────────────────────────┐
// │  BACKEND CONNECTION                                                          │
// │                                                                            │
// │  This app talks to a Supabase project. Set the two values below.           │
// │  Preferred: create a `.env` file in the project root (see .env.example):    │
// │     VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co                       │
// │     VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-public-key...             │
// │                                                                            │
// │  Or, for quick testing, paste them into the FALLBACK_* constants below.     │
// │  Use the **anon / public** key (Supabase → Project Settings → API).         │
// │  ⚠️  Never use the service_role key in this client — it's a public web/app  │
// │      bundle and the key would be exposed.                                   │
// └───────────────────────────────────────────────────────────────────────────┘
const FALLBACK_SUPABASE_URL = '';
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = '';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? FALLBACK_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? FALLBACK_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_PUBLISHABLE_KEY.length > 0;

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY. ' +
      'Set them in a .env file (see .env.example) or in src/integrations/supabase/client.ts. ' +
      'Data requests will fail until they are provided.',
  );
}

// Guard against createClient() throwing at import time (which would white-screen
// the whole app) when the env vars are absent — e.g. in a build where they were
// not injected. Fall back to a harmless placeholder so the UI still renders and
// network calls fail softly instead of crashing on launch.
const url = SUPABASE_URL || 'https://placeholder.supabase.co';
const key = SUPABASE_PUBLISHABLE_KEY || 'public-anon-key-not-set';

export const supabase = createClient<Database>(url, key, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
