'use server';

import { z } from 'zod';
import { supabase } from '@/lib/db/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export type AuthState = {
  error?: string;
  success?: string;
};

// ✅ SCHEMAS
const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['member', 'owner']),
});

const removeTeamMemberSchema = z.object({
  memberId: z.string().transform(val => parseInt(val, 10)),
});

const updateAccountSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

const deleteAccountSchema = z.object({
  password: z.string().min(8),
});

// ✅ SIGN IN ACTION
export const signIn = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const parsed = signInSchema.safeParse({ email, password });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { data: session, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  });

  if (error || !session.session) {
    return { error: 'Invalid email or password. Please try again.' };
  }

  // Ensure user exists in the users table
  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', session.user.id)
      .limit(1);

    if (!existingUser || existingUser.length === 0) {
      // Create user in the users table
      const { error: createError } = await supabase
        .from('users')
        .insert({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || null,
          password_hash: '', // We don't store the actual password hash in our table
          role: 'member'
        });

      if (createError) {
        console.error('Error creating user in database:', createError);
        // Continue anyway, the user can still sign in
      }
    }
  } catch (error) {
    console.error('Error checking/creating user:', error);
    // Continue anyway, the user can still sign in
  }

  // Set Supabase session cookie
  (await cookies()).set('sb-access-token', session.session.access_token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Log the sign-in activity
  try {
    // Get user's team if they have one
    const { data: teamMembers } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', session.user.id)
      .limit(1);

    const teamId = teamMembers?.[0]?.team_id || 1; // Default to team 1 if no team

    await supabase
      .from('activity_logs')
      .insert({
        team_id: teamId,
        user_id: session.user.id,
        action: 'sign_in',
        ip_address: null // We could get this from headers if needed
      });
  } catch (error) {
    console.error('Error logging activity:', error);
    // Continue anyway
  }

  redirect('/dashboard');
};

// ✅ SIGN UP ACTION
export const signUp = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const parsed = signUpSchema.safeParse({ email, password });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { data: session, error } = await supabase.auth.signUp({ 
    email, 
    password 
  });

  if (error || !session.user) {
    return { error: 'Failed to create user. Please try again.' };
  }

  // Create user in the users table
  try {
    const { error: createError } = await supabase
      .from('users')
      .insert({
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name || null,
        password_hash: '', // We don't store the actual password hash in our table
        role: 'member'
      });

    if (createError) {
      console.error('Error creating user in database:', createError);
      // Continue anyway, the user can still sign up
    } else {
      // Create a default team for the user
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: `${session.user.email}'s Team`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (!teamError && team) {
        // Add user to the team as owner
        await supabase
          .from('team_members')
          .insert({
            user_id: session.user.id,
            team_id: team.id,
            role: 'owner',
            joined_at: new Date().toISOString()
          });

        // Log the team creation activity
        await supabase
          .from('activity_logs')
          .insert({
            team_id: team.id,
            user_id: session.user.id,
            action: 'create_team',
            ip_address: null
          });
      }
    }
  } catch (error) {
    console.error('Error creating user in database:', error);
    // Continue anyway, the user can still sign up
  }

  return {
    success: `Account created successfully! Please check your email (${email}) and click the confirmation link to activate your account.`,
  };
};

// ✅ INVITE TEAM MEMBER
export const inviteTeamMember = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const email = formData.get('email')?.toString() || '';
  const role = formData.get('role')?.toString() || 'member';

  const parsed = inviteTeamMemberSchema.safeParse({ email, role });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    // Get current user and team
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Get user's team
    const { data: teamMembers } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1);

    if (!teamMembers || teamMembers.length === 0) {
      return { error: 'User is not part of a team' };
    }

    const teamId = teamMembers[0].team_id;

    // Create invitation
    const { error: inviteError } = await supabase
      .from('invitations')
      .insert({
        team_id: teamId,
        email: parsed.data.email,
        role: parsed.data.role,
        invited_by: user.id,
        status: 'pending'
      });

    if (inviteError) {
      return { error: 'Failed to create invitation' };
    }

    return { success: `Invitation sent to ${parsed.data.email}` };
  } catch (error) {
    return { error: 'Failed to invite team member' };
  }
};

// ✅ REMOVE TEAM MEMBER
export const removeTeamMember = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const memberId = formData.get('memberId')?.toString() || '';

  const parsed = removeTeamMemberSchema.safeParse({ memberId });

  if (!parsed.success) {
    return { error: 'Invalid member ID' };
  }

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Check if user is team owner
    const { data: userTeamMember } = await supabase
      .from('team_members')
      .select('role, team_id')
      .eq('user_id', user.id)
      .limit(1);

    if (!userTeamMember || userTeamMember.length === 0) {
      return { error: 'User is not part of a team' };
    }

    if (userTeamMember[0].role !== 'owner') {
      return { error: 'Only team owners can remove members' };
    }

    // Remove team member
    const { error: removeError } = await supabase
      .from('team_members')
      .delete()
      .eq('id', parsed.data.memberId)
      .eq('team_id', userTeamMember[0].team_id);

    if (removeError) {
      return { error: 'Failed to remove team member' };
    }

    return { success: 'Team member removed successfully' };
  } catch (error) {
    return { error: 'Failed to remove team member' };
  }
};

// ✅ UPDATE ACCOUNT
export const updateAccount = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const name = formData.get('name')?.toString() || '';
  const email = formData.get('email')?.toString() || '';

  const parsed = updateAccountSchema.safeParse({ name, email });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Update user data
    const updateData: any = {};
    if (parsed.data.name) updateData.name = parsed.data.name;
    if (parsed.data.email) updateData.email = parsed.data.email;

    if (Object.keys(updateData).length === 0) {
      return { error: 'No data to update' };
    }

    const { error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id);

    if (updateError) {
      return { error: 'Failed to update account' };
    }

    return { success: 'Account updated successfully' };
  } catch (error) {
    return { error: 'Failed to update account' };
  }
};

// ✅ UPDATE PASSWORD
export const updatePassword = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const currentPassword = formData.get('currentPassword')?.toString() || '';
  const newPassword = formData.get('newPassword')?.toString() || '';

  const parsed = updatePasswordSchema.safeParse({ currentPassword, newPassword });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Update password using Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: parsed.data.newPassword
    });

    if (updateError) {
      return { error: 'Failed to update password' };
    }

    return { success: 'Password updated successfully' };
  } catch (error) {
    return { error: 'Failed to update password' };
  }
};

// ✅ DELETE ACCOUNT
export const deleteAccount = async (
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const password = formData.get('password')?.toString() || '';

  const parsed = deleteAccountSchema.safeParse({ password });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Delete user from Supabase Auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);

    if (deleteError) {
      // If admin delete fails, try soft delete in database
      const { error: softDeleteError } = await supabase
        .from('users')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', user.id);

      if (softDeleteError) {
        return { error: 'Failed to delete account' };
      }
    }

    // Sign out after deletion
    await supabase.auth.signOut();
    (await cookies()).delete('sb-access-token');

    return { success: 'Account deleted successfully' };
  } catch (error) {
    return { error: 'Failed to delete account' };
  }
};

// ✅ SIGN OUT
export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
  (await cookies()).delete('sb-access-token');
  redirect('/sign-in');
};
