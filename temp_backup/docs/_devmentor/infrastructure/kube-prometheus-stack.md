---
layout: product
title: kube-prometheus-stack
product: DevMentor
source: infrastructure/kube-prometheus-stack.md
---

{% raw %}
# Runbook: Kubernetes Monitoring with kube-prometheus-stack (Prometheus, Grafana, Alertmanager)

This runbook installs and operates a full monitoring stack locally (kind/minikube) or in any Kubernetes cluster using the kube-prometheus-stack Helm chart.

Audience: Developers and operators running local or dev clusters.

Prereqs:
- Kubernetes cluster running (e.g., kind, minikube, k3d, or remote cluster)
- kubectl configured for the target cluster
- Helm v3 installed

Sections
- Status snapshot & links
- Quick CLI (obs) and Logs Helper
- Install/Upgrade
- Apply overlay (kustomize)
- Access (Port-forward)
- Grafana Credentials
- Customize via values.yaml
- Integrations (Istio, Kiali)
- Verification
- Troubleshooting
- Uninstall
- How this ties into Epic Management and System Status
- TODOs / Next actions

---

## Status snapshot & links (Last reviewed: 2025-08-23)

- Current repo components:
  - Helm values: infrastructure/observability/values.kube-prom-stack.yaml
  - Overlay: infrastructure/observability/ (kustomization, Istio monitors, PrometheusRule)
  - CLI helpers: scripts/obs (observability CLI), scripts/port-forward-observability.sh
- Known mismatches to be aware of:
  - Port-forward service names vary between docs and scripts. This runbook prefers kube-prometheus-stack-prometheus and kube-prometheus-stack-alertmanager; scripts may use the operator-created prometheus-operated and alertmanager-operated services. Use whichever exists in your cluster.
  - Kustomize may block external file paths referenced by configMapGenerator. If so, use the manual ConfigMap approach documented below or restructure the overlay to be self-contained.
- Where this fits:
  - Epic tracker: docs/status/EPIC_MANAGEMENT.md (see EPIC-OBS: Observability & Monitoring Integration)
  - System status snapshots: system_status.md and CLUSTER_STATUS_REPORT.md
  - Monitoring overview: docs/monitoring/README.md
  - Recent work log: docs/devlog/2025-08-21-monitoring-istio-setup.md

## Quick CLI (obs) and Logs Helper

To make monitoring tasks easy, this repo includes:
- scripts/obs — lightweight observability CLI wrapper
- scripts/dev-logs.sh — colorful, multi-source logs for Docker and Kubernetes

Install aliases and permissions:
```bash
chmod +x scripts/obs scripts/dev-logs.sh
# Optional: add a shell alias for convenience (zsh)
echo "alias obs=\"$(pwd)/scripts/obs\"" >> ~/.zshrc && source ~/.zshrc
```

Common usage:
- Status: obs status -n monitoring
- Port-forward UIs: obs pf prom | obs pf grafana | obs pf am
- K8s logs (namespace devmentor, past 10m): obs logs k8s -n devmentor --since 10m
- Include all containers (sidecars): obs logs k8s -n devmentor --since 10m --containers
- Docker logs only: obs logs docker --since 15m
- Both Kubernetes and Docker: obs logs both -n devmentor --since 10m
- Filter pods by label: obs logs k8s -n devmentor -l app=ai-gateway

## Install / Upgrade

Recommended: use kube-prometheus-stack with a small overlay that wires Istio monitors, custom alert rules, and Grafana dashboards.

Repo and chart:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

Install with repo values file in this repo:

```bash
# uses infrastructure/observability/values.kube-prom-stack.yaml
helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace \
  -f infrastructure/observability/values.kube-prom-stack.yaml
```

If you need to override secrets (like Grafana admin password), set them via --set or pre-create a Secret. Avoid committing secrets to Git.

## Apply overlay (kustomize)

Apply the repo overlay that supplies Istio monitors, custom alert rules, and Grafana dashboards/datasources:

```bash
kubectl apply -k infrastructure/observability
```

