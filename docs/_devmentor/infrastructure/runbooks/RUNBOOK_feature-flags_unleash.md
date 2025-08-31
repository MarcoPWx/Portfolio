---
layout: product
title: RUNBOOK feature-flags unleash
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_feature-flags_unleash.md
---

{% raw %}
# Unleash Feature Flags Runbook

Audience: Platform/DevOps, Backend
Scope: Deploy Unleash (self-hosted) for feature flags and integrate with OpenFeature SDK in services.

Overview
- Unleash provides a UI and API for feature flags.
- We’ll deploy it in namespace devmentor-app, backed by Postgres.
- Services consume flags via OpenFeature + Unleash provider.

1) Prereqs
- Kubernetes cluster running
- Postgres available (can reuse dev Postgres or add a small instance)
- K8s Secret for UNLEASH_ADMIN_TOKEN

2) K8s Manifests (skeleton)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: unleash-admin
  namespace: devmentor-app
stringData:
  UNLEASH_ADMIN_TOKEN: "{{generate_a_strong_token}}"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: unleash
  namespace: devmentor-app
spec:
  replicas: 1
  selector:
    matchLabels: { app: unleash }
  template:
    metadata:
      labels: { app: unleash }
    spec:
      containers:
        - name: unleash
          image: unleashorg/unleash-server:latest
          ports:
            - containerPort: 4242
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: postgres-conn
                  key: DATABASE_URL
            - name: UNLEASH_ADMIN_TOKEN
              valueFrom:
                secretKeyRef:
                  name: unleash-admin
                  key: UNLEASH_ADMIN_TOKEN
          readinessProbe:
            httpGet: { path: /health, port: 4242 }
            initialDelaySeconds: 10
            periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: unleash
  namespace: devmentor-app
spec:
  selector: { app: unleash }
  ports:
    - name: http
      port: 4242
      targetPort: 4242
```

3) Access (dev)
- Port-forward: kubectl -n devmentor-app port-forward svc/unleash 4242:4242
- Open http://localhost:4242 (use UNLEASH_ADMIN_TOKEN for API or create admin user if UI requires)

4) Seed flags (idempotent Job)
- Apply the seeding Job (safe to re-run; it won’t duplicate existing flags):
```bash
kubectl -n devmentor-app apply -f infrastructure/k8s/unleash/unleash-seed-job.yaml
kubectl -n devmentor-app logs job/unleash-seed-flags
```
- Flags created: new-ui-enabled, ai-safety-pii, ai-provider-openai-enabled
- Default state: off (safe). Enable per environment in the Unleash UI as needed.

5) Service integration (OpenFeature)
- Install OpenFeature SDK + Unleash provider in api-gateway and ai-gateway
- Initialize provider with Unleash URL (ClusterIP) and instance identifiers
- Evaluate flags per request/user context

6) Verification
- Toggle new-ui-enabled in Unleash and verify behavior changes without redeploys
- Add debug endpoint to print evaluated flag values for a test user (non-secret)

7) Rollback
- Scale Unleash deployment to 0 or remove
- Services default to safe flag values

8) Troubleshooting
- 403/401 from API: check admin token and network policies
- Flags not updating: verify provider polling/stream and service connectivity
- DB errors: check DATABASE_URL secret and Postgres readiness

{% endraw %}
