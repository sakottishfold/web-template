@AGENTS.md

# {{PROJECT_NAME}}

> {{TAGLINE}} ── (onboarding が埋める。未記入ならまず `onboarding` スキルを使う)

## 開発の入口

複数ステップにまたがる開発は **`dev` スキル**から始める。`dev` が
onboarding→prd→spec→design→feature を正しい順で駆動し、要所2点(spec 確定・実装着手前)だけ確認する。
ハーネス全体の説明は `.claude/skills/README.md`。

## どこで何を見つけるか

| 知りたいこと                               | 場所                    |
| ------------------------------------------ | ----------------------- |
| アプリの色(名前・デザイン原則・トーン)     | `docs/PROJECT.md`       |
| 製品要件(vision / ペルソナ / アンチゴール) | `docs/prd/PRD.md`       |
| 機能の技術仕様                             | `docs/spec/NNNN-*.md`   |
| 機能のデザイン仕様                         | `docs/design/NNNN-*.md` |
| なぜその決定をしたか                       | `docs/adr/NNNN-*.md`    |
| プロジェクトルール                         | `docs/rules/*.md`       |
| 次にやること(統合TODO)                     | `docs/NEXT-ACTIONS.md`  |
| スタック / セットアップ                    | `README.md`             |

## 着手前に読む

- コード実装(`feature`)の前: 該当 `docs/spec` `docs/design`、`docs/rules/code.md`、直近 `docs/adr`。
- スキルは preflight で**該当 `docs/rules/*` だけ**を読む。

## 規律(編集禁止 / append-only)

- `docs/adr/` は **append-only**。過去 ADR の中身は書き換えず、覆すときは新 ADR + 旧を `Superseded` に。
- 環境変数は `src/lib/env.ts` 経由のみ。`process.env` 直参照禁止。
- 検証ゲート `pnpm check`(lint / format / typecheck / knip / test)は完了前に必ず通す。
- 学びは**静的ガード(lint / 型 / test / knip)優先**で記録する。`docs/rules` への prose 追記は最後の手段。
- `docs/` に doc を足したら、この表に1行追加する。
