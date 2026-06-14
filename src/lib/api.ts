import { hc } from "hono/client";
import type { AppType } from "@/server";

/**
 * Type-safe RPC client for the Hono API.
 * Usage: `const res = await api.api.health.$get()`
 * (the extra `.api` comes from the Hono `basePath("/api")`).
 */
export const api = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
