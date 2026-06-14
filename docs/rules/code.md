# Code rules

実装時に必ず守る。`feature` スキルが preflight で読む。

## 検証ゲート(交渉不可)

- 完了宣言の前に `pnpm check` が通ること(lint / format:check / typecheck / knip / test)。
- UI を変えたら dev server を立ち上げ、変更ルートをビジュアル確認する。
- 「自分のマシンで動く」は出荷条件ではない。`pnpm build` も通すこと。

## 再利用 > 再作成

- 新しい util / hook / component / Server Action / 型を作る前に、まず grep して既存を探す。
- `cn()`、shadcn コンポーネント、`src/lib/*` の既存ヘルパーを優先して使う。
- 別パターンを採る場合は理由をコメント or ADR に残す(サイレントフォーク禁止)。

## トークン優先(ハードコード禁止)

- 色・サイズ・間隔・時間をリテラルで書かない(`bg-[#0a0a1a]` / `padding: 24` は NG)。
- Tailwind / shadcn のトークン(`bg-muted`, `text-muted-foreground` 等)を使う。
- 必要なトークンが無ければ `globals.css` の `@theme` に追加し、`docs/design.md` にも記す。

## スタック固有

- 環境変数は必ず `src/lib/env.ts`(t3-env)経由。`process.env` 直参照禁止。`.env.example` も更新。
- API は Hono(`src/server/`)。ルートはチェーンして `AppType` に型を流す。クライアントは `src/lib/api.ts` の RPC。
- DB は Drizzle。schema は `src/db/schema.ts`。`drizzle-zod` で Zod を導出し API バリデーションに使う。
- shadcn は base-nova スタイル。`asChild` ではなく **`render` prop**(例: `<Button render={<Link href="/x" />}>`)。
- スキーマ変更 → migration(`pnpm db:generate`)+ 該当 spec を更新。

## 契約とprops

- 関数/コンポーネントの「不正入力をどちらが処理するか」(防御 vs 呼び出し元信頼)を意識的に選び、コメント/型に明示する。
- 未確定の API 戻り値に UI を密結合しない。コンポーネントがレンダリングするものだけを狭い props で受け、統合時にアダプタを書く。

## consistency sweep(完了前)

- 型を変えた → 全呼び出し元を確認。
- 新 export(component/hook/util/SA)→ 発見可能性のため index 的 doc を更新。
- env 追加 → `.env.example` と `docs/` の該当箇所。
