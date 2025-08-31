---
layout: product
title: SCALING AND OPERATIONS
product: DevMentor
source: infrastructure/operations/SCALING_AND_OPERATIONS.md
---

{% raw %}
CURRENT ARCHITECTURE

## Scaling & Operations Guide

### Overview
- **Targets**: Kubernetes (Helm + Terraform), Docker Compose (dev), Cloud integrations (CDN/Cloudflare), Sentry
- **Services**: `devmentor-ui`, `api-gateway`, `ai-gateway`, `auth-service`, `memory-service`, `project-service`, `learning-engine`

### Kubernetes: Deploy + Scale
- **Replica scaling (Helm values example)**
```yaml
# values.yaml
apiGateway:
  replicaCount: 2
  resources:
    requests: { cpu: 200m, memory: 256Mi }
    limits:   { cpu: 500m, memory: 512Mi }
```
- **HPA (autoscaling/v2)**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```
- **Apply**
```bash
kubectl apply -f k8s/autoscaling/api-gateway-hpa.yaml
# or if templated via Helm
helm upgrade --install devmentor charts/devmentor -f values.yaml
```

### Terraform structure (example)
```hcl
# terraform/modules/kubernetes/main.tf
module "devmentor_cluster" {
  source = "./eks" # or kind/gke/aks module
}

module "observability" {
  source  = "./helm_release"
  name    = "loki"
  chart   = "grafana/loki-stack"
  version = "^2.10"
  values  = [file("values/observability/loki.yaml")]
}

module "devmentor" {
  source  = "./helm_release"
  name    = "devmentor"
  chart   = "./charts/devmentor"
  values  = [file("values/devmentor/values.yaml")]
}
```

### Docker images (baseline)
- Build targets exist for: `ai-gateway`, `api-gateway`, `auth-service`, `memory-service`, `project-service`, `learning-engine`, `devmentor-ui`.
- Use resource requests/limits in k8s; for Compose use local machine defaults.

### Logs & Observability
- **Local (Compose)**: Dozzle UI
  - Start: `docker compose up -d dozzle`
  - UI: `http://localhost:8890`
- **Kubernetes**: Loki + Promtail via Helm
```bash
helm repo add grafana https://grafana.github.io/helm-charts && helm repo update
helm upgrade --install loki grafana/loki-stack -n observability --create-namespace \
  --set promtail.enabled=true --set grafana.enabled=false
```
- Works great with Lens/OpenLens (set data source = Loki). Use LogQL to filter by `app`, `container`, `namespace`.

### Traffic, CDN, WAF
- **Ingress**: Prefer Istio IngressGateway (already used). For NGINX Ingress, mirror rules if needed.
- **Cloudflare**: 
  - Set DNS to your ingress load balancer, enable proxy (orange cloud) for CDN/WAF.
  - mTLS/HTTPS termination at Cloudflare → Ingress TLS.
  - Turnstile is already supported in UI login route via `TURNSTILE_SECRET`.
- **CDN assets**: Move static assets to S3/Cloudflare R2 and expose via CDN; set `ASSET_BASE_URL` in UI.

### Sentry integration
- **Env**: `SENTRY_DSN`, `SENTRY_ENV`, `RELEASE`
- **Next.js (UI)**
```ts
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';
Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 0.1 });
```
- **Node services**
```ts
import * as Sentry from '@sentry/node';
Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.1 });
```
- **Helm values injection**
```yaml
env:
  - name: SENTRY_DSN
    valueFrom:
      secretKeyRef: { name: sentry, key: dsn }
```

### Scale up/down quick commands
```bash
# Manual replicas
kubectl scale deployment api-gateway --replicas=3 -n devmentor-app

# Tune HPA
kubectl patch hpa api-gateway-hpa -p '{"spec":{"minReplicas":2,"maxReplicas":12}}' -n devmentor-app
```

### Security & policies
- Set requests/limits on all pods. Add PDBs for critical services. Use NetworkPolicies between namespaces.
- Store secrets in external manager (Vault/Secrets Manager) and sync to k8s Secrets.

### Checklists
- **Local**: UI, gateways, services up; Dozzle reachable; errors free
- **K8s**: HPA healthy; Loki logs visible; Sentry events arriving; CDN caching assets; Cloudflare WAF on {% endraw %}
