---
layout: product
title: SECURITY HARDENING BLUEPRINT
product: DevMentor
source: security/SECURITY_HARDENING_BLUEPRINT.md
---

{% raw %}
# DevMentor – Security Hardening Blueprint

Snapshot (5 words): JWT edge; mTLS mesh; RBAC

Scope: This blueprint summarizes practical controls to apply across edge/gateway, mesh, services, storage, and observability for DevMentor.

Principles
- Minimize sensitive data exposure: default to redact; never log secrets.
- Validate at trust boundaries: verify JWT at the edge; enforce mTLS inside the mesh.
- Defense in depth: mesh-level authZ plus service-level RBAC/ABAC.
- Reversible vs irreversible: encrypt when you must recover; hash+pepper for match-only; redact elsewhere.

1) Edge/API Gateway
- JWT validation via IdP JWKS
  - Verify iss/aud/exp/nbf; enforce scope/roles.
  - Cache JWKS with TTL; handle rotation.
- Header scrubbing
  - Strip Authorization/Cookie from logs and analytics.
  - Drop Set-Cookie from response logs.
- Rate limiting/WAF
  - Per-IP/per-user baselines; block abusive patterns.
- Response headers
  - HSTS, CSP, X-Content-Type-Options, Referrer-Policy, secure cookie flags.

2) Istio Service Mesh
- mTLS: STRICT between workloads.
- requestAuthentication
  - Accept only trusted issuers/audiences for specific workloads.
- authorizationPolicy
  - Claims-based route-level policies (roles/scopes), and service identity checks.
- Envoy access log filters
  - Mask or drop Authorization/Cookie; disable body logging for sensitive paths.

3) Service-level AuthZ/Privacy
- RBAC/ABAC
  - Map JWT claims → app roles → fine-grained resource checks (owner/tenant).
- Structured logging with redaction utility
  - Mask emails, tokens, API keys, and known PII patterns.
  - Avoid logging request bodies by default; explicitly allow on safe routes.
- Token management
  - Do not store access tokens.
  - Refresh tokens: store salted+peppered hash (pepper from KMS/secret store).
  - Use jti; support rotation and revocation lists.

4) Data/Storage Controls
- Encrypt PII needing retrieval (KMS-managed keys; rotate regularly).
- Tokenization for high-risk fields; vault mapping.
- Retention and minimization policies per table/column.

5) Observability
- Propagate x-request-id/traceparent; never record Authorization.
- Scrub sensitive span attributes and logs by default.
- Metrics budgets: alert on error rate > 1% and P95 > SLO.

6) Example Istio Snippets (illustrative)
```yaml
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata: { name: devmentor-jwt, namespace: devmentor }
spec:
  selector:
    matchLabels: { app: api-gateway }
  jwtRules:
    - issuer: https://idp.example.com/
      audiences: [devmentor-api]
      jwksUri: https://idp.example.com/.well-known/jwks.json
---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata: { name: devmentor-allow, namespace: devmentor }
spec:
  selector:
    matchLabels: { app: learning-service }
  action: ALLOW
  rules:
    - from:
        - source:
            requestPrincipals: ["https://idp.example.com/*"]
      when:
        - key: request.auth.claims[scope]
          values: ["learning:read", "learning:write"]
```

7) Hardening Checklist
- Edge
  - [ ] JWT (JWKS) validation and header scrubbing
  - [ ] Rate limits and WAF rules
  - [ ] HSTS/CSP/security headers
- Mesh
  - [ ] mTLS STRICT; RequestAuthentication/AuthorizationPolicy
  - [ ] Envoy access log filters for masking
- Services
  - [ ] Redaction utility in all logs
  - [ ] No body logs by default; ABAC checks
  - [ ] Refresh tokens hashed+peppered; jti + revocation
- Data
  - [ ] Encrypted columns; tokenization where possible
  - [ ] Retention/minimization documented
- Observability
  - [ ] scrubbed spans/logs; x-request-id/traceparent
  - [ ] error/latency budgets and alerts

{% endraw %}

