'use client';

import { useActionState } from 'react';
import { signIn } from '../actions';
import { AuthState } from '../actions';
import { useRef } from 'react';

const initialState: AuthState = {};

export default function SignInPage() {
  const [state, formAction] = useActionState(signIn, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl transition-all">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 text-center">
          Welcome back
        </h2>

        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          {state.error && (
            <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-90 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{' '}
          <a
            href="/sign-up"
            className="font-medium text-black dark:text-white hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
