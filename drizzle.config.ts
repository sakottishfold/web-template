import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // drizzle-kit runs outside Next, so read the raw env var directly.
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
});