File map:
- infrastructure/observability/kustomization.yaml — generators and resources
- infrastructure/observability/values.kube-prom-stack.yaml — Helm values for the chart
- infrastructure/observability/prometheusrules/devmentor-rules.yaml — alert rules
- infrastructure/observability/istio-monitors.yaml — ServiceMonitor/PodMonitor for Istio
- configs/grafana-dashboards/*.json — your dashboards
- config/grafana/provisioning/datasources/datasources.yml — Prometheus datasource

Editing/adding dashboards:
- Drop a new dashboard JSON into configs/grafana-dashboards/ and re-apply the overlay:

```bash
kubectl apply -k infrastructure/observability
```

Alternative: Manual apply if kustomize path guardrails block external files
- Create ConfigMaps from files and label them so Grafana sidecar picks them up:

```bash
# Dashboards
kubectl -n monitoring create configmap grafana-dashboards \
  --from-file=configs/grafana-dashboards/devmentor-fixed.json \
  --from-file=configs/grafana-dashboards/devmentor-overview.json \
  --dry-run=client -o yaml | kubectl -n monitoring apply -f -

kubectl -n monitoring label configmap grafana-dashboards grafana_dashboard=1 --overwrite

# Datasources
kubectl -n monitoring create configmap grafana-datasources \
  --from-file=config/grafana/provisioning/datasources/datasources.yml \
  --dry-run=client -o yaml | kubectl -n monitoring apply -f -

kubectl -n monitoring label configmap grafana-datasources grafana_datasource=1 --overwrite
```

- Apply Istio monitors and custom rules directly if needed:

```bash
kubectl apply -f infrastructure/observability/istio-monitors.yaml
kubectl apply -f infrastructure/observability/prometheusrules/devmentor-rules.yaml
```

## Access (Port-forward)

Prometheus (http://localhost:9090):

```bash
kubectl -n monitoring port-forward svc/kube-prometheus-stack-prometheus 9090:9090
# or, if your cluster exposes the operator service:
# kubectl -n monitoring port-forward svc/prometheus-operated 9090:9090
```

Grafana (http://localhost:3000):

```bash
kubectl -n monitoring port-forward svc/kube-prometheus-stack-grafana 3000:80
```

Alertmanager (http://localhost:9093):

```bash
kubectl -n monitoring port-forward svc/kube-prometheus-stack-alertmanager 9093:9093
# or:
# kubectl -n monitoring port-forward svc/alertmanager-operated 9093:9093
```

## Grafana Credentials

Username: `admin`

Password: stored in a Kubernetes Secret named `kube-prometheus-stack-grafana`.

macOS (base64 -D):

```bash
GRAFANA_PASS=$(kubectl -n monitoring get secret kube-prometheus-stack-grafana -o \
  jsonpath='{.data.admin-password}' | base64 -D)
```

Linux (GNU base64 -d):

```bash
GRAFANA_PASS=$(kubectl -n monitoring get secret kube-prometheus-stack-grafana -o \
  jsonpath='{.data.admin-password}' | base64 -d)
```

Then log in to Grafana at http://localhost:3000 with:
- username: `admin`
- password: the value stored in `$GRAFANA_PASS`

Note: Avoid echoing secrets to the terminal. Use the variable in commands as needed.

## Customize via values.yaml

Create a `values.yaml` to tailor storage, retention, resource requests, and data sources. Minimal example:

```yaml
global:
  rbac:
    create: true

grafana:
  adminPassword: "change-me"           # set your own
  service:
    type: ClusterIP                     # ClusterIP works for kind/minikube
  persistence:
    enabled: true
    size: 5Gi
  additionalDataSources:
    - name: Loki
      type: loki
      url: http://loki:3100            # example if you add Loki later

prometheus:
  prometheusSpec:
    retention: 15d
    resources:
      requests:
        cpu: 200m
        memory: 1Gi
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes: [ "ReadWriteOnce" ]
          resources:
            requests:
              storage: 20Gi

alertmanager:
  alertmanagerSpec:
    resources:
      requests:
        cpu: 100m
        memory: 256Mi
```

Apply with:

```bash
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  -n monitoring -f values.yaml --create-namespace
```

## Integrations (Istio, Kiali)

- kube-prometheus-stack includes Prometheus Operator and supports ServiceMonitor/PodMonitor CRs.
- This repo ships a kustomize overlay at infrastructure/observability that applies:
  - Istio PodMonitor and ServiceMonitor (copied from Istio samples) so Prometheus scrapes Envoy and control-plane metrics
  - A PrometheusRule (infrastructure/observability/prometheusrules/devmentor-rules.yaml) with DevMentor and system alerts
  - Grafana dashboards and datasources via ConfigMap generators with labels Grafana’s sidecar watches

Apply the overlay any time after installing the chart:

```bash
kubectl apply -k infrastructure/observability
```

- Kiali:
  - Configure to point to this Prometheus:
    `kiali external_services.prometheus.url = http://kube-prometheus-stack-prometheus.monitoring:9090`

## Verification

- Prometheus: Status → Targets
  - Expect kubelet, apiserver, cAdvisor, kube-state-metrics, node-exporter, Istio targets (envoy-stats, istio-component-monitor)
- Prometheus: Status → Rules
  - Look for groups devmentor-service-alerts and system-health (from devmentor-rules)
- Grafana: built-in dashboards + DevMentor dashboards
  - DevMentor dashboards are loaded from the grafana-dashboards ConfigMap via sidecar
- Alertmanager: active/silenced alerts

Alerting flow:
- Prometheus evaluates alerting rules in rule_files
- Sends firing alerts to Alertmanager (alerting > alertmanagers in prometheus.yml)
- Alertmanager groups/routes/silences/deduplicates and delivers to receivers (email/Slack/webhook)
- Grafana can visualize alerts; if using Grafana Alerting, choose one system of record to avoid duplication

Sorting alerts:
- Prometheus UI: limited grouping; use label filters to narrow
- Use Alertmanager UI for triage (group_by, receivers, silences) or Grafana Alerting views

## Troubleshooting

Minimal working examples

Prometheus rule (High CPU):
```yaml
groups:
  - name: devmentor-service-alerts
    rules:
      - alert: HighCPUUsage
        expr: sum(rate(container_cpu_usage_seconds_total{namespace="devmentor"}[5m])) by (pod) > 1.5
        for: 5m
        labels:
          severity: warning
          team: platform
        annotations:
          summary: "High CPU on pod {{ $labels.pod }}"
          description: "CPU > 1.5 cores for 5m in namespace devmentor."
```

Prometheus -> Alertmanager (prometheus.yml):
```yaml
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager.monitoring.svc.cluster.local:9093
rule_files:
  - /etc/prometheus/rules/*.yml
```

Alertmanager route/receiver (alertmanager.yml):
```yaml
route:
  receiver: default
  group_by: ['alertname','namespace']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - matchers:
        - severity="critical"
      receiver: pager
receivers:
  - name: default
    webhook_configs:
      - url: http://monitoring-service.devmentor.svc.cluster.local:3006/api/alerts
  - name: pager
    email_configs:
      - to: your-oncall@example.com
inhibit_rules:
  - source_matchers: [severity="critical"]
    target_matchers: [severity="warning"]
    equal: ['alertname','namespace']
```

- zsh: parse error near `)'
  - You likely pasted commentary or YAML into the shell or an unmatched `)`.
  - Only paste commands in code fences above. Put YAML into files, not the terminal.

- Port-forward not connecting
  - Ensure pods are Ready: `kubectl -n monitoring get pods`
  - Check service names match those used above: `kubectl -n monitoring get svc`

- PVCs pending on kind/minikube
  - Confirm a default StorageClass: `kubectl get storageclass`
  - For LoadBalancer needs on local clusters, consider MetalLB; otherwise use port-forward or NodePort.

## Uninstall / Cleanup

```bash
# Remove overlayed resources (non-namespaced generators are handled by ns deletion)
kubectl delete -k infrastructure/observability || true

# Remove the chart release and namespace
helm uninstall monitoring -n monitoring || true
kubectl delete ns monitoring --wait=false || true
```

That’s it. With this, you have a production-style monitoring stack that’s easy to run locally. Adjust values.yaml for persistence, retention, and resource needs.

## How this runbook ties into Epic Management and System Status

- Epic status:
  - Use this runbook to complete EPIC-OBS tasks in docs/status/EPIC_MANAGEMENT.md: install the stack, apply overlay, port-forward, wire dashboards, configure alerts.
  - After verifying targets and rules, update the Service Readiness Checklist in that file.
- System snapshots:
  - After verification, update system_status.md and CLUSTER_STATUS_REPORT.md with a brief summary (targets up, dashboards loaded, alerts firing).
  - Log changes in docs/status/devlog.md.

## TODOs / Next actions

- [ ] Restructure the observability overlay to be self-contained for kustomize or keep script-based ConfigMap apply as the standard.
- [ ] Standardize port-forward service names across docs and scripts; prefer kube-prometheus-stack-{prometheus,alertmanager}.
- [ ] Configure Alertmanager receivers (Slack/email/webhook) and document them here.
- [ ] Add ServiceMonitor/PodMonitor resources for application services in devmentor[-app] if not using Istio scrape labels.
- [ ] Confirm devmentor-rules.yaml groups appear in Prometheus (Status -> Rules) and alerts reach Alertmanager.
- [ ] Optional: add Loki and Jaeger datasources and document log/trace access.

Runbook version: v2025-08-23
{% endraw %}
