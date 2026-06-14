import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import * as schema from "./schema";

// postgres-js connects lazily, so importing this module never opens a socket.
const client = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(client, { schema });
