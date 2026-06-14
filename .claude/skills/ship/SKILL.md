---
name: ship
description: 機能が出荷可能(pnpm check が green)になったとき、本番 / プレビューにデプロイするときに使う ── リリース前ゲート、env 同期、本番 DB migration(Drizzle)、Vercel デプロイ、smoke check。パイプラインの出口。デプロイ詳細は vercel:deploy / vercel:env を借りる。
---

# ship

## 最短原則

「作り切る」の終点。**green な `pnpm check` を、壊さず本番に届ける**だけ。手順を増やさず、抜けると事故る項目(migration・env・smoke)だけ確実に踏む。

## 使うとき

- `feature` が完了し `pnpm check` が green、本番 / プレビューに出すとき
- スキーマや env を変えた変更をデプロイするとき(migration / env 反映が要る)

## 使わないとき

- まだ実装途中 → `feature`
- デプロイ設定の作り込み(ドメイン・CI 詳細)→ `vercel:deployments-cicd` を直接

## preflight

- `docs/rules/code.md`(検証ゲート)、`README.md`(セットアップ)、`.env.example`
- 直近の変更が **migration を含むか**(`src/db/schema.ts` / `drizzle/`)、**新 env を足したか**

## ワークフロー

1. **リリース前ゲート**: `pnpm check` と `pnpm build` が green(両方)。落ちるなら出荷しない。
2. **env 同期**: `.env.example` と本番 env の差分を確認。新規 env(`BETTER_AUTH_SECRET`・`DATABASE_URL`・`NEXT_PUBLIC_APP_URL` 等)を `vercel:env` で本番 / preview に登録。欠落はランタイムで初めて壊れる。
3. **本番 DB migration**: スキーマ変更があれば、本番 `DATABASE_URL` に対して `pnpm db:migrate`(`drizzle-kit migrate`)を**デプロイ前に**適用。破壊的変更(列削除・型変更)は後方互換の順序に注意(まず追加 → デプロイ → 後で削除)。
4. **デプロイ**: `vercel:deploy` を借りる。既定は preview、本番は明示(`prod`)。
5. **smoke check**: デプロイ URL の `/api/health` を叩いて `{status:"ok"}`、主要ルート(`/`・`/login`)を開いて確認。認証フローを1回通す。
6. **失敗時**: Vercel のロールバック(`vercel:deployments-cicd`)。原因の学びは `dev` / `harness-auditor` へ回す。

## 危険信号 ─ STOP

- migration 未適用のままスキーマ依存コードをデプロイ → 本番 500。先に migrate。
- env 欠落のままデプロイ → ランタイム失敗。先に同期。
- `pnpm check` を飛ばして「動くはず」で出荷 → ゲートは交渉不可。
- 本番に向けた `db:push`(差分強制反映)→ 履歴が残らない。本番は必ず `db:migrate`。
