// Database types for Supabase
export interface User {
  id: number;
  name: string | null;
  email: string;
  password_hash: string;
  role: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NewUser {
  name?: string | null;
  email: string;
  password_hash: string;
  role?: string;
  image_url?: string | null;
}

export interface Team {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_product_id: string | null;
  plan_name: string | null;
  subscription_status: string | null;
}

export interface NewTeam {
  name: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_product_id?: string | null;
  plan_name?: string | null;
  subscription_status?: string | null;
}

export interface TeamMember {
  id: number;
  user_id: number;
  team_id: number;
  role: string;
  joined_at: string;
}

export interface NewTeamMember {
  user_id: number;
  team_id: number;
  role: string;
}

export interface ActivityLog {
  id: number;
  team_id: number;
  user_id: number | null;
  action: string;
  timestamp: string;
  ip_address: string | null;
}

export interface NewActivityLog {
  team_id: number;
  user_id?: number | null;
  action: string;
  ip_address?: string | null;
}

export interface Invitation {
  id: number;
  team_id: number;
  email: string;
  role: string;
  invited_by: number;
  invited_at: string;
  status: string;
}

export interface NewInvitation {
  team_id: number;
  email: string;
  role: string;
  invited_by: number;
  status?: string;
}

export interface TeamDataWithMembers extends Team {
  team_members: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
}

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
} 