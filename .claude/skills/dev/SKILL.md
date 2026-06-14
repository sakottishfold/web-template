---
name: dev
description: 一連の開発を取りまとめるオーケストレーションスキル。ゴールを受けて onboarding→prd→spec→design→feature のパイプラインを駆動し、要所2点だけ人間に確認する。各ステップ後に学びを回収して(静的ガード優先で)rules / skills / docs を更新し、rules が肥大したら compaction する。複数ステップにまたがる開発依頼はまずこれを使う。
---

# dev

## 役割

開発の入口。個別スキル(onboarding / prd / spec / design / feature / adr)を**正しい順で呼び**、要所だけ人間に確認し、**学びを回収してハーネス自身を育てる**。

## 最短原則

ゴールを最短で出荷可能まで運ぶ。確認は要所2点(spec 確定・実装着手前)だけ。doc は完璧でなく「次をブロック解除する分」。

## preflight

- `docs/rules/workflow.md`(最短・チェックポイント・学び回収)
- `docs/PROJECT.md` の有無(未記入なら onboarding 先行)、`docs/NEXT-ACTIONS.md`

## パイプライン

```
ゴール受領
 0. 状態判定: docs/PROJECT.md が未記入 → onboarding を先に実行
 1. prd      製品要件を必要分だけ追記(既に十分なら飛ばす)
 2. spec     機能仕様を採番して作成
    ──▶ ★確認1: ユーザーに spec をレビューしてもらう
 3. design   spec から画面 / UX
    ──▶ ★確認2: 実装着手前にユーザー確認
 4. feature  実装 → pnpm check → consistency sweep → doc 同期
 5. 学びの回収(下記)
```

- 各ステップは対応スキルを `Skill` で呼ぶ(無ければ各 SKILL.md の手順に従う)。
- `adr` は途中どこでも、自明でない判断が出たら割り込みで呼ぶ。
- ゴールが大きい/複数機能なら、spec 単位に分解して 2〜4 を機能ごとに回す。独立した機能は並行サブエージェントに出してよい。

## 学びの回収(各ステップ後・静的ガード優先)

毎ステップ後に「今回の学びは?」を問い、**この優先順位で**記録先を選ぶ:

1. **機械的に強制できる学び** → lint(`.oxlintrc.json`)/ 型 / vitest / knip / CI ゲートに**実装する**。例: 「`process.env` 直参照禁止」「この依存は使わない」「この命名規則」。
2. 意思決定だった → `adr`
3. spec / design が実態と乖離 → 更新
4. **スキル自体が不足 / 誤り** → 該当 `.claude/skills/*/SKILL.md` を更新(ハーネスの自己進化)
5. 上のどれでもない判断・美意識・運用の機微 → 初めて `docs/rules/<category>.md` に1行追記(由来付き)

**`docs/rules` への prose 追記は最後の手段**。無作為に増やさない。機械化できるものをルール化で済ませない。

## compaction

`docs/rules/<category>.md` が肥大 / 重複してきたら統合・要約する。重複ルールを1つにまとめ、静的ガードに移せたものは prose から削除する。compaction 自体を ADR や NEXT-ACTIONS に残す必要はない(整理は append-only 対象外)。

## NEXT-ACTIONS 管理

各ステップで繰り延べたサブタスク・未決を `docs/NEXT-ACTIONS.md` に集約し続ける。次のゴール選定時にここを起点にする。

## 危険信号 ─ STOP

- 確認を3点以上挟む → 要所2点に絞る(最短に反する)。
- 学びを何でも `docs/rules` に書く → まず静的ガードを検討。
- spec を飛ばして feature に直行 → 機能なら必ず spec→design を通す(バグ修正の単発を除く)。
- スキルがうまく機能しないのに放置 → SKILL.md を更新するのが dev の仕事。
