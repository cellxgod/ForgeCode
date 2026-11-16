# Contributing to ForgeCode

ForgeCode is an independent community fork of [OpenCode](https://github.com/anomalyco/opencode). It is not built by or affiliated with the OpenCode team. The upstream MIT license and copyright notices remain in the repository.

## Contribution priorities

- Correctness and reliability fixes
- Terminal usability and accessibility
- Model/provider compatibility with tested behavior
- Repository search and context quality
- Measurable performance improvements
- Security hardening and permission controls
- Documentation, packaging, and installation improvements

Before starting a large feature, open an issue describing the user problem, proposed behavior, security implications, and how success will be measured. Keep changes focused and preserve upstream attribution when modifying inherited code.

## Development

ForgeCode uses the Bun version declared in the root `package.json` or newer. From the repository root:

```bash
bun install
bun run dev .
```

The repository is a monorepo. Run tests and type checks from the affected package. For example:

```bash
cd packages/core
bun run test
bun run typecheck
```

Follow the nearest `AGENTS.md` instructions and existing package conventions. If a public Protocol or Server `HttpApi` changes, regenerate the client using the documented package workflow; do not hand-edit generated files.

## Pull requests

- Use conventional titles: `feat(scope): summary`, `fix(scope): summary`, `docs: summary`, `test: summary`, or `refactor: summary`.
- Explain the user-visible problem and the reason for the implementation.
- Include tests for behavior changes.
- State exactly which commands were run and whether they passed.
- Include before/after evidence for terminal UI changes.
- Do not claim performance gains without reproducible measurements on the same workload and hardware.
- Do not include credentials, private data, generated binaries, or unrelated formatting changes.

## Security

Treat model output, plugin responses, repository files, and generated shell commands as untrusted. Do not weaken approval checks or broaden tool permissions without a documented threat analysis and tests. Report exploitable vulnerabilities privately to the maintainers rather than publishing details in a public issue.

## Release discipline

A feature is not release-ready until it has tests, documentation, failure handling, and a clear migration path. Release artifacts must be reproducible and tested on the platforms they claim to support.
