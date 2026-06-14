# 開発ハーネス(skills)

このテンプレートを clone したアプリを **最短で作り切る** ための、自己完結したスキル + エージェント。
`~/.claude/agents` 等のグローバル資産に依存しない ── clone するだけで動く。

## パイプライン

```
ゴール
  └ onboarding  初回1回。クローンに"色"を付ける(名前・アンチゴール・デザイン原則・トーン)
  └ [spec]  ──▶ ★確認1  2層以上 / 非自明のときだけ
  └ design  ──▶ ★確認2  UI を伴うとき(実装着手前レビュー)
  └ feature     実装 → pnpm check → consistency sweep → doc同期
  └ 学びの反映  (dev の中核責務 / harness-auditor)
  └ ship        出荷(check green なら本番 / preview へ・任意)
```

`adr` は途中どの局面でも、自明でない判断が出たら割り込みで呼ぶ。
`spec` / `design` は条件付き ── 軽微な単一レイヤー変更は `feature` 直行。
製品アイデンティティ(vision / アンチゴール)は `docs/PROJECT.md` に集約(独立 PRD は持たない)。
`dev` が全体を統括し、**要所2点だけ**人間に確認する。

## スキル一覧

| スキル       | 役割                         | 主な出力                                             |
| ------------ | ---------------------------- | ---------------------------------------------------- |
| `onboarding` | クローンに色を付ける(初回)   | `docs/PROJECT.md`・`CLAUDE.md`索引                   |
| `adr`        | 非自明な意思決定の記録       | `docs/adr/NNNN-*.md`(append-only)                    |
| `spec`       | 技術仕様(条件付き・機能単位) | `docs/spec/NNNN-*.md`                                |
| `design`     | spec→ビジュアル/UX           | `docs/design/NNNN-*.md`                              |
| `feature`    | spec+design→コード実装       | コード + 検証 + doc同期                              |
| `ship`       | 出荷(出口)                   | migration / env 同期 / Vercel デプロイ / smoke check |
| `dev`        | パイプライン統括 + 学び反映  | 上記を駆動・rules更新・compaction                    |

## エージェント(`.claude/agents/`)

スキルから dispatch される実行体 / 監査役。別コンテキストで並列・隔離実行する。

| エージェント      | 役割                                       | 呼ぶ側       |
| ----------------- | ------------------------------------------ | ------------ |
| `db-implementer`  | `src/db/**` + migration                    | feature, dev |
| `api-implementer` | `src/server/**` + `AppType`                | feature, dev |
| `ui-implementer`  | `src/app/**` + `src/components/**`         | feature, dev |
| `harness-auditor` | 静的ガード移行 / ドリフト検出 / compaction | dev          |

探索 / 計画は組み込み `Explore` / `Plan` を借用する(独自に作らない)。
CI(`.github/workflows/ci.yml`)が PR ごとに `pnpm check` + build を機械強制する。

## docs レイアウト

| パス                    | 中身                                                                                            | 誰が書く         |
| ----------------------- | ----------------------------------------------------------------------------------------------- | ---------------- |
| `docs/PROJECT.md`       | アプリの色 + 製品アイデンティティ(名前・ペルソナ・アンチゴール・デザイン原則・トーン・トークン) | onboarding       |
| `docs/spec/NNNN-*.md`   | 機能単位の技術仕様(条件付き)。design と id 共有                                                 | spec             |
| `docs/design/NNNN-*.md` | 機能単位のデザイン仕様                                                                          | design           |
| `docs/adr/NNNN-*.md`    | append-only / Superseded のみ                                                                   | adr              |
| `docs/rules/*.md`       | プロジェクトルール(category別)。スキルが preflight で読む                                       | dev が学びを追記 |
| `docs/NEXT-ACTIONS.md`  | 統合TODO(繰り延べサブタスク・未決問題)                                                          | 全スキル         |
| `CLAUDE.md`             | 索引(どこに何があるか/着手前に読む/編集禁止)                                                    | onboarding・dev  |

## 自己進化

`dev` が各ステップ後に「学びは?」と問い、結果を:

- ルール → `docs/rules/<category>.md` に追記
- ドリフト → spec/design を実態に更新
- 暗黙の決定 → `adr` を遡って記録
- **スキル自体の不備 → 該当 `SKILL.md` を更新**
- **機械化できる学び → 静的ガード(lint / 型 / test / knip)に実装**(prose より優先)

この回収・是正と rules の compaction は `harness-auditor` エージェントに委譲できる。
