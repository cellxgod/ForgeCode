# API and provider compatibility

## Goal

ForgeCode aims to connect to the widest practical range of hosted and self-hosted model services without pretending that every service implements the same API. Compatibility is capability-based, not based only on a provider name.

## Connection categories

| Category | Intended support | Notes |
|---|---|---|
| Native provider adapters | Existing and additional first-class integrations | Preserve provider-specific authentication, streaming, tool, media, and usage behavior. |
| OpenAI-compatible chat/completions | Configurable base URL and model | Common denominator only; extensions vary by server. |
| OpenAI-compatible Responses | Where endpoint implements the Responses contract | Do not assume chat-completions and Responses are interchangeable. |
| Anthropic Messages | Native adapter | Support provider-specific tool and thinking semantics where exposed. |
| Google Gemini / Vertex AI | Native adapter | Distinguish API key, OAuth, and cloud identity flows. |
| Local inference servers | Ollama, LM Studio, llama.cpp server, vLLM, LocalAI, and compatible endpoints | Model discovery and capabilities vary by server/version. |
| Gateways and aggregators | OpenRouter and other compatible gateways | Preserve upstream model identifiers and provider metadata. |
| Custom HTTP services | Configurable adapter or plugin | Require explicit schema and authentication configuration; no arbitrary code execution from config. |

## Protocols and transports

The compatibility roadmap covers HTTP/REST, JSON request/response APIs, SSE streaming, WebSocket-based model streams, and MCP over its supported transports. gRPC and JSON-RPC integrations should be added through explicit adapters when there is a concrete service and tested contract. A protocol being technically possible does not mean every model endpoint supports it.

## Authentication

Provider adapters may support API keys, bearer tokens, OAuth 2.0, cloud identity, environment variables, and custom headers where the service allows them. Secrets must be stored through the existing credential facilities, redacted from logs and diagnostics, and never written into project files by default. Custom headers must not override security-sensitive transport behavior without validation.

## Capability model

Each model connection should declare or discover capabilities such as:

- text input and output
- image, audio, and video input/output
- tool/function calling
- constrained or structured output
- streaming and cancellation
- reasoning controls
- context window and output limits
- embeddings and reranking, where applicable

Unknown capabilities are treated as unknown, not silently assumed. The UI and agent planner must avoid sending unsupported payloads and should explain fallbacks.

## Reliability requirements

Adapters should normalize rate-limit and transient errors, support bounded retries with jitter, honor `Retry-After`, expose usage and latency, and propagate cancellation. Retries must not duplicate non-idempotent tool actions. Streaming parsers require tests for partial chunks, malformed frames, disconnects, and final usage events.

## Provider contribution checklist

1. Document base URL, endpoints, authentication, model naming, and supported API version.
2. Declare capabilities and known limitations.
3. Add tests for normal responses, streaming, tool calls, errors, cancellation, and credential redaction as applicable.
4. Add configuration and setup documentation.
5. Do not claim compatibility based only on a successful health check.

This document describes the target and the categories to validate. It is not a claim that every listed service or protocol is already implemented in ForgeCode.
