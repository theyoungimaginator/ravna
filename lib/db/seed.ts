import { stripe } from '../payments/stripe';
import { supabase } from './supabase';
import { hashPassword } from '@/lib/auth/session';

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  const baseProduct = await stripe.products.create({
    name: 'Base',
    description: 'Base subscription plan',
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800, // $8 in cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: 'Plus',
    description: 'Plus subscription plan',
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200, // $12 in cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  console.log('Stripe products and prices created successfully.');
}

async function seed() {
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  // Create user
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert([{
      email: email,
      password_hash: passwordHash,
      role: "owner",
    }])
    .select()
    .single();

  if (userError) {
    throw new Error(`Failed to create user: ${userError.message}`);
  }

  console.log('Initial user created.');

  // Create team
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert([{
      name: 'Test Team',
    }])
    .select()
    .single();

  if (teamError) {
    throw new Error(`Failed to create team: ${teamError.message}`);
  }

  // Add user to team
  const { error: memberError } = await supabase
    .from('team_members')
    .insert([{
      team_id: team.id,
      user_id: user.id,
      role: 'owner',
    }]);

  if (memberError) {
    throw new Error(`Failed to add team member: ${memberError.message}`);
  }

  await createStripeProducts();
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  }); 