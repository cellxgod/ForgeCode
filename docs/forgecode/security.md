# Security model

ForgeCode is intended to execute tools that can read files, modify repositories, and run commands. Security must be designed into the runtime rather than treated as a prompt-only instruction.

## Required principles

- Apply least privilege to filesystem, shell, network, and external tool access.
- Distinguish read-only inspection from writes, destructive commands, and network side effects.
- Require explicit approval for high-impact actions unless the user has deliberately configured a narrower trusted policy.
- Keep secrets out of prompts, source files, shell history, logs, crash reports, and benchmark artifacts.
- Redact credentials and sensitive environment values in diagnostics.
- Make tool calls, approvals, denials, and file changes inspectable.
- Propagate cancellation and enforce time, output, and resource limits.

## Agent boundaries

Agent-generated plans are untrusted input. Validate paths, command arguments, and tool parameters at execution boundaries. Prevent path traversal and unintended writes outside the selected workspace. Parallel workers should have isolated scopes and must not share mutable state without coordination.

## Provider and plugin boundaries

Provider endpoints and plugin servers are external trust boundaries. Validate URLs and transport settings, avoid leaking credentials across hosts, and document which data is sent to each provider. MCP and custom plugins should receive only the tools and resources required for the task.

## Reporting vulnerabilities

Do not publish exploitable details in public issues before maintainers have had a reasonable opportunity to investigate. A dedicated private security contact and disclosure process should be established before a stable public release.

## Release gate

No feature that expands shell, filesystem, network, or autonomous write access should become a default-on feature without tests and a documented threat assessment.
