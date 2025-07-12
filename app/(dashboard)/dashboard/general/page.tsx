'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  updateAccount,
  updatePassword,
  deleteAccount,
} from '@/app/(login)/actions';
import type { AuthState } from '@/app/(login)/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

function UpdateAccountForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    updateAccount,
    {}
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your account details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" />
          </div>
          <Button type="submit">Update Account</Button>
          {state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
          {state?.success && (
            <p className="text-green-500 text-sm mt-2">{state.success}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

function UpdatePasswordForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    updatePassword,
    {}
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" name="currentPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" name="newPassword" type="password" />
          </div>
          <Button type="submit">Update Password</Button>
          {state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
          {state?.success && (
            <p className="text-green-500 text-sm mt-2">{state.success}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

function DeleteAccountForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    deleteAccount,
    {}
  );
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password to confirm"
            />
          </div>
          <Button variant="destructive" type="submit">
            Delete Account
          </Button>
          {state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}

export default function GeneralSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="space-y-8">
        <UpdateAccountForm />
        <UpdatePasswordForm />
        <DeleteAccountForm />
      </div>
    </div>
  );
}
