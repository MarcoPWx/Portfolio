---
layout: product
title: SCALING QUICKREF
product: DevMentor
source: infrastructure/operations/SCALING_QUICKREF.md
---

{% raw %}
# Scaling Quick Reference (Kubernetes)

Last reviewed: 2025-08-23
Audience: Devs/Ops running DevMentor locally (kind) or in dev clusters

TL;DR
- Horizontal scaling = more Pods. Change Deployment spec.replicas or use HPA.
- Vertical scaling = bigger Pods. Change resources.requests/limits or use VPA.
- Deployments own ReplicaSets; ReplicaSets ensure the desired number of Pods exist.

Core objects
- Deployment: declarative rollout/rollback for a Pod template; sets replicas.
- ReplicaSet: keeps N Pods of a given template label selector alive (owned by Deployment).
- HPA (HorizontalPodAutoscaler): adjusts Deployment replicas based on metrics (CPU%, custom metrics).
- VPA (VerticalPodAutoscaler): recommends/applies resource changes per Pod.

When to use what
- Use Horizontal scaling when:
  - Workload is stateless/parallelizable
  - Metric bottleneck is requests per second/latency and each Pod is not CPU/RAM bound
- Use Vertical scaling when:
  - Single Pod is starved (OOMKilled, CPU throttled) and can’t split work further
  - Scheduling allows bigger requests on available nodes
- Combine: Right-size vertically first to a sane baseline, then add replicas.

Quick commands
- Set replicas (Horizontal):
  ```bash
  kubectl -n <ns> scale deploy/<name> --replicas=3
  kubectl -n <ns> get deploy/<name>
  kubectl -n <ns> get rs -l app=<label>
  ```
- Create HPA (Horizontal autoscaling):
  ```bash
  kubectl -n <ns> autoscale deploy/<name> --min=1 --max=5 --cpu-percent=70
  kubectl -n <ns> get hpa
  ```
- Set Pod resources (Vertical):
  ```bash
  kubectl -n <ns> set resources deploy/<name> \
    --requests=cpu=500m,memory=1Gi \
    --limits=cpu=1,memory=2Gi
  ```
- Edit Deployment (advanced):
  ```bash
  kubectl -n <ns> edit deploy/<name>
  # spec.replicas (horizontal) and containers[].resources (vertical)
  ```

Observability & verification
- Capacity: `kubectl top nodes` and `kubectl top pods -n <ns>`
- Pod events: `kubectl describe pod <pod> -n <ns>` (look for FailedScheduling, OOMKilled)
- HPA behavior: `kubectl get hpa -n <ns>`; Grafana/Kiali for workload graphs
- Prometheus: Requests/latency/error rates to decide scale triggers

Local (kind) considerations
- Node memory is constrained; large models (e.g., Ollama) often cannot run >1 replica.
- Pending Pods with reason “insufficient memory” → reduce replicas or raise requests only if nodes allow.

Pitfalls
- Scaling up replicas without adequate resources → Pending Pods (no capacity)
- Over-verticalizing → Pod unschedulable on any node
- Forgetting readiness/liveness probes → HPA scales on broken Pods

DevMentor specifics (current)
- Ollama: prefer 1 replica on kind; adjust memory requests/limits if needed
- Gateways (auth/ai): horizontally scalable; keep modest CPU/memory requests
- Use scripts/obs to check Prom targets and Grafana; Kiali at :20001 for mesh

Change checklist
- [ ] Check node capacity (top nodes)
- [ ] Check Pod resource usage (top pods)
- [ ] Decide HPA vs manual replicas; or vertical resource tuning
- [ ] Apply change (scale or set resources)
- [ ] Verify rollout and metrics
- [ ] Document decision (DEVLOG) and append ops note to EPIC_MANAGEMENT

Refs in repo
- docs/infrastructure/operations/COMMANDS.md (Deployment ops, resource monitoring)
- docs/infrastructure/kubernetes/CONTAINER_ORCHESTRATION_GUIDE.md (Deployments/ReplicaSets)
- docs/infrastructure/operations/SCALING_AND_OPERATIONS.md (end-to-end workflow)

{% endraw %}
