# Supabase Migration Guide

This project has been completely migrated from Drizzle + PostgreSQL to Supabase. Follow these steps to set up your Supabase database.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account or sign in
2. Create a new project
3. Note down your project URL and API keys

## 2. Set Up Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Remove the old PostgreSQL URL
# POSTGRES_URL=your_old_postgres_url
```

## 3. Set Up Database Schema

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `lib/db/supabase-schema.sql`
4. Run the SQL script to create all tables, indexes, and policies

## 4. Update Dependencies

The following dependencies have been removed:
- `drizzle-orm`
- `drizzle-kit`
- `postgres`

The following dependencies have been added:
- `@supabase/supabase-js`

## 5. Database Operations

### Old Drizzle Commands (No longer work):
```bash
npm run db:generate  # No longer needed
npm run db:migrate   # No longer needed
npm run db:studio    # No longer needed
```

### New Supabase Commands:
```bash
npm run db:setup     # Instructions to run SQL in dashboard
npm run db:seed      # Still works with Supabase
```

## 6. Key Changes

### Database Client
- **Old**: `lib/db/drizzle.ts` (Drizzle client)
- **New**: `lib/db/supabase.ts` (Supabase client)

### Schema Definition
- **Old**: `lib/db/schema.ts` (Drizzle schema)
- **New**: `lib/db/supabase-schema.sql` (SQL schema)
- **Types**: `lib/db/types.ts` (TypeScript interfaces)

### Database Queries
- **Old**: Drizzle ORM queries with `db.select()`, `db.insert()`, etc.
- **New**: Supabase queries with `supabase.from().select()`, `supabase.from().insert()`, etc.

### Column Names
All column names now use snake_case to match Supabase conventions:
- `passwordHash` → `password_hash`
- `stripeCustomerId` → `stripe_customer_id`
- `stripeSubscriptionId` → `stripe_subscription_id`
- `stripeProductId` → `stripe_product_id`
- `planName` → `plan_name`
- `subscriptionStatus` → `subscription_status`
- `createdAt` → `created_at`
- `updatedAt` → `updated_at`
- `deletedAt` → `deleted_at`
- `userId` → `user_id`
- `teamId` → `team_id`
- `ipAddress` → `ip_address`
- `invitedBy` → `invited_by`
- `teamMembers` → `team_members`

## 7. Row Level Security (RLS)

The schema includes basic RLS policies. You may want to customize these based on your application's security requirements.

## 8. Testing

After setup, test the following:
1. User registration and login
2. Team creation and management
3. Stripe integration
4. Activity logging

## 9. Migration from Existing Data

If you have existing data in a PostgreSQL database:

1. Export your data from the old database
2. Transform column names to snake_case
3. Import the data into Supabase using the SQL Editor or pgAdmin

## 10. Benefits of Supabase

- **Built-in Authentication**: Can replace custom auth with Supabase Auth
- **Real-time Subscriptions**: Built-in real-time capabilities
- **Edge Functions**: Serverless functions at the edge
- **Storage**: File storage with CDN
- **Dashboard**: Built-in database management interface
- **API**: Auto-generated REST and GraphQL APIs

## 11. Next Steps

Consider implementing:
- Supabase Auth for authentication
- Real-time subscriptions for live updates
- Edge functions for serverless operations
- Storage for file uploads

## 12. Troubleshooting

### Common Issues:

1. **Environment Variables Not Set**: Make sure all Supabase environment variables are properly set
2. **Schema Not Applied**: Run the SQL schema in your Supabase dashboard
3. **RLS Policies**: You may need to adjust RLS policies based on your needs
4. **Column Name Mismatches**: Ensure all column names use snake_case

### Getting Help:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase) 