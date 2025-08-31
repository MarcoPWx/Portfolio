---
layout: product
title: SECURITY HARDENING BLUEPRINT
product: QuizMentor
source: security/SECURITY_HARDENING_BLUEPRINT.md
---

{% raw %}
# QuizMentor – Security Hardening Blueprint

Snapshot (5 words): Supabase RLS; PII minimization; redaction

Objective: Protect learner data and analytics while enabling fast feedback and adaptive learning.

Principles
- Use Supabase Auth + RLS to isolate user data per tenant/user.
- Minimize PII collection; redact in logs/traces.
- Prefer server‑side checks for resource ownership and access.

1) Identity & Access
- Supabase Auth
  - Enforce per‑table RLS policies (row owner/tenant).
  - Use policies for read/write separation; avoid bypassing RLS.
- API routes
  - Validate session; never trust client‑sent identifiers without cross‑checks.

2) Redaction & Logging
- Shared redaction utility for emails/tokens.
- No default body logging; enable only on safe endpoints.
- Mask identifiers in error boundaries and Storybook demos.

3) Data Storage & Retention
- Store only necessary session analytics (aggregated where possible).
- Encrypt sensitive columns that require retrieval.
- Tokenize cross‑service references.

4) Transport & Realtime
- Enforce HTTPS; secure WebSockets (wss).
- Limit channel scopes; avoid broadcasting PII.

5) Observability
- x-request-id/traceparent propagation; no Authorization in logs.
- Performance budgets and alerts for core flows (session start, adjust, submit).

6) Checklist
- Auth/RLS
  - [ ] Per‑table RLS policies documented and tested
  - [ ] API routes verify session and ownership
- Logging/Redaction
  - [ ] Redaction utility applied everywhere
  - [ ] No body logs on sensitive routes
- Data
  - [ ] Minimization and retention matrix
  - [ ] Encrypted columns/tokenization where appropriate
- Transport
  - [ ] HTTPS/wss; scoped realtime channels
- Observability
  - [ ] Redacted logs; budgets/alerts for P95 + errors

{% endraw %}

