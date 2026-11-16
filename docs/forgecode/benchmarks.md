# Benchmark policy

ForgeCode will not use unsupported claims such as "10x faster" or "better than every coding agent." Performance and quality claims must be reproducible and tied to a specific commit, machine, model, and workload.

## Performance measurements

- Cold and warm startup time.
- Time to first visible response and first useful tool action.
- Repository discovery and indexing time by repository size.
- Peak and steady-state memory, CPU use, and background I/O.
- Model request latency, tokens per second, retries, and token usage.
- End-to-end task duration, including verification.

## Quality measurements

- Task success rate against a fixed issue set.
- Tests passed, regressions introduced, and patch acceptance rate.
- Correctness of repository navigation and symbol retrieval.
- Human review time and number of manual corrections.
- Security-policy violations and unsafe tool attempts blocked.

## Fair comparison protocol

1. Pin the exact ForgeCode and competitor versions/commits.
2. Use identical hardware, OS, repository snapshots, prompts, and model versions where possible.
3. Publish the complete task set, configuration, and raw results.
4. Run multiple trials and report median plus spread, not only the best run.
5. Separate model quality from client/runtime performance.
6. Include failures, timeouts, and resource consumption.

A claim is publishable only when the benchmark can be independently reproduced. Faster output is not an improvement if correctness, safety, or verification quality falls.
