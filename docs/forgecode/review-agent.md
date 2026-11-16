# Read-only code review agent

ForgeCode registers a built-in `review` subagent for focused, evidence-backed code review. The role is intentionally narrower than the primary coding agent.

## What it checks

- Correctness defects, regressions, and edge cases
- Security issues, unsafe permissions, and untrusted input handling
- Data loss, race conditions, resource leaks, and cancellation failures
- API, configuration, and platform compatibility

## Permission boundary

The reviewer can only search and read files through `grep`, `glob`, and `read`. It cannot run shell commands, edit files, invoke nested subagents, or access external directories. Reads of `.env` and `.env.*` files require approval; `.env.example` remains readable.

## How to use it

Ask the primary agent to delegate a review of the current change or a named set of files to the `review` subagent. Provide the intended behavior and relevant diff context so the reviewer can focus on what changed.

Each finding should include severity, file path and line range when available, a concrete trigger, impact, and a concise fix. Findings should be evidence-backed and ordered by severity. If no actionable issues are found, the reviewer should say so and describe the scope it inspected.

The reviewer does not modify code and does not claim to have run tests. Review findings are not a substitute for automated tests or human approval.
