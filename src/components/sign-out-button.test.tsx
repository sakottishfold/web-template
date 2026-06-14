import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SignOutButton } from "./sign-out-button";

const push = vi.fn();
const refresh = vi.fn();
const signOut = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));
vi.mock("@/lib/auth-client", () => ({ authClient: { signOut: () => signOut() } }));

describe("SignOutButton", () => {
  it("signs out and redirects to /login on click", async () => {
    signOut.mockResolvedValueOnce({ error: null });
    const user = userEvent.setup();
    render(<SignOutButton />);

    await user.click(screen.getByRole("button", { name: "Sign out" }));

    expect(signOut).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith("/login");
  });

  it("does not redirect when sign-out errors", async () => {
    push.mockClear();
    signOut.mockResolvedValueOnce({ error: { message: "nope" } });
    const user = userEvent.setup();
    render(<SignOutButton />);

    await user.click(screen.getByRole("button", { name: "Sign out" }));

    expect(signOut).toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});
