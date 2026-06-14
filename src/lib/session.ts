import { headers } from "next/headers";
import { auth, type Session } from "@/lib/auth";

/**
 * Read the current session in Server Components / Route Handlers / Server Actions.
 * Returns `null` when the visitor is not authenticated.
 */
export async function getSession(): Promise<Session | null> {
  return auth.api.getSession({ headers: await headers() });
}
