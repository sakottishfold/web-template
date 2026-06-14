import { Hono } from "hono";
import { type AuthEnv, authMiddleware } from "../middleware/auth";

// Example protected resource. authMiddleware guarantees `user` is present —
// no per-handler auth check needed (auth-by-construction).
export const me = new Hono<AuthEnv>().use(authMiddleware).get("/", (c) => {
  const user = c.get("user");
  return c.json({ id: user.id, name: user.name, email: user.email });
});
