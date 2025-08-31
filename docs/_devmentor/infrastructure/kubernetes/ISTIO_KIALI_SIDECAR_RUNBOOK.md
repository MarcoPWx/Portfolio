---
layout: product
title: ISTIO KIALI SIDECAR RUNBOOK
product: DevMentor
source: infrastructure/kubernetes/ISTIO_KIALI_SIDECAR_RUNBOOK.md
---

{% raw %}
# Istio + Kiali: Sidecar, mTLS, and Traffic Runbook

Last reviewed: 2025-08-23
Audience: Devs/Ops running DevMentor locally (kind) or in dev clusters

What you’re seeing in Kiali
- “Missing Sidecar”: Pod doesn’t have the istio-proxy sidecar. It will not participate in mesh features (mTLS, telemetry, routing). This is OK for DBs in dev, but not for services you want in mesh.
- “mTLS is enabled/partially enabled”: PeerAuthentication/mesh config is STRICT or PERMISSIVE. Partially enabled often means some workloads are outside the mesh (no sidecar) while others are in.
- “No inbound traffic”: Kiali shows app graph based on telemetry/Prometheus. If no requests hit the service (or sidecar is missing), it may show as no inbound traffic.

Decisions for DevMentor (recommended for dev)
- In mesh: ai-gateway, auth-service, api-gateway (when deployed)
- Out of mesh (OK): postgres, redis, ollama (resource-heavy / simple TCP). Kiali will flag “Missing Sidecar”, but it’s acceptable.

Quick checks
```bash
# Is namespace labeled for auto injection?
kubectl get ns devmentor -o jsonpath='{.metadata.labels.istio-injection}'
# Should be: enabled

# Do deployments have sidecars?
kubectl -n devmentor get pods -o jsonpath='{range .items[*]}{.metadata.name}{"  sidecars:"}{.spec.containers[*].name}{"\n"}{end}' | grep -E '(ai-gateway|auth-service)'
# Expect both app container + istio-proxy
```

Enable sidecar injection for a namespace
```bash
# Label namespace (idempotent)
kubectl label ns devmentor istio-injection=enabled --overwrite

# Restart deployments that should have a sidecar
kubectl -n devmentor rollout restart deploy/ai-gateway
kubectl -n devmentor rollout restart deploy/auth-service
# Optional (if you want DBs to join the mesh, usually NOT in dev)
# kubectl -n devmentor rollout restart deploy/postgres deploy/redis deploy/ollama
```

Exclude a specific deployment from injection (even if namespace is enabled)
```bash
kubectl -n devmentor patch deploy/redis \
  --type='json' \
  -p='[{"op":"add","path":"/spec/template/metadata/annotations/sidecar.istio.io~1inject","value":"false"}]'
```

mTLS modes
- STRICT: only mTLS traffic is allowed between sidecar’d workloads
- PERMISSIVE (recommended in dev): permits both plaintext and mTLS. Good while some pods are out of mesh (DBs).

Set PERMISSIVE in a namespace
```yaml
# file: permissive-peerauth.yaml
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: devmentor-permissive
  namespace: devmentor
spec:
  mtls:
    mode: PERMISSIVE
```
```bash
kubectl apply -f permissive-peerauth.yaml
```

Confirm in Kiali
- Overview: devmentor namespace should show “mTLS is enabled for this” but flows to out-of-mesh DBs will be in plain HTTP/TCP, which is fine for dev.

Troubleshooting
- Sidecar not injected after restart
  - Ensure label istio-injection=enabled on namespace
  - Pod template may have annotation sidecar.istio.io/inject: "false" — remove it
  - Check MutatingWebhookConfiguration istio-sidecar-injector is Ready
- 503 between services
  - Destination Service has no Ready endpoints or mTLS mismatch (STRICT vs plaintext)
  - Set PERMISSIVE while mixing sidecar’d and non-sidecar workloads
- No traffic in graph
  - Hit the service via ingress or curl directly in cluster. Kiali needs telemetry.

Useful commands
```bash
istioctl proxy-status
istioctl analyze -n devmentor
kubectl -n devmentor get pods -o wide
kubectl -n devmentor describe pod <pod>
```

Next steps for production-hardening
- Move DBs into mesh or create explicit AuthorizationPolicies
- Switch PeerAuthentication to STRICT once all relevant workloads have sidecars
- Add DestinationRules/PeerAuthentication per service as needed

References
- Ingress/Gateway routing: docs/infrastructure/kubernetes/INGRESS_RUNBOOK.md
- Monitoring and dashboards: docs/infrastructure/kube-prometheus-stack.md
- Commands reference: docs/infrastructure/operations/COMMANDS.md

{% endraw %}
