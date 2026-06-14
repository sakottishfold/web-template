---
name: prd
description: 製品レベルの要件(vision / ペルソナ / アンチゴール / 収益モデル / 成功指標)を固める・追記するときに使う。docs/prd/PRD.md を育てる。機能単位の詳細仕様は spec スキルへ、ビジュアルは design へ回す。
---

# prd

## 最短原則

PRD は **spec が始められる程度**まで書ければ十分。完璧な戦略文書を目指さない。アンチゴール(やらないこと)を1個でも明示する方が、機能を10個並べるより価値が高い。

## 使うとき

- 製品の vision / ペルソナ / アンチゴール / 収益を確定・追記するとき
- 新しい epic(大きな機能塊)の要件を立てるとき → `docs/prd/<epic>.md`
- onboarding の後、最初に要件を固めるとき

## 使わないとき

- 技術設計(スキーマ/API)→ `spec`
- 画面・UX → `design`
- 1機能の実装 → `spec` → `design` → `feature`

## preflight

- `docs/PROJECT.md`(色・デザイン原則・ターゲット)
- `docs/rules/docs.md`(ADR append-only・索引・繰り延べ)、`docs/rules/workflow.md`
- 既存 `docs/prd/PRD.md`

## ワークフロー

1. `docs/PROJECT.md` を起点に、PRD の各セクションを埋める/追記する。
2. **アンチゴール**を必ず1つ以上書く(スコープを守る盾)。
3. ユーザーストーリーは「user として〜したい、なぜなら〜」の形で、優先度順に。
4. 製品より大きい/独立した塊は epic として `docs/prd/<epic>.md` に分ける。
5. 未決事項 → `docs/NEXT-ACTIONS.md`。重要な意思決定が生じたら `adr` を呼ぶ。
6. 新規 doc を足したら `CLAUDE.md` 索引に1行追加。

## 出力

`docs/prd/PRD.md`(または `docs/prd/<epic>.md`)。

## 危険信号 ─ STOP

- 機能を網羅列挙しはじめる → アンチゴールと優先トップ数件に絞る。
- 収益/指標を作り込みすぎる → 分かる範囲で1行ずつ、後で育てる。
