---
name: design
description: spec からビジュアル / UX を設計するときに使う ── 画面、コンポーネント、状態(empty / loading / error)、使用トークン、アクセシビリティ。機能単位(spec と同じ id)。pencil でモックを作る場合も。世界観が問われたら docs/PROJECT.md と docs/rules/design.md を育てる。
---

# design

## 最短原則

実装をブロック解除する**画面とコンポーネントの仕様**まで。ピクセル完璧は不要。世界観は onboarding の1ページを土台に、**この機能で必要になった分だけ**育てる。

## 使うとき

- spec が固まった機能の画面 / UX を設計するとき
- 既存画面の改修、コンポーネントの新バリアント設計

## preflight

- 対応する `docs/spec/NNNN-*.md`
- `docs/PROJECT.md`(デザイン原則・トーン・トークン)、`docs/rules/design.md`
- 既存 `docs/design/`、既存 shadcn コンポーネント(`src/components/ui/`)

## ワークフロー

1. 対応 spec を読み、必要な画面とコンポーネントを洗い出す。
2. **状態を網羅**: default / empty / loading(skeleton)/ error。漏らさない。
3. **shadcn にマップ**: 既存コンポーネント優先。トークン参照(ハードコード禁止)。base-nova は `asChild` ではなく `render` prop。
4. 必要なら pencil で `.pen` モックを作り(`designing-with-pencil` 相当)、design doc から参照。未統合コンポーネントは `.pen` をビジュアル仕様にする。
5. **a11y**: コントラスト WCAG AA、role/label、キーボード操作を明記。
6. **世界観を育てる**: 新しい美意識決定やアンチパターンを見つけたら `docs/rules/design.md` か `docs/PROJECT.md` の NOリストへ。新トークンは `globals.css` の `@theme` に足し `docs/rules/design.md` に記す。
7. `docs/design/NNNN-<slug>.md` に保存(spec と同じ id)。

## 出力

`docs/design/NNNN-<slug>.md`(+ 任意で `.pen`)。この後 `dev` が**確認2(実装着手前レビュー)**を挟む。

## 危険信号 ─ STOP

- empty / error 状態を設計し忘れる → 必ず網羅。
- デザイン原則(PROJECT.md)に照らさずに進む → 上位ルールに反していないか確認。
- 新トークンをその場の `bg-[#...]` で済ませる → `@theme` に追加して名前を付ける。
