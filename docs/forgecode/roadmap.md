# ForgeCode roadmap

This roadmap is an engineering sequence, not a promise that every item is already available. Each phase must ship with tests, documentation, and measurable acceptance criteria.

## Phase 0 — Foundation

- Establish independent project identity while preserving upstream license notices and attribution.
- Map upstream packages, provider adapters, session runtime, TUI, tools, and test strategy.
- Define security, compatibility, and benchmark policies.
- Keep upstream synchronization deliberate and reviewable.

## Phase 1 — Terminal quality and reliability

- Reduce startup and interaction latency without regressing supported platforms.
- Improve session resume, cancellation, progress visibility, and structured errors.
- Add stable non-interactive/JSON output for shell pipelines and automation.
- Make configuration diagnostics and provider setup actionable.

## Phase 2 — Provider and API ecosystem

- Expand native provider coverage and improve configurable OpenAI-compatible endpoints.
- Add capability discovery and accurate model feature reporting.
- Improve OAuth and secret handling, rate-limit handling, retries, and fallback routing.
- Add adapter conformance tests and a provider compatibility matrix.

## Phase 3 — Repository intelligence

- Incremental repository indexing with ignore-aware file discovery.
- Symbol, reference, and dependency-aware retrieval.
- Explainable context selection with token budgets and source references.
- Benchmark retrieval quality on small, medium, and large repositories.

## Phase 4 — Controlled multi-agent execution

- Coordinator plus specialist agents with explicit scopes and budgets.
- Isolated parallel work, conflict detection, and deterministic integration.
- Checkpointing, cancellation, and auditable action traces.
- Verify changes with tests and report evidence before claiming completion.

## Phase 5 — Security and extensibility

- Fine-grained tool permissions and safe defaults.
- Sandboxed execution options and secret scanning/redaction.
- Stable plugin and MCP integration contracts.
- Project memory with provenance, user control, and lifecycle management.

## Phase 6 — Release engineering

- Reproducible builds and platform-specific installation packages.
- CI for lint, type checks, tests, security checks, and release artifacts.
- Signed releases, upgrade/rollback guidance, and support policy.

## Release gates

A feature is not complete until it has tests, documentation, failure handling, and a clear opt-in or migration path. Performance changes must show before/after results on the same machine and workload. Security-sensitive features require threat review before being enabled by default.
