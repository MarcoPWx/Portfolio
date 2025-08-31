---
layout: product
title: 2025-08-21-mesh-ollama-observability
product: DevMentor
source: devlog/2025-08-21-mesh-ollama-observability.md
---

{% raw %}
# DevLog — 2025-08-21 — Mesh injection, AI Gateway sidecar fix, Ollama scaling, observability updates

Date: 2025-08-21
Author: DevMentor Platform

Summary
- Enabled Istio sidecar injection on the devmentor namespace and restarted deployments
- Removed ai-gateway sidecar override annotation and verified sidecar injection (2/2 Running)
- Scaled ollama deployment to 1 replica to resolve Pending pod due to resource pressure
- Updated EPIC_MANAGEMENT to include a Kubernetes Deployment Snapshot and references
- Confirmed postgres and redis healthy; auth-service with sidecar; ai-gateway healthy with sidecar
- Prepared next steps to deploy monitoring-service to Kubernetes and consolidate observability

Commands Executed
```bash
kubectl label ns devmentor istio-injection=enabled --overwrite
kubectl get deploy -n devmentor -o name | xargs -r -n1 kubectl rollout restart -n devmentor
kubectl patch deploy/ai-gateway -n devmentor --type=json -p='[{"op":"remove","path":"/spec/template/metadata/annotations/sidecar.istio.io~1inject"}]'
kubectl rollout restart deploy/ai-gateway -n devmentor
kubectl rollout status deployment/ai-gateway -n devmentor --timeout=120s
kubectl get pods -n devmentor -o wide | grep ai-gateway
kubectl scale deploy/ollama -n devmentor --replicas=1
kubectl get deploy/ollama -n devmentor -o custom-columns=NAME:.metadata.name,REPLICAS:.spec.replicas,AVAILABLE:.status.availableReplicas --no-headers
```

Verification
- ai-gateway pod shows 2/2 containers running with sidecar injected
- ollama deployment now 1/1 available
- auth-service shows 2/2 Running
- postgres and redis 1/1 Running

Next Steps
- Deploy monitoring-service manifests: infrastructure/k8s/services/monitoring-service/
- Verify monitoring-service service and deployment in devmentor namespace
- Confirm Grafana provisioning loads enhanced dashboards and data sources
- Continue Keycloak deployment and apply Istio RequestAuthentication and AuthorizationPolicy

{% endraw %}
