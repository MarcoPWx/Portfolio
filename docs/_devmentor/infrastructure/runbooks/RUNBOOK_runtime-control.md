---
layout: product
title: RUNBOOK runtime-control
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_runtime-control.md
---

{% raw %}
# Runtime Control Runbook

Audience: Platform/DevOps, Backend, Senior Developers
Scope: Secrets via Vault + External Secrets Operator (ESO), Feature Flags via OpenFeature + self-hosted provider, minimal Remote Config, and Istio traffic management (ingress/egress, canary).

Prerequisites
- Kubernetes cluster (Kind: devmentor) with Istio installed
- Vault (or chosen secret store) reachable from the cluster
- Monitoring stack accessible (Prometheus, Grafana, Kiali)
- kubectl, istioctl available locally

Concepts (glossary)
- Idempotency: Running the same operation multiple times results in the same final state. Example: our Unleash seed Job can be applied repeatedly; existing flags are left as-is (HTTP 409 conflicts are ignored) so you won’t create duplicates.
- Weights (Istio): Percentages attached to multiple destinations for the same route. Example: ai-gateway v1 weight 90 and v2 weight 10 ≈ roughly 90%/10% of requests over time.
- Quick canary: A small, short-lived traffic shift to a new version (v2) to validate health and error rates before a full rollout. Typical path: 5% → 10% → 25% → 50% → 100% with monitoring between steps.

1) Secrets with Vault + External Secrets Operator (ESO)
- Install ESO (cluster-scoped) and configure ClusterSecretStore for Vault using Kubernetes auth.
- Create ExternalSecrets per service to sync secrets into K8s Secrets.
- Update Deployments to consume env from those Secrets and verify rollout.

Example: ClusterSecretStore + ExternalSecret (adjust host/paths)
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: devmentor-vault
spec:
  provider:
    vault:
      server: https://vault.example.com
      path: kv/data
      version: v2
      auth:
        kubernetes:
          mountPath: kubernetes
          role: devmentor
          serviceAccountRef:
            name: default
            namespace: devmentor-app
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-gateway-secrets
  namespace: devmentor-app
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: devmentor-vault
    kind: ClusterSecretStore
  target:
    name: api-gateway-secrets
    creationPolicy: Owner
  data:
    - secretKey: REDIS_URL
      remoteRef: { key: devmentor/api-gateway, property: REDIS_URL }
    - secretKey: JWT_SECRET
      remoteRef: { key: devmentor/api-gateway, property: JWT_SECRET }
```

Verification
- kubectl -n devmentor-app get externalsecret,secret | grep api-gateway
- Describe ExternalSecret for sync status and errors
- Restart rollout if needed; confirm pods have env via describe pod

2) Feature Flags with OpenFeature + Provider
- Chosen provider: Unleash (self-hosted). Alternatives: Flagsmith.
- Deploy Unleash to devmentor-app; seed initial flags.
- Integrate OpenFeature SDK in api-gateway and ai-gateway; gate 2–3 features.
- Recommended Unleash defaults: admin UI on /, API on /api; secure with admin token in K8s Secret; back with Postgres.

Flags to start with
- new-ui-enabled (boolean): toggles new UI components
- ai-safety-pii (boolean): enables PII detection pipeline
- ai-provider-openai-enabled (boolean): enables OpenAI provider in AI gateway

Node integration sketch
```js
import { OpenFeature } from '@openfeature/js-sdk';
// const provider = new UnleashProvider({ url, appName: 'devmentor', instanceId });
OpenFeature.setProvider(provider);
const client = OpenFeature.getClient('api-gateway');
const enabled = await client.getBooleanValue('new-ui-enabled', false, { userId: req.user?.id });
```

Verification
- Flip new-ui-enabled for a test user in the provider UI and verify behavior changes without restarts.
- Add a health endpoint to print current evaluated values (non-secret) for debugging.

3) Minimal Remote Config
- Represent non-secret runtime knobs (timeouts, cache TTLs) as typed flags first.
- Optional: add a small config-service later for structured config with Redis pub/sub to push updates.

4) Istio Traffic Management
- Apply Gateway and VirtualService for devmentor.local, with routes to api-gateway, auth-service, ai-gateway, project-service.
- Add DestinationRules with subsets v1/v2 for canary routing.
- Add ServiceEntry to allow egress to approved external AI APIs.
- Start with PeerAuthentication PERMISSIVE in dev; move to STRICT when stable.

Canary example (90/10)
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: devmentor-routes
  namespace: devmentor-app
spec:
  hosts: [ devmentor.local ]
  gateways: [ devmentor-gateway ]
  http:
    - match: [ { uri: { prefix: "/api/ai" } } ]
      route:
        - destination: { host: ai-gateway.devmentor-app.svc.cluster.local, subset: v1 }
          weight: 90
        - destination: { host: ai-gateway.devmentor-app.svc.cluster.local, subset: v2 }
          weight: 10
```

Verification (Traffic)
- Port-forward ingress gateway (or use existing): kubectl -n istio-system port-forward svc/istio-ingressgateway 8080:80
- Curl through http://localhost:8080 and confirm route behavior
- Kiali graph shows requests to v1 and v2 as per weights

Quick Canary Procedure (ai-gateway)
1) Ensure two Deployments exist: ai-gateway (version: v1) and ai-gateway-v2 (version: v2)
2) Apply Grafana dashboard: kubectl apply -f infrastructure/k8s/monitoring/grafana-dashboard-canary.yaml
3) Set VirtualService weights to 95/5 (v1/v2), apply, and monitor 5–10 minutes
4) Check: error rate < 1%, p95 latency similar, no spike in 5xx
5) Increase to 90/10, then 75/25 as needed, repeating checks
6) If stable, proceed to 0/100 (full cutover); otherwise rollback

For detailed steps: See docs/infrastructure/runbooks/RUNBOOK_canary-rollouts.md

Rollback (Traffic)
- Edit VirtualService to 100% v1; kubectl apply -f manifest.yaml
- Confirm in Kiali and via curl

5) Observability Hooks
- Ensure Prometheus is scraping the gateways/services; add ServiceMonitor/PodMonitor as needed.
- Provision a basic Grafana dashboard: gateway latency, error rate, success rate; flag evaluation counts (if provider exposes metrics).

6) Security and Compliance Notes
- Secrets: Never expose values in logs or admin UIs. Admin UI may trigger rotations and show status, not values.
- Flags: Keep defaults safe; production toggles should degrade gracefully if provider is unavailable.
- Egress: Only allow needed domains via ServiceEntry; prefer TLS origination at egress if required.

7) Troubleshooting
- ExternalSecret stuck pending: check ClusterSecretStore auth, Vault path/version, ESO logs
- Flags not toggling: check provider URL, SDK provider registration, network policies
- Traffic not splitting: verify Deployment labels match DestinationRule subsets (version: v1/v2)
- Sidecars missing: ensure namespace has istio-injection=enabled; restart pods

8) Run Commands (quick helpers)
```bash
# ESO resources
kubectl get clustersecretstores,externalsecrets,secrets -A

# Kiali, Grafana, Prometheus port-forwards
kubectl -n istio-system port-forward svc/kiali 20001:20001 &
kubectl -n monitoring port-forward svc/grafana 3000:80 &
kubectl -n monitoring port-forward svc/prometheus-k8s 9090:9090 &

# Istio traffic resources
kubectl -n devmentor-app get gateway,virtualservice,destinationrule,serviceentry
```

Change Management
- All manifests live in version control (infrastructure/k8s/...)
- Changes PR’d with reviewers from Platform + Security
- Rollback steps documented for each change

{% endraw %}
