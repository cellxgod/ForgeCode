# ForgeCode quickstart

ForgeCode currently uses the upstream Bun/TypeScript monorepo as its development foundation. The first release is not published yet; these steps run the CLI from a source checkout.

## Requirements

- Git
- Bun version `1.4.4` or newer (the repository pins its package manager version)
- A supported operating system and terminal

## Run from source

```bash
git clone https://github.com/cellxgod/ForgeCode.git
cd ForgeCode
git checkout forgecode/foundation
bun install
bun run dev --help
```

To start the interactive terminal in the current directory:

```bash
bun run dev .
```

The root `dev` script currently launches the inherited CLI entrypoint. The project is adding ForgeCode-specific commands incrementally; do not assume that every planned feature in the roadmap is available in this checkout.

## Command name

The CLI package now declares `forgecode` as an additional executable alias for the same entrypoint as `opencode`. This is a source/package metadata change; a globally installable ForgeCode distribution will be provided with the first release after packaging and platform smoke tests are complete.

## Model setup

Use the existing provider configuration and credential flows documented by the CLI. Never put API keys in source control, issue reports, screenshots, or shell commands that may be saved in history.

## Report a problem

Open a GitHub issue with the operating system, Bun version, exact command, expected behavior, actual behavior, and a minimal reproduction. Remove API keys, access tokens, private repository content, and personal data before submitting logs.

## Release status

There is no stable ForgeCode release yet. Watch the [GitHub repository](https://github.com/cellxgod/ForgeCode) for tagged releases and verified installation instructions.

## Read-only code review

The core agent registry includes a `review` specialist for bug, regression, security, and edge-case analysis. It is restricted to searching and reading project files: it cannot edit files, run shell commands, invoke nested agents, or access external directories. Ask the primary agent to delegate a review to `review`; see the [review agent guide](review-agent.md) for its permission boundary and expected findings format.
