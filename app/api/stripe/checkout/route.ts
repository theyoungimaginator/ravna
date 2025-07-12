import { supabase } from '@/lib/db/supabase';
import { setSession } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/pricing', request.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription'],
    });

    if (!session.customer || typeof session.customer === 'string') {
      throw new Error('Invalid customer data from Stripe.');
    }

    const customerId = session.customer.id;
    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id;

    if (!subscriptionId) {
      throw new Error('No subscription found for this session.');
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    });

    const plan = subscription.items.data[0]?.price;

    if (!plan) {
      throw new Error('No plan found for this subscription.');
    }

    const productId = (plan.product as Stripe.Product).id;

    if (!productId) {
      throw new Error('No product ID found for this subscription.');
    }

    const userId = session.client_reference_id;
    if (!userId) {
      throw new Error("No user ID found in session's client_reference_id.");
    }

    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', Number(userId))
      .limit(1);

    if (userError || !users || users.length === 0) {
      throw new Error('User not found in database.');
    }

    const { data: userTeam, error: teamError } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', users[0].id)
      .limit(1);

    if (teamError || !userTeam || userTeam.length === 0) {
      throw new Error('User is not associated with any team.');
    }

    const { error: updateError } = await supabase
      .from('teams')
      .update({
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        stripe_product_id: productId,
        plan_name: (plan.product as Stripe.Product).name,
        subscription_status: subscription.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userTeam[0].team_id);

    if (updateError) {
      throw new Error(`Failed to update team subscription: ${updateError.message}`);
    }

    await setSession(users[0]);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error handling successful checkout:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
} 