import { zValidator } from "@hono/zod-validator";
import { desc } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "@/db";
import { insertPostSchema, posts as postsTable } from "@/db/schema";

export const posts = new Hono()
  .get("/", async (c) => {
    const rows = await db.select().from(postsTable).orderBy(desc(postsTable.createdAt));
    return c.json(rows);
  })
  .post("/", zValidator("json", insertPostSchema), async (c) => {
    const body = c.req.valid("json");
    const [row] = await db.insert(postsTable).values(body).returning();
    return c.json(row, 201);
  });
