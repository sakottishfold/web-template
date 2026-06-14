import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { me } from "./routes/me";
import { posts } from "./routes/posts";

const app = new Hono().basePath("/api");

// Better Auth owns everything under /api/auth/*
app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

// Application routes — chained so their types flow into the RPC client.
const routes = app
  .get("/health", (c) => c.json({ status: "ok" as const }))
  .route("/posts", posts)
  .route("/me", me);

export type AppType = typeof routes;
export { app };
