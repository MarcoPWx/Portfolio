---
layout: product
title: RUNBOOK canary-rollouts
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_canary-rollouts.md
---

{% raw %}
# Canary Rollouts Runbook

Audience: Platform/DevOps, Release Engineering
Scope: Execute and monitor canary deployments using Istio traffic management

Prerequisites
- Two Deployment versions (v1 and v2) labeled with `version: v1` and `version: v2`
- Istio VirtualService and DestinationRules configured with subsets
- Prometheus + Grafana with Istio telemetry enabled
- Kiali for visual service mesh topology

## Canary Release Strategy

What: Gradually shift traffic from stable (v1) to canary (v2) while monitoring health metrics
Why: Minimize blast radius of bad changes; catch issues early with real traffic
When: Medium/high-risk changes, new features, performance optimizations

## Pre-Canary Checklist

- [ ] v2 Deployment created and running (kubectl -n devmentor-app get deploy | grep v2)
- [ ] Readiness/liveness probes passing on v2 pods
- [ ] Grafana "Quick Canary" dashboard applied:
  ```bash
  kubectl apply -f infrastructure/k8s/monitoring/grafana-dashboard-canary.yaml
  ```
- [ ] Baseline metrics recorded (error rate, p95 latency, RPS for v1)
- [ ] Rollback plan documented and tested

## Step-by-Step Canary Procedure

### Phase 1: Start Small (5%)
```bash
# Edit VirtualService weights
kubectl edit virtualservice devmentor-routes -n devmentor-app
# Set v1: 95, v2: 5
```

Monitor for 5-10 minutes:
- [ ] Error rate delta < 0.5%
- [ ] P95 latency within 10% of baseline
- [ ] No 5xx spike in logs
- [ ] Grafana dashboard: http://localhost:3000/d/quick-canary

### Phase 2: Increase Confidence (10%)
```bash
# Set v1: 90, v2: 10
kubectl edit virtualservice devmentor-routes -n devmentor-app
```

Monitor for 10-15 minutes:
- [ ] Error rate stable
- [ ] CPU/memory usage normal on v2 pods
- [ ] No customer complaints

### Phase 3: Expand Testing (25%)
```bash
# Set v1: 75, v2: 25
kubectl edit virtualservice devmentor-routes -n devmentor-app
```

Monitor for 15-20 minutes:
- [ ] All key business metrics green
- [ ] Feature flags (if any) working correctly
- [ ] Database queries not degraded

### Phase 4: Half Traffic (50%)
```bash
# Set v1: 50, v2: 50
kubectl edit virtualservice devmentor-routes -n devmentor-app
```

Monitor for 30 minutes:
- [ ] Extended soak test passing
- [ ] No memory leaks visible
- [ ] Distributed tracing shows normal patterns

### Phase 5: Full Cutover (100%)
```bash
# Set v1: 0, v2: 100
kubectl edit virtualservice devmentor-routes -n devmentor-app
```

Post-cutover:
- [ ] Monitor for 1 hour
- [ ] Update default Deployment to v2 image
- [ ] Clean up v1 Deployment (optional, keep for fast rollback)

## Rollback Procedure

Immediate rollback (any phase):
```bash
# Revert to 100% v1
kubectl edit virtualservice devmentor-routes -n devmentor-app
# Set v1: 100, v2: 0
```

Verification:
```bash
# Confirm traffic shift
curl -s http://localhost:8080/api/ai/health | jq
# Check Kiali for traffic flow
kubectl -n istio-system port-forward svc/kiali 20001:20001 &
```

## Monitoring Queries

Key Prometheus queries:
```promql
# Request rate by version
sum(rate(istio_request_total{destination_service_name="ai-gateway"}[5m])) by (destination_version)

# Error rate by version
sum(rate(istio_request_total{destination_service_name="ai-gateway",response_code=~"5.."}[5m])) by (destination_version)

# P95 latency
histogram_quantile(0.95, sum(rate(istio_request_duration_milliseconds_bucket{destination_service_name="ai-gateway"}[5m])) by (le, destination_version))
```

## Canary/Rollback Drill

Schedule: Monthly on non-critical service
Duration: 1 hour

Drill Steps:
1. Deploy mock v2 with harmless change (e.g., extra header)
2. Execute phases 1-3 of canary procedure
3. Simulate failure (manually return 500s from v2)
4. Execute rollback procedure
5. Verify v1 receives 100% traffic
6. Document time-to-detection and time-to-recovery

Success Criteria:
- Rollback completed within 2 minutes of detection
- No customer impact during drill
- All team members can execute procedure

## Troubleshooting

Common Issues:
- Weights not taking effect: Check Envoy config sync (istioctl proxy-config)
- Metrics missing: Verify Prometheus scraping Envoy sidecars
- v2 pods not receiving traffic: Check labels match DestinationRule subsets
- Uneven distribution: Increase sample size (wait longer) or check session affinity

Commands:
```bash
# Check Envoy route config
istioctl proxy-config routes deploy/ai-gateway -n devmentor-app

# Force config sync
kubectl rollout restart deploy/ai-gateway -n devmentor-app

# View real-time traffic split in Kiali
open http://localhost:20001/kiali/console/graph/namespaces/?traffic=grpc%2CgrpcRequest%2Chttp%2ChttpRequest%2Ctcp%2CtcpSent&graphType=versionedApp&namespaces=devmentor-app&duration=60&refresh=10000&layout=dagre&namespaceLayout=dagre
```

## References
- Istio Traffic Management: https://istio.io/latest/docs/concepts/traffic-management/
- Grafana Dashboard: infrastructure/k8s/monitoring/grafana-dashboard-canary.yaml
- Main Runtime Control: docs/infrastructure/runbooks/RUNBOOK_runtime-control.md
{% endraw %}
