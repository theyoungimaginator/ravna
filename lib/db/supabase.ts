// lib/db/supabase.ts
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabase = createServerActionClient({ cookies });
