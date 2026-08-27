'use client';

import { useFormState } from 'react-dom';
import { loginAction } from './actions';

const initialState = { error: '' };

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action] = useFormState(loginAction, initialState);

  return (
    <form action={action} className="mt-6 space-y-4">
      {!configured ? (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          Admin access is not configured. Set ADMIN_ACCESS_TOKEN and restart.
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}
      <label className="block text-sm font-medium">
        Access token
        <input
          type="password"
          name="token"
          autoComplete="current-password"
          required
          disabled={!configured}
          className="mt-1 w-full rounded border p-2"
        />
      </label>
      <button
        type="submit"
        disabled={!configured}
        className="w-full rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        Sign in
      </button>
    </form>
  );
}
