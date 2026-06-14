"use client";

import type { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

// Inherit only the visual knobs from Button so this fits different contexts
// (header vs. page body) without leaking the full Button surface.
type SignOutButtonProps = VariantProps<typeof buttonVariants>;

/**
 * Sign-out is an action → a real <button>. Clears the Better Auth session,
 * then sends the user to /login. router.refresh() drops the server-rendered
 * session state so protected pages re-evaluate immediately.
 */
export function SignOutButton({ variant = "outline", size }: SignOutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSignOut() {
    setPending(true);
    const { error } = await authClient.signOut();
    setPending(false);

    if (error) {
      toast.error(error.message ?? "Could not sign out");
      return;
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <Button variant={variant} size={size} onClick={onSignOut} disabled={pending}>
      {pending ? "…" : "Sign out"}
    </Button>
  );
}
