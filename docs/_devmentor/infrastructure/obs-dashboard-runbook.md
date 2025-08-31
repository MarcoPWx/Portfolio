---
layout: product
title: obs-dashboard-runbook
product: DevMentor
source: infrastructure/obs-dashboard-runbook.md
---

{% raw %}
# Runbook: DevMentor Observability Dashboard (Terminal)

This runbook describes how to use the scripts/obs CLI to monitor the cluster from the terminal in a multi-panel dashboard.

Prerequisites
- Cluster reachable (kubectl current-context is kind-devmentor)
- scripts/obs is executable (chmod +x scripts/obs)
- curl installed; jq optional for richer summaries

Quick start
1) Start port-forwards in background (Grafana, Prometheus, Alertmanager):
   scripts/obs pf all -b

2) Launch the dashboard (choose namespace for logs):
   scripts/obs dashboard --ns devmentor 3

Panels
- Overview: per-namespace pod counts
- Monitoring: kube-prometheus-stack services + Grafana provisioning summary + Kiali status
- Prometheus Targets: counts (up/down) and first “down” targets with lastError
- Problems: non-Running/Completed pods + recent events per pod
- Recent Logs: last 10 lines from the 5 most recent pods in selected namespace
- Port-forwards: PIDs and URLs to open UIs

Tips
- Kiali status requires a separate PF:
  kubectl -n istio-system port-forward svc/kiali 20001:20001 &

- Use larger terminals. The dashboard adapts:
  - 3x2 grid when width >= 180 cols
  - 2x3 grid when height >= 36 rows
  - Fallback 2x2 otherwise

Troubleshooting
- Prometheus targets panel empty:
  - Ensure PF on 9090 is active (scripts/obs pf prom -b)
  - Install jq for better parsing (brew install jq)

- Grafana dashboards not visible:
  - Check ConfigMaps labeled grafana_dashboard=1 in monitoring namespace
  - Ensure sidecar is enabled in Helm values

- Kiali status shows “not reachable”:
  - Start Kiali port-forward as noted above

- Screen drawing glitches:
  - Use a non-multiplexed terminal pane or increase size; refresh interval can be increased (e.g. 5)

Next enhancements (optional)
- Keyboard shortcuts inside dashboard (n to change logs NS, s to change refresh, p to toggle panels)
- Kustomize-only overlay for dashboards to avoid manual ConfigMap creation

{% endraw %}
