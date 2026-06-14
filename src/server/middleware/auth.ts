import { createMiddleware } from "hono/factory";
import { auth } from "@/lib/auth";

type SessionData = typeof auth.$Infer.Session;

/** Hono env for routes guarded by {@link authMiddleware} — `user` / `session` are set. */
export type AuthEnv = {
  Variables: {
    user: SessionData["user"];
    session: SessionData["session"];
  };
};

/**
 * Auth-by-construction for the API: mount this on a route group and every
 * handler downstream is guaranteed an authenticated `user` (401 otherwise).
 * Apply it once on a sub-app instead of checking the session in each handler.
 */
export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const data = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!data) return c.json({ error: "Unauthorized" }, 401);
  c.set("user", data.user);
  c.set("session", data.session);
  await next();
});
