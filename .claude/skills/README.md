# 開発ハーネス(skills)

このテンプレートを clone したアプリを **最短で作り切る** ための、自己完結した7スキル。
`~/.claude/agents` 等のグローバル資産に依存しない ── clone するだけで動く。

## パイプライン

```
ゴール
  └ onboarding  初回1回。クローンに"色"を付ける(名前・デザイン原則・トーン)
  └ prd         製品要件を固める / 追記する
  └ spec    ──▶ ★確認1: spec レビュー
  └ design  ──▶ ★確認2: 実装着手前レビュー
  └ feature     実装 → pnpm check → consistency sweep → doc同期
  └ 学びの反映  (dev の中核責務)
```

`adr` は途中どの局面でも、自明でない判断が出たら割り込みで呼ぶ。
`dev` が全体を統括し、**要所2点だけ**人間に確認する。

## スキル一覧

| スキル       | 役割                        | 主な出力                                                         |
| ------------ | --------------------------- | ---------------------------------------------------------------- |
| `onboarding` | クローンに色を付ける(初回)  | `docs/PROJECT.md`・`PRD.md`骨子・`rules/`シード・`CLAUDE.md`索引 |
| `prd`        | 製品/エピック要件           | `docs/prd/PRD.md`                                                |
| `adr`        | 非自明な意思決定の記録      | `docs/adr/NNNN-*.md`(append-only)                                |
| `spec`       | PRD→技術仕様(機能単位)      | `docs/spec/NNNN-*.md`                                            |
| `design`     | spec→ビジュアル/UX          | `docs/design/NNNN-*.md`                                          |
| `feature`    | spec+design→コード実装      | コード + 検証 + doc同期                                          |
| `dev`        | パイプライン統括 + 学び反映 | 上記を駆動・rules更新・compaction                                |

## docs レイアウト

| パス                    | 中身                                                                | 誰が書く         |
| ----------------------- | ------------------------------------------------------------------- | ---------------- |
| `docs/PROJECT.md`       | アプリの色(名前・1行・ペルソナ・デザイン原則・トーン・主要トークン) | onboarding       |
| `docs/prd/PRD.md`       | 製品PRD(vision/persona/anti-goal/収益)                              | prd              |
| `docs/spec/NNNN-*.md`   | 機能単位の技術仕様。design と id 共有                               | spec             |
| `docs/design/NNNN-*.md` | 機能単位のデザイン仕様                                              | design           |
| `docs/adr/NNNN-*.md`    | append-only / Superseded のみ                                       | adr              |
| `docs/rules/*.md`       | プロジェクトルール(category別)。スキルが preflight で読む           | dev が学びを追記 |
| `docs/NEXT-ACTIONS.md`  | 統合TODO(繰り延べサブタスク・未決問題)                              | 全スキル         |
| `CLAUDE.md`             | 索引(どこに何があるか/着手前に読む/編集禁止)                        | onboarding・dev  |

## 自己進化

`dev` が各ステップ後に「学びは?」と問い、結果を:

- ルール → `docs/rules/<category>.md` に追記
- ドリフト → spec/design を実態に更新
- 暗黙の決定 → `adr` を遡って記録
- **スキル自体の不備 → 該当 `SKILL.md` を更新**

rules が肥大したら `dev` が compaction(統合・要約)する。
