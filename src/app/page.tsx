import Link from "next/link";
import { ApiStatus } from "@/components/api-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/session";

const stack = [
  { area: "Tooling", items: "pnpm · oxlint · oxfmt · vitest · knip · lefthook" },
  { area: "Frontend", items: "Next.js (App Router) · Tailwind v4 · shadcn/ui" },
  { area: "Backend", items: "Hono (RPC) · Drizzle ORM · PostgreSQL" },
  { area: "Auth", items: "Better Auth (email/password)" },
  { area: "Data", items: "Zod · drizzle-zod · TanStack Query · @t3-oss/env" },
];

export default async function Home() {
  const session = await getSession();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold tracking-tight">web-template</h1>
        <div className="flex items-center gap-3">
          <ApiStatus />
          {session ? (
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
          ) : (
            <Button size="sm" variant="outline" render={<Link href="/login" />}>
              Sign in
            </Button>
          )}
        </div>
      </div>

      <p className="text-muted-foreground">
        A type-safe full-stack starter. The API status above is fetched from{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-sm">/api/health</code> through the Hono
        RPC client.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Stack</CardTitle>
          <CardDescription>Everything wired up and ready.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {stack.map((row) => (
            <div key={row.area} className="grid grid-cols-[5rem_1fr] items-baseline gap-3 text-sm">
              <span className="font-medium">{row.area}</span>
              <span className="text-muted-foreground">{row.items}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button render={<a href="https://hono.dev" target="_blank" rel="noreferrer" />}>
          Hono docs
        </Button>
        <Button
          variant="outline"
          render={<a href="https://orm.drizzle.team" target="_blank" rel="noreferrer" />}
        >
          Drizzle docs
        </Button>
      </div>
    </main>
  );
}
