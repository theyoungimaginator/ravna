import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;
    
    if (!token) {
      return Response.json({ 
        authenticated: false, 
        error: 'No session token found' 
      });
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
      return Response.json({ 
        authenticated: false, 
        error: 'User authentication failed',
        details: userError 
      });
    }

    return Response.json({ 
      authenticated: true, 
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error in test-auth:', error);
    return Response.json({ 
      authenticated: false, 
      error: 'Internal server error',
      details: error 
    });
  }
} 