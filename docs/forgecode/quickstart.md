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

The root `dev` script currently launches the inherited CLI entrypoint. ForgeCode-specific commands and packaging are being added incrementally; do not assume every roadmap feature is available in this checkout.

## Command name and native builds

The CLI package declares `forgecode` as an additional executable alias. The dedicated `build:forgecode` script builds a native executable named `forgecode` and writes ForgeCode-scoped platform package metadata. Stable installation instructions will be published with the first tagged release.

## Model setup

Use the existing provider configuration and credential flows documented by the CLI. Never put API keys in source control, issue reports, screenshots, or shell commands that may be saved in history.

## Read-only code review

The core agent registry includes a `review` specialist for bug, regression, security, and edge-case analysis. It is restricted to searching and reading project files: it cannot edit files, run shell commands, invoke nested agents, or access external directories. Ask the primary agent to delegate a review to `review`; see the [review agent guide](review-agent.md) for its permission boundary and expected findings format.

## Report a problem

Open a GitHub issue with the operating system, Bun version, exact command, expected behavior, actual behavior, and a minimal reproduction. Remove API keys, access tokens, private repository content, and personal data before submitting logs.

## Release status

No stable ForgeCode release is published yet. The repository has a manual release workflow for building Linux x64, macOS arm64, and Windows x64 binaries. Release publication is gated on successful builds and is not triggered automatically by commits.
