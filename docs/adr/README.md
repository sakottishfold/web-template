# adr/

意思決定記録(Architecture Decision Records)。`adr` スキルが書く。**append-only**。

- 命名: `NNNN-<slug>.md`(4桁ゼロ詰め連番)
- 過去 ADR の中身は書き換えない。覆すときは新 ADR を書き、旧 ADR の Status を `Superseded by ADR-NNNN` にするだけ。
- 各 ADR: Status / Context / Decision / Consequences / (任意)Alternatives。

## テンプレート

```md
# ADR-NNNN: <タイトル>

- Status: Accepted | Superseded by ADR-MMMM
- Date: YYYY-MM-DD

## Context

(なぜ決める必要があったか)

## Decision

(何を決めたか)

## Consequences

(結果・トレードオフ)

## Alternatives(任意)

(検討した代替案と却下理由)
```
