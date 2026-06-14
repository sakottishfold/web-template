import { handle } from "hono/vercel";
import { app } from "@/server";

// Hono runs on the Node.js runtime (Fluid Compute) — full Node APIs available.
export const runtime = "nodejs";

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
