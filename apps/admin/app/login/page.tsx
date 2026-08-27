import { getAdminAccessToken } from '../../lib/admin-session';
import { LoginForm } from './login-form';

export default function LoginPage() {
  const configured = Boolean(getAdminAccessToken());

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm rounded border p-6">
        <h1 className="text-2xl font-bold">Lightning Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with the operator access token. Access is denied if the token
          is not configured.
        </p>
        <LoginForm configured={configured} />
      </div>
    </div>
  );
}
