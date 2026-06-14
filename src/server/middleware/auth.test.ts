import { Hono } from "hono";
import { describe, expect, it, vi } from "vitest";
import { type AuthEnv, authMiddleware } from "./auth";

// Mock the server auth config so the middleware can be tested without a DB.
const { getSession } = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession } } }));

const makeApp = () =>
  new Hono<AuthEnv>().use(authMiddleware).get("/", (c) => c.json({ user: c.get("user") }));

describe("authMiddleware", () => {
  it("401s when there is no session", async () => {
    getSession.mockResolvedValue(null);
    const res = await makeApp().request("/");
    expect(res.status).toBe(401);
  });

  it("passes through and exposes the user when authenticated", async () => {
    getSession.mockResolvedValue({
      user: { id: "u1", name: "Ada", email: "ada@example.com" },
      session: { id: "s1" },
    });
    const res = await makeApp().request("/");
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ user: { id: "u1" } });
  });
});
