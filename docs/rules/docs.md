# Docs rules

ドキュメント運用ルール。`spec` / `adr` / `dev` が読む。

## ADR は append-only

- `docs/adr/NNNN-*.md` は時系列ログ。過去 ADR の内容は**書き換えない**。
- 覆すときは新しい ADR を書き、旧 ADR の Status を `Superseded by ADR-NNNN` に更新する(これだけは編集可)。
- 採番は4桁ゼロ詰め連番(`0001`, `0002`...)。

## 機能単位の採番

- `spec` と `design` は同じ機能 id を共有する(`docs/spec/0007-foo.md` ↔ `docs/design/0007-foo.md`)。
- id は spec 作成時に採番(既存最大+1)。slug は kebab-case。

## 正典と日常参照を分ける

- 決定そのもの = `docs/adr/`(append-only)
- 製品の意図(vision / アンチゴール)= `docs/PROJECT.md`(育てる)
- 美意識の日常参照 = `docs/rules/design.md` + `docs/PROJECT.md`
- 1つの doc で全部を兼ねない。

## SPEC は実態を反映

- 実装が spec から乖離したら spec を実態に合わせて更新する。意図的な乖離なら ADR で残す。
- spec は「最初の意図」ではなく「現在の実装」を記す。

## 索引と繰り延べ

- `docs/` に新しい doc を足したら `CLAUDE.md` の索引表に1行追加する。
- 今やらないことは黙って飛ばさず `docs/NEXT-ACTIONS.md` に状態メモ付きで繰り延べる。
