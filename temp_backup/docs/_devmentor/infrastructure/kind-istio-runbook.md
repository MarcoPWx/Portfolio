---
layout: product
title: kind-istio-runbook
product: DevMentor
source: infrastructure/kind-istio-runbook.md
---

{% raw %}
# Kind + Istio Runbook (devmentor)

This runbook covers the local Kind cluster and Istio configuration that matches your setup and the screenshot (Gateway, VirtualService, DestinationRule, ServiceEntry) for services ai-gateway, auth-service, devmentor-gateway, devmentor-routes, and external-apis.

Last updated: 2025-08-23

---

## 1) Overview
- Local Kubernetes via Kind with node image `kindest/node:v1.33.1` and kubectl context `kind-devmentor`.
- Istio for service mesh features: ingress, routing, mTLS, traffic shifting, and controlled egress.
- Primary objects:
  - Gateway: `devmentor-gateway`
  - VirtualService: `devmentor-routes`
  - DestinationRules: `ai-gateway`, `auth-service`
  - ServiceEntry: `external-apis` (+ optional DR for TLS origination)

Prereqs: Docker, kind, kubectl, istioctl installed.

## 2) What the Kind creation messages mean
- Ensuring node image: pull image if missing
- Preparing nodes: create Docker containers for control-plane/worker
- Writing configuration: render cluster config
- Starting control-plane: start core control-plane components
- Installing CNI: install pod networking (kindnet)
- Installing StorageClass: default dynamic storage class
- Joining worker nodes: join workers via kubeadm
- Context set to `kind-devmentor`: kubectl now targets this cluster

## 3) Health checks
```bash
kubectl cluster-info --context kind-devmentor
kubectl --context kind-devmentor get nodes -o wide
kubectl --context kind-devmentor get sc
kubectl --context kind-devmentor -n kube-system get pods
```

## 4) Install Istio (demo profile for dev)
```bash
istioctl install --set profile=demo -y
kubectl get pods -n istio-system
kubectl create ns devmentor || true
kubectl label ns devmentor istio-injection=enabled --overwrite
```

## 5) Ingress access
- Port-forward:
```bash
kubectl -n istio-system port-forward svc/istio-ingressgateway 8080:80 8443:443
```
- Or expose ports 80/443 via Kind cluster config at creation time.

## 6) Istio object concepts
- Gateway (G): Edge listener and TLS config for ingress.
- VirtualService (VS): HTTP routing rules to in-mesh services.
- DestinationRule (DR): Policies and subsets (versions) for a destination.
- ServiceEntry (SE): Registers external services for egress.

## 7) Example manifests (namespace: devmentor)

Gateway
```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: devmentor-gateway
  namespace: devmentor
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - devmentor.local
```

VirtualService
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: devmentor-routes
  namespace: devmentor
spec:
  hosts:
  - devmentor.local
  gateways:
  - devmentor/devmentor-gateway
  http:
  - match:
    - uri:
        prefix: /api/ai
    route:
    - destination:
        host: ai-gateway.devmentor.svc.cluster.local
        subset: v1
        port:
          number: 80
  - match:
    - uri:
        prefix: /api/auth
    route:
    - destination:
        host: auth-service.devmentor.svc.cluster.local
        subset: v1
        port:
          number: 80
```

DestinationRules
```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: ai-gateway
  namespace: devmentor
spec:
  host: ai-gateway.devmentor.svc.cluster.local
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
  subsets:
  - name: v1
    labels: { version: v1 }
  - name: v2
    labels: { version: v2 }
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: auth-service
  namespace: devmentor
spec:
  host: auth-service.devmentor.svc.cluster.local
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
  subsets:
  - name: v1
    labels: { version: v1 }
```

ServiceEntry and DR for external APIs
```yaml
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: external-apis
  namespace: devmentor
spec:
  hosts:
  - api.example.com   # replace
  location: MESH_EXTERNAL
  ports:
  - number: 443
    name: https
    protocol: TLS
  resolution: DNS
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: external-apis-dr
  namespace: devmentor
spec:
  host: api.example.com   # replace
  trafficPolicy:
    tls:
      mode: SIMPLE   # originate TLS from the sidecar
```

Apply all (if saved to a file):
```bash
kubectl --context kind-devmentor apply -f manifests.yaml
```

## 8) Workloads and selectors
Your Deployments should label pods with `version: v1`/`v2` to match DR subsets and Services should select those pods. Example Service:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: ai-gateway
  namespace: devmentor
spec:
  selector:
    app: ai-gateway
  ports:
  - name: http
    port: 80
    targetPort: 8080
```

## 9) Traffic shifting (canary)
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: devmentor-routes
  namespace: devmentor
spec:
  hosts: [ "devmentor.local" ]
  gateways: [ "devmentor/devmentor-gateway" ]
  http:
  - match: [{ uri: { prefix: "/api/ai" } }]
    route:
    - destination: { host: ai-gateway.devmentor.svc.cluster.local, subset: v1, port: { number: 80 } }
      weight: 90
    - destination: { host: ai-gateway.devmentor.svc.cluster.local, subset: v2, port: { number: 80 } }
      weight: 10
```

## 10) mTLS quickstart
Enable STRICT mTLS for namespace:
```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: devmentor
spec:
  mtls:
    mode: STRICT
```

## 11) Validate end-to-end
```bash
# Host mapping for local ingress
sudo sh -c 'echo "127.0.0.1 devmentor.local" >> /etc/hosts'

# Send traffic via ingress
curl -i http://devmentor.local:8080/api/ai/health
curl -i http://devmentor.local:8080/api/auth/health

# Istio diagnostics
istioctl analyze
istioctl proxy-status
istioctl proxy-config routes deploy/ai-gateway -n devmentor
```

## 12) Observability (optional)
- Use Kiali, Prometheus, Grafana from Istio addons. Port-forward Kiali:
```bash
kubectl -n istio-system port-forward svc/kiali 20001:20001
```

## 13) Troubleshooting
- Missing sidecars: check `istio-injection=enabled` on namespace.
- 503/NR: subset labels mismatch or Service selectors wrong.
- Egress failing: ensure ServiceEntry exists and DR TLS mode set.
- Storage issues: check `kubectl get sc,pv,pvc`.

## 14) Cleanup
```bash
kubectl delete -n devmentor vs/devmentor-routes dr/ai-gateway dr/auth-service se/external-apis dr/external-apis-dr gw/devmentor-gateway || true
istioctl uninstall -y --purge
kind delete cluster --name devmentor
```

## 15) Security and secrets
- Never commit plaintext secrets. Use Kubernetes Secrets; reference via envFrom or mounted files.
- In commands, represent secrets as environment variables like `{{MY_TOKEN}}` rather than inline values.

{% endraw %}
