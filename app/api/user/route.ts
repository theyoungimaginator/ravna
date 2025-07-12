import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;
    
    if (!token) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
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
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // TEMPORARY: Return mock user data until database is set up
    // TODO: Replace this with actual database query once tables are created
    const mockUser = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || 'User',
      role: 'member',
      created_at: '2024-01-15T08:00:00.000Z', // Static timestamp
      updated_at: '2024-01-15T10:30:00.000Z', // Static timestamp
      deleted_at: null
    };

    return Response.json(mockUser);

    // ORIGINAL CODE (commented out until database is set up):
    /*
    // Get user data from database
    const { data: users, error: dbError } = await supabaseWithAuth
      .from('users')
      .select('*')
      .eq('id', user.id)
      .is('deleted_at', null)
      .limit(1);

    if (dbError || !users || users.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(users[0]);
    */
  } catch (error) {
    console.error('Error in user API route:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
