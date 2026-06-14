# Quality map

品質特性を**各ステップの義務に分散**し、**機械化できるものは静的ガードに焼く**ための地図。
QA を後工程(フェーズ / 役割 / 最後のゲート)として足さない ── それはシフトライトで「最短で作り切る」と衝突する。`dev` / `harness-auditor` が主に読む。

## 優先順位(既定)

| Tier         | 品質特性                           | 扱い                                            |
| ------------ | ---------------------------------- | ----------------------------------------------- |
| **1 重視**   | 保守性 / 機能正しさ / セキュリティ | 各ステップの義務 + 可能な限り機械化             |
| **2 要所**   | 信頼性 / 使用性・a11y              | 担当ステップで1点だけ確認、機械化できる分は焼く |
| **3 後回し** | 性能 / 互換・移植                  | signal(実ユーザー / 負荷)が出るまで YAGNI       |

## 特性 → 担当ステップ → 機構

| 特性             | 主担当                                   | 機構(★=機械化済 / ◐=部分機械化 / ☆=人手・判断)                                                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **保守性**       | feature / harness-auditor                | ★ oxlint・knip・`tsc`・`pnpm check`/CI・**アーキ境界 lint**(UI→`@/db`/`@/server` 直 import 禁止)。◐ 再利用>再作成・トークン優先・狭いprops・契約明示(`code.md`)。harness-auditor が結合度 / dead code / ドリフトを定期監査                                                                          |
| **機能正しさ**   | spec / feature                           | ★ vitest + 型 + CI。◐ spec の受け入れ条件を **test に落とせる具体**で書く → そのまま test 化。**TDD は条件付き点火**(非自明ロジック / バグは再現 test 先・`feature` 参照)                                                                                                                           |
| **セキュリティ** | api-implementer / ship / harness-auditor | ★ env は `src/lib/env.ts` 経由強制・secret は repo 外(gitignore + GitHub secret scanning)・Dependabot・`next.config` セキュリティヘッダ。◎ **auth-by-construction**(`requireSession()` / `authMiddleware`)で認可忘れを構造的に不可能化。☆ 認可ロジックの深いレビューは要所で `security-review` 借用 |
| **信頼性**       | design / feature                         | ★ 型で null 安全。◐ design が状態網羅(empty/loading/error)、feature がエラー処理。☆ 例外系の dogfooding                                                                                                                                                                                             |
| **使用性・a11y** | design / ui-implementer                  | ★ oxlint `jsx-a11y`(role/label/alt 等)。◐ design が WCAG AA・キーボード操作。☆ 使用性本体は**プロダクト検証**(課題を解けているか)= dogfooding / FRICTION-LOG                                                                                                                                        |
| **性能**         | (後回し)                                 | ◐ 計測の口だけ。signal が出たら `vercel:performance` 借用。先回り最適化はしない                                                                                                                                                                                                                     |
| 互換・移植       | (決定済み)                               | ★ 単一デプロイ先(Vercel)・モダンブラウザ前提。追加作業なし                                                                                                                                                                                                                                          |

## 機械化できないものの扱い

☆(人手・判断)は**"随所"を諦めて要所で予算を取る**:

- 使用性本体 → 自分で使い、摩擦を `docs/NEXT-ACTIONS.md` か FRICTION ログに記録
- セキュリティの認可深掘り → 認証/権限を変えたデプロイ前に `security-review`
- 例外系・負荷 → signal 駆動

無理に品質ゲートで測ろうとしない。測れないものを測るふりが一番品質を下げる。

## あえてゲートしないもの(理由つき)

- **テストカバレッジ閾値**: % はゲーム可能な弱い代理。「通る test」より「受け入れ条件を満たす test」を spec で担保する。カバレッジは参考値に留め、ハードゲートにしない。
- **`.only` テストの混入**: vitest は CI(`process.env.CI`)で `.only` を自動拒否するので追加設定不要。

## 既知の調整(a11y × Base UI render prop)

oxlint `jsx-a11y` の `anchor-has-content` / `control-has-associated-label` は off にしている。
理由: shadcn base-nova の `render` prop(`<Button render={<a href.../>}>テキスト</Button>`)は子要素を実行時に anchor へマージするため、静的解析が中身を追えず**誤検知**する。残りの jsx-a11y ルール(alt-text・valid-aria・label-has-associated-control 等)は有効。
代償: icon-only のボタン/リンクのラベル欠落は機械検出できないので、**アイコンのみの要素は `aria-label` を明示する**(`design.md` のルール)。
