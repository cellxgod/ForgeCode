# ForgeCode

**A high-performance, extensible AI coding environment built for serious terminal-first development.**

ForgeCode is an independent open-source project and a community fork of [OpenCode](https://github.com/anomalyco/opencode). It aims to make large codebases easier to understand, change, test, and ship through a fast terminal experience, reliable agent orchestration, broad model connectivity, and security-first execution.

> ForgeCode is not built by, endorsed by, or affiliated with the OpenCode team. It retains the upstream project's MIT license and attribution. See [LICENSE](./LICENSE) and [the upstream project](https://github.com/anomalyco/opencode).

## Project principles

- **Terminal first:** low latency, keyboard-driven workflows, readable output, and composable commands.
- **Model freedom:** hosted and local models, provider-specific APIs, OpenAI-compatible endpoints, and user-defined endpoints.
- **Useful autonomy:** agents plan, edit, run checks, inspect failures, and report evidence; consequential actions remain reviewable.
- **Fast on real repositories:** incremental indexing, bounded context, parallel work with isolation, and measurable resource use.
- **Secure by default:** explicit tool permissions, secret redaction, sandbox-aware execution, and auditable actions.
- **Open and extensible:** documented plugin interfaces, stable configuration, and reproducible benchmarks.

## Status

ForgeCode is in its foundation stage. The current repository is a fork of the upstream codebase; ForgeCode-specific capabilities are being developed and validated incrementally. Roadmap items are goals, not claims that features are already implemented.

## Development

The upstream codebase is a Bun-powered TypeScript monorepo. Start by reviewing the existing contribution and development instructions, then install the pinned toolchain and dependencies:

```bash
bun install
bun run dev
```

Use the package-level scripts and CI workflows for targeted tests and type checks. Do not assume a full test suite has passed unless it has been run on the exact commit.

## Documentation

- [Architecture direction](docs/forgecode/architecture.md)
- [API and provider compatibility](docs/forgecode/api-compatibility.md)
- [Roadmap](docs/forgecode/roadmap.md)
- [Benchmark policy](docs/forgecode/benchmarks.md)
- [Security model](docs/forgecode/security.md)

## Contributing

Contributions should include tests for behavior changes, document provider-specific limitations, avoid leaking credentials, and preserve upstream license notices. Performance claims must include reproducible workloads and measurements.

## Upstream attribution

ForgeCode builds on the open-source work in [anomalyco/opencode](https://github.com/anomalyco/opencode). Copyright notices and the MIT license are retained. This project will clearly identify its changes and maintain its own release and support policy.
