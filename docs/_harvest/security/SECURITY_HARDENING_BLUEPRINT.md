---
layout: product
title: SECURITY HARDENING BLUEPRINT
product: Harvest.ai
source: security/SECURITY_HARDENING_BLUEPRINT.md
---

{% raw %}
# Harvest.ai – Security Hardening Blueprint

Snapshot (5 words): BYOK ephemeral default; encrypted opt-in

Purpose: Protect user content and keys across ingestion, generation, and delivery while maintaining transparency and privacy.

Core stance
- BYOK defaults to session‑only (memory) usage via proxy; no server‑side storage.
- If storage is required, use opt‑in encrypted-at-rest with audit logs.
- Redact by default in logs/traces/analytics.

1) Edge/API Layer
- Key handling (BYOK)
  - Prefer ephemeral, memory‑only usage per request/session; auto‑wipe on completion.
  - If persisted, encrypt with KMS; rotate keys; audit access.
- JWT/OAuth (if applicable)
  - Validate tokens via JWKS; enforce scopes/roles per route.
- Header scrubbing & WAF
  - Strip Authorization/Cookie; rate limit; bot rules.
- Response headers: HSTS, CSP, secure cookies.

2) Job Orchestrator & Queues
- Retries with exponential backoff + circuit breakers; mark partials safely.
- Never enqueue sensitive raw content without encryption/tokenization.
- Idempotency keys to avoid duplicate processing.

3) Provider Routing
- Multi‑provider fallback with explicit cost/quality accounting.
- Contract test prompts to prevent accidental PII leakage in provider logs.
- Provider health checks; auto‑disable unhealthy routes.

4) Storage Controls
- Content outputs: encrypted at rest; signed URLs with short TTL.
- Metadata minimization; avoid storing raw inputs where not needed.
- Tokenization for any cross‑system references (replace with random tokens).

5) Observability & Transparency
- Cost/latency/token meters; surface fallbacks and errors.
- Logs/spans: scrub emails/tokens/API keys; never store Authorization.
- P95 latency/error budgets; alerts on cost spikes and error bursts.

6) Example Config Notes (illustrative)
- Redis keys: avoid embedding PII; use opaque IDs.
- CDN cache: cache only safe, redacted artifacts; bypass for sensitive endpoints.
- Webhooks: sign with HMAC; rotate secrets; verify on receipt.

7) Hardening Checklist
- BYOK
  - [ ] Session‑only default (no persistence)
  - [ ] Encrypted storage opt‑in with audit log
  - [ ] Provider key validation route; zero‑retention proxy
- Edge/Gateway
  - [ ] JWT validation (if present); header scrubbing
  - [ ] Rate limits; WAF
- Orchestrator
  - [ ] Backoff + circuit breaker; idempotency keys
  - [ ] No raw PII in queues
- Storage
  - [ ] Encrypted outputs; short‑TTL signed URLs
  - [ ] Minimized metadata; tokenization
- Observability
  - [ ] Redacted logs/spans; cost/latency dashboards; alerts

{% endraw %}

