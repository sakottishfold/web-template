"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Browser-side auth client.
 * Use `authClient.signIn`, `authClient.signUp`, `authClient.signOut`,
 * `authClient.useSession`, etc. in client components.
 */
export const authClient = createAuthClient({
  // Same-origin by default; override for a separately-hosted API.
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
