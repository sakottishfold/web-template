---
name: spec
description: PRD の機能を技術仕様に落とすときに使う ── DBスキーマ差分、API / Hono route / Server Action、データフロー、受け入れ条件。機能単位で採番(docs/spec/NNNN-*.md)し、design と同じ id を共有する。ビジュアルは design、実装は feature へ。
---

# spec

## 最短原則

spec は **design と feature が始められる程度**まで。実装可能な解像度に達したら止める。受け入れ条件は**できるだけ test に落とせる具体性**で書く(後で静的ガードになる)。

## 使うとき

- PRD の1機能を技術設計するとき
- スキーマ/API を変える機能の設計

## preflight

- `docs/prd/PRD.md`(該当機能)、`docs/PROJECT.md`
- `docs/rules/docs.md`(採番・append-only)、`docs/rules/code.md`(スタック規約)
- 既存 `docs/spec/`、既存コード(`src/db/schema.ts` / `src/server/` / 類似機能)

## ワークフロー

1. **機能 id 採番**: `docs/spec/` と `docs/design/` の既存最大 + 1(4桁)。slug は kebab-case。
2. **既存コード監査**: 再利用できる schema / route / 型 / Server Action を grep。
3. **spec を書く**(`docs/spec/NNNN-<slug>.md`):
   - 目的(この機能が何をするか、PRD のどのストーリーに対応)
   - スキーマ差分(Drizzle テーブル/カラム、migration の要否)
   - API 形状(Hono route のパス・メソッド・Zod 入出力、または Server Action)
   - データフロー(クライアント→RPC→DB の経路)
   - **受け入れ条件**(test に落とせる箇条書き)
   - 影響範囲(触るファイル)
4. 自明でない設計判断 → `adr`。今回やらないサブタスク → `docs/NEXT-ACTIONS.md`。
5. `CLAUDE.md` 索引に1行(spec が増えたら)。

## 出力

`docs/spec/NNNN-<slug>.md`。この後 `dev` が**確認1(spec レビュー)**を挟む。

## 危険信号 ─ STOP

- 受け入れ条件が曖昧("いい感じに動く")→ test 可能な具体に直す。
- 既存スキーマを見ずに新テーブルを設計 → まず schema.ts を読む。
