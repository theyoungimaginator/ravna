import { z } from 'zod';
import { cookies } from 'next/headers';
import { TeamDataWithMembers, User } from '@/lib/db/types';
import { getTeamForUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    try {
      // Get the session token from cookies
      const cookieStore = await cookies();
      const token = cookieStore.get('sb-access-token')?.value;
      
      if (!token) {
        throw new Error('User is not authenticated');
      }

      // Create a Supabase client with the session token
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseWithAuth = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      );

      // Get user from the authenticated client
      const { data: { user }, error: userError } = await supabaseWithAuth.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User is not authenticated');
      }

      // Get user data from database
      const { data: users, error: dbError } = await supabaseWithAuth
        .from('users')
        .select('*')
        .eq('id', user.id)
        .is('deleted_at', null)
        .limit(1);

      if (dbError || !users || users.length === 0) {
        throw new Error('User is not authenticated');
      }

      const userData = users[0];

      const result = schema.safeParse(Object.fromEntries(formData));
      if (!result.success) {
        return { error: result.error.errors[0].message };
      }

      return action(result.data, formData, userData);
    } catch (error) {
      console.error('Error in validatedActionWithUser:', error);
      throw new Error('User is not authenticated');
    }
  };
}

type ActionWithTeamFunction<T> = (
  formData: FormData,
  team: TeamDataWithMembers
) => Promise<T>;

export function withTeam<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    try {
      // Get the session token from cookies
      const cookieStore = await cookies();
      const token = cookieStore.get('sb-access-token')?.value;
      
      if (!token) {
        redirect('/sign-in');
      }

      // Create a Supabase client with the session token
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseWithAuth = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      );

      // Get user from the authenticated client
      const { data: { user }, error: userError } = await supabaseWithAuth.auth.getUser();
      
      if (userError || !user) {
        redirect('/sign-in');
      }

      const team = await getTeamForUser();
      if (!team) {
        throw new Error('Team not found');
      }

      return action(formData, team);
    } catch (error) {
      console.error('Error in withTeam:', error);
      redirect('/sign-in');
    }
  };
} 