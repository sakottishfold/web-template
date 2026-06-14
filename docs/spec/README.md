# spec/

機能単位の技術仕様。`spec` スキルが書く。

- 命名: `NNNN-<slug>.md`(4桁ゼロ詰め連番 + kebab-case)
- `design/NNNN-<slug>.md` と **同じ id** を共有する。
- 各 spec: 目的 / スキーマ差分 / API・Server Action / データフロー / 受け入れ条件。
- 実装が乖離したら spec を実態に更新する(`docs/rules/docs.md`)。
