import { requireSession } from "@/lib/session";

// Protected page: requireSession() redirects to /login when unauthenticated,
// so everything below is guaranteed an authenticated user (auth-by-construction).
export default async function DashboardPage() {
  const { user } = await requireSession();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-mono text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Signed in as <span className="text-foreground">{user.email}</span>.
      </p>
    </main>
  );
}
