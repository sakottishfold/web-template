import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type Session } from "@/lib/auth";

/**
 * Read the current session in Server Components / Route Handlers / Server Actions.
 * Returns `null` when the visitor is not authenticated.
 */
export async function getSession(): Promise<Session | null> {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Auth-by-construction for Server Components / Server Actions: returns a
 * guaranteed-non-null session, or redirects to /login. Use this instead of
 * hand-rolling `if (!session) redirect(...)` so "forgot the auth check" can't happen.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
