# ForgeCode architecture direction

## Scope

ForgeCode is a terminal-first coding agent built on an existing TypeScript/Bun monorepo. The first engineering priority is to extend the current architecture without destabilizing its session, tool, provider, and terminal interfaces. Large rewrites are not a goal by themselves.

## Architectural layers

1. **Terminal experience** — interactive TUI, command mode, keyboard navigation, streaming output, resumable sessions, and scriptable non-interactive commands.
2. **Session runtime** — conversation state, task plans, cancellation, checkpoints, token and time budgets, and structured execution events.
3. **Agent orchestration** — a coordinator delegates bounded tasks to specialist agents. Each worker receives a narrow objective, explicit file scope, tool permissions, and a completion contract.
4. **Tool execution** — filesystem, shell, search, diagnostics, tests, and external tools behind permission-aware interfaces. Every action emits an auditable event.
5. **Repository intelligence** — incremental file inventory, symbol/reference search, dependency relationships, diagnostics, and retrieval that respects ignore rules and generated files.
6. **Model gateway** — provider adapters normalize messages, tool calls, streaming, usage, errors, and capability declarations while retaining provider-specific escape hatches.
7. **Persistence and memory** — project-local facts with provenance, timestamps, scope, and user control. Derived memory must be inspectable and deletable.

## Agent execution contract

Every autonomous task should follow a traceable lifecycle:

`intake -> inspect -> plan -> approve (when required) -> execute -> verify -> summarize`

A task is not complete merely because an agent produced text or changed files. Verification should run the relevant tests, type checks, lint rules, or explicit user-defined checks and report what did and did not run.

Parallel agents must not silently edit the same working tree. Prefer isolated worktrees or explicit file ownership, then integrate through reviewable diffs. Cancellation must stop child work and clean up temporary resources.

## Performance strategy

- Measure startup, first-token latency, time-to-first-useful-action, repository scan time, memory, and end-to-end task completion.
- Cache only with clear invalidation rules; prefer incremental updates over repeated full scans.
- Bound concurrency by CPU, memory, provider rate limits, and user configuration.
- Stream progress and output rather than buffering large responses.
- Keep expensive indexing and background tasks cancellable and observable.

## Compatibility strategy

Extend existing provider and plugin abstractions where practical. Avoid coupling the agent runtime to a single vendor SDK or a single message schema. Provider capability detection must be explicit: a protocol-compatible endpoint does not necessarily support image input, tool calling, structured output, or reasoning controls.

## Stability

New configuration must be documented, validated, and backward-compatible where possible. Experimental features should be opt-in until their behavior and migration path are established.
