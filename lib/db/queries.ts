import { supabase } from './supabase';
import { cookies } from 'next/headers';
import type { User, Team, TeamMember, ActivityLog, TeamDataWithMembers } from './types';

export async function getUser(): Promise<User | null> {
  try {
    // Get user from Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    // Get user data from database
    const { data: users, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .is('deleted_at', null)
      .limit(1);

    if (dbError || !users || users.length === 0) {
      return null;
    }

    return users[0];
  } catch (error) {
    return null;
  }
}

export async function getTeamByStripeCustomerId(customerId: string): Promise<Team | null> {
  const { data: teams, error } = await supabase
    .from('teams')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .limit(1);

  if (error || !teams || teams.length === 0) {
    return null;
  }

  return teams[0];
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripe_subscription_id: string | null;
    stripe_product_id: string | null;
    plan_name: string | null;
    subscription_status: string;
  }
): Promise<void> {
  const { error } = await supabase
    .from('teams')
    .update({
      ...subscriptionData,
      updated_at: new Date().toISOString()
    })
    .eq('id', teamId);

  if (error) {
    throw new Error(`Failed to update team subscription: ${error.message}`);
  }
}

export async function getUserWithTeam(userId: number): Promise<{ user: User; teamId: number | null } | null> {
  const { data: users, error } = await supabase
    .from('users')
    .select(`
      *,
      team_members!inner(team_id)
    `)
    .eq('id', userId)
    .limit(1);

  if (error || !users || users.length === 0) {
    return null;
  }

  const user = users[0];
  const teamId = user.team_members?.[0]?.team_id || null;

  return {
    user,
    teamId
  };
}

export async function getActivityLogs(): Promise<Array<{
  id: number;
  action: string;
  timestamp: string;
  ip_address: string | null;
  user_name: string | null;
}>> {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;
    
    if (!token) {
      console.log('No session token found in cookies');
      return []; // Return empty array instead of throwing error
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
      console.log('User authentication failed:', userError);
      return []; // Return empty array instead of throwing error
    }

    console.log('User authenticated successfully:', user.id);

    // TEMPORARY: Return mock data until database is set up
    // TODO: Replace this with actual database query once tables are created
    const mockLogs = [
      {
        id: 1,
        action: 'sign_in',
        timestamp: '2024-01-15T10:30:00.000Z', // Static timestamp
        ip_address: '192.168.1.1',
        user_name: 'User'
      },
      {
        id: 2,
        action: 'update_account',
        timestamp: '2024-01-15T09:30:00.000Z', // Static timestamp
        ip_address: '192.168.1.1',
        user_name: 'User'
      },
      {
        id: 3,
        action: 'create_team',
        timestamp: '2024-01-15T08:30:00.000Z', // Static timestamp
        ip_address: '192.168.1.1',
        user_name: 'User'
      }
    ];

    console.log('Returning mock activity logs:', mockLogs.length);

    return mockLogs;

    // ORIGINAL CODE (commented out until database is set up):
    /*
    const { data: logs, error } = await supabaseWithAuth
      .from('activity_logs')
      .select(`
        id,
        action,
        timestamp,
        ip_address,
        user_id
      `)
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching activity logs:', error);
      return []; // Return empty array instead of throwing error
    }

    console.log('Activity logs fetched:', logs?.length || 0);

    return logs?.map(log => ({
      id: log.id,
      action: log.action,
      timestamp: log.timestamp,
      ip_address: log.ip_address,
      user_name: null // We'll set this to null since we're not joining with users table
    })) || [];
    */
  } catch (error) {
    console.error('Error in getActivityLogs:', error);
    return []; // Return empty array instead of throwing error
  }
}

export async function getTeamForUser(): Promise<TeamDataWithMembers | null> {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;
    
    if (!token) {
      return null;
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
      return null;
    }

    const { data: teamMembers, error } = await supabaseWithAuth
      .from('team_members')
      .select(`
        *,
        teams!inner(
          *,
          team_members(
            *,
            users(id, name, email)
          )
        )
      `)
      .eq('user_id', user.id)
      .limit(1);

    if (error || !teamMembers || teamMembers.length === 0) {
      return null;
    }

    const teamMember = teamMembers[0];
    return teamMember.teams as TeamDataWithMembers;
  } catch (error) {
    console.error('Error in getTeamForUser:', error);
    return null;
  }
}

// Additional helper functions for common operations
export async function createUser(userData: {
  name?: string;
  email: string;
  password_hash: string;
  role?: string;
}): Promise<User> {
  const { data: user, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return user;
}

export async function createTeam(teamData: {
  name: string;
  stripe_customer_id?: string;
}): Promise<Team> {
  const { data: team, error } = await supabase
    .from('teams')
    .insert([teamData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create team: ${error.message}`);
  }

  return team;
}

export async function addTeamMember(teamMemberData: {
  user_id: number;
  team_id: number;
  role: string;
}): Promise<TeamMember> {
  const { data: teamMember, error } = await supabase
    .from('team_members')
    .insert([teamMemberData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add team member: ${error.message}`);
  }

  return teamMember;
}

export async function logActivity(activityData: {
  team_id: number;
  user_id?: number;
  action: string;
  ip_address?: string;
}): Promise<ActivityLog> {
  const { data: activity, error } = await supabase
    .from('activity_logs')
    .insert([activityData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to log activity: ${error.message}`);
  }

  return activity;
} 