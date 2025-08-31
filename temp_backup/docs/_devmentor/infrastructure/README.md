---
layout: product
title: README
product: DevMentor
source: infrastructure/README.md
---

{% raw %}
# Monitoring Stack Overview

This document captures the current Kubernetes monitoring and service-mesh setup for the devmentor local cluster.

## Stack
- Kubernetes: kind cluster `devmentor` (1 control plane, 2 workers)
- Istio: sidecar mode (default profile)
  - Components: istiod, istio-ingressgateway
- Kiali: visualization for Istio (anonymous, view-only)
- kube-prometheus-stack (Prometheus Operator bundle)
  - Prometheus, Alertmanager, Grafana
  - kube-state-metrics, node-exporter

## Access
- Grafana: http://localhost:3000 (admin/dev)
- Kiali: http://localhost:20001
- Prometheus: http://localhost:9090
- Alertmanager: http://localhost:9093

Port-forwards are started by the setup task. If needed, restart them manually:
- kubectl -n monitoring port-forward svc/kube-prometheus-stack-grafana 3000:80
- kubectl -n istio-system port-forward svc/kiali 20001:20001
- kubectl -n monitoring port-forward svc/kube-prometheus-stack-prometheus 9090:9090
- kubectl -n monitoring port-forward svc/kube-prometheus-stack-alertmanager 9093:9093

## Data flow
- Envoy sidecars and Istio components expose Prometheus metrics.
- ServiceMonitors have been installed for istiod and istio-ingressgateway so Prometheus scrapes them.
- Grafana is pre-configured with the Prometheus datasource from the Helm chart.
- Kiali reads from Prometheus to render the service graph.
- Alertmanager receives alerts fired by Prometheus rules (routing can be configured later to Slack/email/etc.).

## Runbooks
- For installation and operations, see: docs/infrastructure/monitoring/kube-prometheus-stack-runbook.md

## Curated Grafana Dashboards
Imported into Grafana (General folder):
- Istio Mesh Dashboard (7645)
- Istio Service Dashboard (7636)
- Istio Workload Dashboard (7630)

You can search these by ID or title in Grafana.

## Namespace injection
- default: istio-injection=enabled
- istio-system, monitoring: istio-injection=disabled

## Verify health
- kubectl get pods -n istio-system
- kubectl get pods -n monitoring
- Prometheus Targets: Prometheus -> Status -> Targets
- Kiali Graph: select the `default` namespace, choose a time window, then generate traffic

## Next steps
- Configure Alertmanager receivers (Slack/email) via kube-prometheus-stack values or a Secret.
- Add ServiceMonitors/PodMonitors for your application services (if not using Istio scraping)
- Create VirtualServices/Gateways if you want external ingress to services.

---

## See also: Runbooks and Guides
- Ingress and Istio Gateway Runbook: docs/infrastructure/kubernetes/INGRESS_RUNBOOK.md
- Scaling Quick Reference: docs/infrastructure/operations/SCALING_QUICKREF.md
- Monitoring Runbook (kube-prometheus-stack): docs/infrastructure/kube-prometheus-stack.md
- Kubernetes Ops Commands: docs/infrastructure/operations/COMMANDS.md
- Container Orchestration Guide (Deployments/ReplicaSets/Pods): docs/infrastructure/kubernetes/CONTAINER_ORCHESTRATION_GUIDE.md
- K8s Debugging Scenarios: docs/infrastructure/debugging/k8s-debugging-enhanced.md
- Ops Dashboard Runbook (terminal dashboards): docs/infrastructure/obs-dashboard-runbook.md
- Ops Getting Started: docs/infrastructure/operations/OPS_GETTING_STARTED_GUIDE.md
- DevMentor Operations Guide: docs/infrastructure/operations/DEVMENTOR_OPERATIONS_GUIDE.md
- Kind + Istio Runbook: docs/infrastructure/kind-istio-runbook.md
{% endraw %}
