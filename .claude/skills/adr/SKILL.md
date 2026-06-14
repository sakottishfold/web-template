---
name: adr
description: 非自明な意思決定を行う(または行った)ときに使う ── 選択肢の選定、戦略pivot、スキーマ制約の変更、新依存の採用、命名・改名・deprecate。直近の作業で暗黙に決まった事項を明示ADR化するときにも使う。append-only ── 既存ADRは書き換えず Superseded のみ。
---

# adr

## 最短原則

ADR は**決定の核**(何を・なぜ・トレードオフ)だけ簡潔に。論文ではない。5分で書けるサイズ。判断が自明なら ADR は不要。

## 使うとき

- 自明でない選択をする/した: 技術選定、スキーマ制約の緩和、新依存の採用、Free/Pro 分岐、破壊的リファクタ、命名・改名・deprecate、戦略 pivot
- 直近の作業で**暗黙に**決まってしまった事項を、後から明示記録するとき

## preflight

- `docs/rules/docs.md`(append-only 規律)
- `docs/adr/` の既存 ADR(採番の最大値・関連する過去決定)

## ワークフロー

1. **採番**: `docs/adr/` の既存最大番号 + 1(4桁ゼロ詰め)。
2. `docs/adr/README.md` のテンプレートで `docs/adr/NNNN-<slug>.md` を作成。
   - Status / Date / Context / Decision / Consequences /(任意)Alternatives
3. **覆す場合**: 旧 ADR は中身を書き換えず、Status を `Superseded by ADR-NNNN` に更新するだけ。新 ADR の Context で旧番号に言及。
4. 決定から派生する TODO は `docs/NEXT-ACTIONS.md` へ。
5. 新 ADR を `CLAUDE.md` 索引に1行追加(任意・ADR が増えたら)。

## 静的ガードを優先(重要)

決定が **lint / format / 型 / test / knip / CI で機械的に強制できる**なら、ADR に「方針」を書いたうえで**実際にそのガードを実装する**こと。例:

- 「`process.env` 直参照を禁止」→ 文章だけでなく oxlint ルールや型で縛る
- 「この依存は使わない」→ knip / CI チェックで検出する

ADR は _なぜ_ を残す場所。_強制_ は可能な限り実行可能なガードに寄せる(`docs/rules/README.md` 参照)。

## 危険信号 ─ STOP

- 「実装してから ADR を書こう」→ NO。意思決定は実装の*前*に、結果ではなく原因として残す。
- 過去 ADR を「更新」しようとする → NO。新 ADR + Superseded。
