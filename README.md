# web-template

Type-safe full-stack starter. A single Next.js app with a co-located Hono API,
end-to-end type safety via Hono RPC, Drizzle ORM, and Better Auth.

## Stack

| Layer         | Choice                                                           |
| ------------- | ---------------------------------------------------------------- |
| Tooling       | pnpm · **oxlint** · **oxfmt** · **vitest** · **knip** · lefthook |
| Frontend      | Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn/ui     |
| Backend       | Hono (mounted at `/api`, RPC client) · runs on Node runtime      |
| Database      | Drizzle ORM · PostgreSQL (postgres-js)                           |
| Auth          | Better Auth (email/password, self-hosted)                        |
| Validation    | Zod · drizzle-zod · `@t3-oss/env-nextjs` (typed env)             |
| Data (client) | TanStack Query                                                   |

### Why these (vs the alternatives)

- **Hono over NestJS** — lightweight, runs anywhere, and its RPC client
  (`hono/client`) gives the frontend fully-typed API calls with zero codegen.
- **shadcn/ui over daisyUI** — you own the component code (Base UI primitives),
  which suits customizing heavily against a design system.
- **Better Auth** — TS-first, framework-agnostic, first-class Drizzle + Hono
  support, no vendor lock-in.

## Getting started

```bash
pnpm install
cp .env.example .env          # then fill in the values
# generate a secret: openssl rand -base64 32

# create the schema in your database
pnpm db:push                  # or: pnpm db:generate && pnpm db:migrate

pnpm dev                      # http://localhost:3000
```

You need a PostgreSQL database. Locally, a `compose.yml` is included:

```bash
docker compose up -d          # start Postgres (matches the default DATABASE_URL)
pnpm db:migrate               # apply migrations
docker compose down           # stop (data persists; add -v to wipe)
```

…or use a managed Postgres (Neon / Supabase) and paste its connection string
into `DATABASE_URL`.

## Project layout

```
src/
├─ app/
│  ├─ api/[[...route]]/route.ts   # Hono mounted into Next (Node runtime)
│  ├─ login/                      # email/password sign-in + sign-up
│  ├─ layout.tsx                  # providers + toaster
│  └─ page.tsx                    # session-aware landing page
├─ server/
│  ├─ index.ts                    # Hono app + AppType (exported for RPC)
│  └─ routes/posts.ts             # example resource
├─ db/
│  ├─ schema.ts                   # Drizzle tables + drizzle-zod schemas
│  └─ index.ts                    # db client
├─ lib/
│  ├─ auth.ts                     # Better Auth server config
│  ├─ auth-client.ts              # Better Auth browser client
│  ├─ session.ts                  # getSession() server helper
│  ├─ api.ts                      # typed Hono RPC client
│  └─ env.ts                      # validated environment variables
├─ components/
│  ├─ ui/                         # shadcn/ui components
│  ├─ providers.tsx               # TanStack Query provider
│  └─ api-status.tsx              # demo: RPC + TanStack Query
└─ test/setup.ts
```

### End-to-end type safety

The Hono app exports its type; the client consumes it:

```ts
// src/server/index.ts
export type AppType = typeof routes;

// anywhere on the client
import { api } from "@/lib/api";
const res = await api.api.posts.$get(); // fully typed response
```

## Scripts

| Command              | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `pnpm dev`           | Start the dev server                               |
| `pnpm build`         | Production build                                   |
| `pnpm check`         | lint + format check + typecheck + knip + tests     |
| `pnpm lint`          | oxlint                                             |
| `pnpm format`        | oxfmt (write)                                      |
| `pnpm typecheck`     | `tsc --noEmit`                                     |
| `pnpm test`          | vitest                                             |
| `pnpm knip`          | find unused files / deps / exports                 |
| `pnpm db:generate`   | generate SQL migrations from the schema            |
| `pnpm db:migrate`    | apply migrations                                   |
| `pnpm db:push`       | push the schema directly (dev)                     |
| `pnpm db:studio`     | open Drizzle Studio                                |
| `pnpm auth:generate` | regenerate Better Auth tables after config changes |

## Git hooks (lefthook)

- **pre-commit** — oxlint + oxfmt on staged files
- **pre-push** — typecheck + tests

Run `pnpm lefthook install` once after cloning (the `prepare` script does this
automatically on `pnpm install`).

## Notes

- Set `SKIP_ENV_VALIDATION=1` to build/lint without real secrets (CI, Docker).
- The Hono API runs on the Node.js runtime (Fluid Compute on Vercel) — full
  Node APIs are available.
- Replace the example `posts` table/route and the landing page with your own.
