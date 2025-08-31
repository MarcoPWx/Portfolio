---
layout: product
title: INGRESS RUNBOOK
product: DevMentor
source: infrastructure/kubernetes/INGRESS_RUNBOOK.md
---

{% raw %}
# Ingress and Istio Gateway Runbook

Last reviewed: 2025-08-23
Audience: Devs/Ops running DevMentor locally (kind) or in dev clusters

What this covers
- What “ingress” means in our setup (Istio ingress gateway + Gateway/VirtualService)
- How requests reach services
- Quickstart commands (port-forward + verification)
- Path routing and rewrites (e.g., /api/ai/* → ai-gateway)
- Troubleshooting and observability

Concepts
- Ingress (generic K8s): A resource that defines external HTTP(S) routing rules. Typically used with an Ingress Controller (e.g., NGINX ingress controller) to expose Services.
- Istio Ingress Gateway (our setup): Istio runs an Envoy-based gateway (Deployment + Service) that accepts external traffic. You define:
  - Gateway: which ports/hosts/TLS the gateway should accept
  - VirtualService: the HTTP routing rules (path matches, retries, timeouts, rewrites) that forward to internal Services
- In kind (local), there’s no external LoadBalancer IP. We use kubectl port-forward to make the Istio ingressgateway reachable on localhost.

ASCII: request flow

User (browser/curl)
  |
  | http://localhost:8080
  v
Istio IngressGateway (Envoy) — Namespace: istio-system — Service: istio-ingressgateway (ClusterIP)
  |
  | Gateway (devmentor-gateway)
  v
VirtualService (devmentor-routes) — path → destination Service
  |    e.g., /api/auth/*  → auth-service:3002
  |          /api/ai/*    → ai-gateway:3004
  v
Service (ClusterIP) → Pod(s) (Deployment)

Quickstart (local)
- Start a port-forward to the Istio ingressgateway (kind has no external LB):
  ```bash
  kubectl -n istio-system port-forward svc/istio-ingressgateway 8080:80
  ```
- Verify VirtualService and Gateway exist:
  ```bash
  kubectl get gateway,virtualservice -A
  kubectl -n devmentor get virtualservice devmentor-routes -o yaml
  ```
- Smoke test routes (examples):
  ```bash
  curl -s http://localhost:8080/api/auth/health | jq .
  curl -s http://localhost:8080/api/ai/pbml/status | jq .
  ```

Path routing and rewrites (Istio)
- VirtualService defines HTTP match rules, timeouts, retries, and destination Services.
- If your service expects a different path prefix than exposed, use a rewrite.
- Example: Route /api/ai/pbml/* to ai-gateway’s /api/pbml/* by adding a rewrite:
  ```yaml
  apiVersion: networking.istio.io/v1
  kind: VirtualService
  spec:
    gateways: [devmentor-gateway]
    hosts: ["*"]
    http:
      - match:
          - uri:
              prefix: /api/ai/pbml
        rewrite:
          uri: /api/pbml
        route:
          - destination:
              host: ai-gateway
              port:
                number: 3004
  ```
- Apply changes:
  ```bash
  kubectl apply -f your-virtualservice.yaml
  # Or patch directly
  # kubectl patch virtualservice devmentor-routes -n devmentor --type='json' -p='[ { "op":"add", "path":"/spec/http/2/rewrite", "value":{"uri":"/api"} } ]'
  ```

Common checks
- Is the gateway reachable?
  ```bash
  kubectl -n istio-system get svc istio-ingressgateway -o wide
  # In kind, EXTERNAL-IP is pending; use port-forward
  ```
- Are Services listening on expected ports?
  ```bash
  kubectl -n devmentor get svc
  ```
- Are pods Ready?
  ```bash
  kubectl -n devmentor get pods -o wide
  ```

Troubleshooting
- 404 from gateway: Verify VirtualService match rules (path prefixes) and hosts. Ensure Gateway name in VirtualService matches the deployed Gateway.
- 503 from gateway: Destination Service has no Ready endpoints (pods not Ready or selector mismatch). Check:
  ```bash
  kubectl -n devmentor get endpoints <service>
  kubectl -n devmentor describe svc <service>
  kubectl -n devmentor get pods -l app=<service-label> -o wide
  ```
- Path mismatch: If service expects /api/pbml but ingress uses /api/ai/pbml, add rewrite in VirtualService.
- No external IP (kind): Always use port-forward to istio-ingressgateway (8080:80) for local access.
- Sidecars and mesh visibility: Ensure the namespace is labeled for injection if needed and pods have the istio-proxy sidecar.

Observability
- Kiali (service mesh topology):
  ```bash
  kubectl -n istio-system port-forward svc/kiali 20001:20001
  # open http://localhost:20001
  ```
- Prometheus/Grafana: See docs/infrastructure/kube-prometheus-stack.md and use scripts/obs.

FAQ
- Ingress vs Ingress Controller vs Istio Gateway?
  - Ingress: routing rules (K8s resource)
  - Ingress Controller: component that implements Ingress (e.g., NGINX)
  - Istio Gateway: Istio’s Envoy-based gateway with its own Gateway + VirtualService model (we use this).
- Why port-forward? Local clusters (kind) don’t provision cloud LoadBalancers; port-forwarding exposes the gateway on localhost.

Runbook steps summary
1) Start port-forward to Istio ingressgateway
2) Confirm Gateway and VirtualService resources exist and match your routes
3) Curl key endpoints through ingress
4) Add/adjust rewrites for path alignment when needed
5) If 503/404, verify destination Service, endpoints, and selectors
6) Use Kiali/Prometheus/Grafana for deeper insights

References
- docs/infrastructure/kube-prometheus-stack.md
- docs/infrastructure/operations/COMMANDS.md
- docs/infrastructure/operations/SCALING_QUICKREF.md
- Istio docs: Gateways and VirtualServices

{% endraw %}
