---
name: onboarding
description: テンプレートを clone した直後、これから作るアプリの正体(何を作るか・名前・デザイン原則・トーン)をヒアリングして確定し、docs/PROJECT.md と PRD骨子・CLAUDE.md索引を初期化するときに使う。プロジェクトに最初の"色"を付ける入口。docs/PROJECT.md がまだ未記入(プレースホルダのまま)なら必ずこれを最初に使う。
---

# onboarding

## 最短原則

クローンに**色を付けるための1ページ**を作るだけ。フル世界観は作らない ── 世界観は後で `design` が育てる。質問は最小限に絞り、着手をブロックしない範囲で止める。

## 使うとき

- テンプレートを clone した直後、`docs/PROJECT.md` がまだ `{{PLACEHOLDER}}` のまま
- 大きな pivot 後(名前転換・スコープ再定義)で色を付け直すとき

## 使わないとき

- 既に `docs/PROJECT.md` が埋まっている → `prd` か `dev` へ
- 機能の詳細設計 → `spec` へ

## preflight

- `docs/rules/workflow.md`(最短原則)、`docs/rules/docs.md`(索引・繰り延べ)
- 既存の `docs/` と `CLAUDE.md` を一瞥し、何が既にあるか把握

## ワークフロー

1. **ヒアリング(最小限)**。`AskUserQuestion` でまとめて聞くと速い:
   - 何を作るか(1行)/ アプリ名(あれば)
   - ターゲット(ラフなペルソナ)
   - **何を FEEL させたいか**(機能ではなく雰囲気 ── 後の全デザイン判断の種)
   - スタック確認(既定: Next.js + Hono + Drizzle + Better Auth。変更があれば)
2. **`docs/PROJECT.md` を埋める**。`{{PROJECT_NAME}}` 等を置換。デザイン原則を **3〜5個**、トーン、分かる範囲の主要トークンを記す。NOリストは空でよい(後で蓄積)。
3. **`docs/prd/PRD.md` に種を入れる**。vision / 主要ペルソナ / アンチゴールを1〜2行ずつ。詳細は `prd` スキルに委ねる。
4. **`CLAUDE.md` の索引を更新**。アプリ名、「どこで何を見つけるか」表(docs/ の各ファイル)、「着手前に読む」、編集禁止リスト(PRD/adr は append-only 等)。
5. **色をコードに最小反映(任意・やりすぎ禁止)**: `package.json` の name、`src/app/layout.tsx` の metadata(title/description)、README 冒頭。3箇所まで。
6. **次の一歩を案内**: 通常は `dev`(統括)か `prd`。

## 出力

`docs/PROJECT.md` / `docs/prd/PRD.md`(骨子)/ `CLAUDE.md`(索引)/ 任意でコード3箇所。

## 危険信号 ─ STOP

- 「ついでにフル世界観も作ろう」→ NO。1ページで止める。
- 「質問を10個並べよう」→ NO。着手に必要な最小限だけ。
- デザイン原則ゼロのまま進む → 最低3個は引き出す(下流の AI 感を防ぐ唯一の盾)。
