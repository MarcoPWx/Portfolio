---
layout: product
title: 2025-08-21-monitoring-istio-setup
product: DevMentor
source: devlog/2025-08-21-monitoring-istio-setup.md
---

{% raw %}
# DevLog: Monitoring Stack & Istio Setup
Date: 2025-08-21
Author: Development Team

## Summary
Set up comprehensive Kubernetes monitoring with kube-prometheus-stack and standardized Istio installation for the DevMentor project.

## Work Completed

### 1. Monitoring Stack Documentation & Setup

#### Created Runbook
- **Location**: `docs/infrastructure/monitoring/kube-prometheus-stack-runbook.md`
- **Purpose**: Complete operational guide for installing and managing kube-prometheus-stack
- **Contents**:
  - Installation instructions for Helm-based deployment
  - Port-forwarding commands for local access
  - Grafana credential retrieval (macOS and Linux)
  - Custom values.yaml examples
  - Istio/Kiali integration guidance
  - Troubleshooting section
  - Uninstall procedures

#### Documentation Structure Fix
- **Issue**: Initial runbook was placed in wrong directory (`docs/runbooks/`)
- **Resolution**: Moved to `docs/infrastructure/monitoring/` to align with existing observability docs
- **Updated**: `docs/monitoring/README.md` to reference the new runbook location

#### Key Commands Documented
```bash
# Install monitoring stack
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace

# Access services
kubectl -n monitoring port-forward svc/monitoring-kube-prometheus-stack-prometheus 9090:9090
kubectl -n monitoring port-forward svc/monitoring-grafana 3000:80
kubectl -n monitoring port-forward svc/monitoring-kube-prometheus-stack-alertmanager 9093:9093

# Get Grafana password (macOS)
GRAFANA_PASS=$(kubectl -n monitoring get secret monitoring-grafana -o \
  jsonpath='{.data.admin-password}' | base64 -D)
```

### 2. Istio Version Management

#### Problem Identified
- Two Istio versions in repository root: `istio-1.22.3` and `istio-1.23.2`
- No standardized access pattern
- Potential confusion for development team

#### Solution Implemented

##### Version Selection
- **Chosen**: Istio 1.23.2 (newer, compatible with kubectl v1.32.2)
- **Archived**: Istio 1.22.3 moved to `.archive/2025-08-21-istio-cleanup/`

##### Symlink Strategy
```bash
ln -sfn istio-1.23.2 istio
```
- Creates version-agnostic reference
- Simplifies future upgrades (just update symlink)
- No hardcoded version paths in scripts

##### Environment Script Created
- **File**: `env.sh` (executable, in project root)
- **Features**:
  - Sets up ISTIO_HOME and PATH
  - Verifies Istio availability
  - Checks Docker status
  - Checks kind cluster existence
  - Provides quick environment health check

```bash
#!/bin/bash
# Usage: source env.sh
DEVMENTOR_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export ISTIO_HOME="${DEVMENTOR_ROOT}/istio"
export PATH="${ISTIO_HOME}/bin:${PATH}"
```

#### Verification Results
```
✓ Istio client version: 1.23.2 configured
✓ Docker is running
✓ Kind cluster 'devmentor' exists
DevMentor environment ready
```

## Technical Decisions

### Why kube-prometheus-stack?
- **Comprehensive**: Includes Prometheus, Grafana, Alertmanager in one package
- **Production-ready**: Used widely in production environments
- **Operator-based**: Simplifies configuration via CRDs
- **Integration**: Works seamlessly with Istio metrics

### Why Istio 1.23.2?
- **Compatibility**: Better support for Kubernetes 1.30+
- **Features**: Latest stability improvements
- **Support**: More recent release with active maintenance

### Documentation Philosophy
- **Runbooks in infrastructure/**: Operational guides belong with infrastructure docs
- **README files for overview**: High-level summaries in category roots
- **Code blocks for commands**: All commands in markdown code fences for safe copy/paste
- **Platform considerations**: Separate instructions for macOS vs Linux where needed

## Files Changed

### Created
- `docs/infrastructure/monitoring/kube-prometheus-stack-runbook.md`
- `env.sh` (project root)
- `istio` (symlink to istio-1.23.2)

### Modified
- `docs/monitoring/README.md` (added runbook reference)

### Archived
- `istio-1.22.3/` → `.archive/2025-08-21-istio-cleanup/`

### Removed
- `docs/runbooks/kube-prometheus-stack.md` (moved to correct location)

## Lessons Learned

1. **Documentation Structure Matters**: Important to check existing documentation patterns before creating new files
2. **Version Management Strategy**: Symlinks provide flexibility for tool versions without hardcoding
3. **Environment Scripts**: Project-specific env setup scripts improve developer experience
4. **Secret Handling**: Never echo secrets; store in variables for use
5. **Platform Differences**: macOS uses `base64 -D` while Linux uses `base64 -d`

## Next Steps

1. **Test Monitoring Stack**: Deploy to kind cluster and verify all dashboards
2. **Configure Alerting**: Set up Alertmanager receivers for team notifications
3. **Service Monitors**: Add monitoring for DevMentor services
4. **Documentation Review**: Ensure all team members can follow runbooks
5. **Automation**: Consider adding monitoring setup to CI/CD pipeline

## References

- [kube-prometheus-stack Helm Chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)
- [Istio 1.23 Release Notes](https://istio.io/latest/news/releases/1.23.x/)
- [Monitoring Architecture Docs](docs/infrastructure/monitoring/OBSERVABILITY_ARCHITECTURE.md)

## Commands for Quick Reference

```bash
# Start work session
source env.sh

# Check Istio version
istioctl version

# View monitoring runbook
cat docs/infrastructure/monitoring/kube-prometheus-stack-runbook.md

# Access Grafana (after install)
kubectl -n monitoring port-forward svc/monitoring-grafana 3000:80
# Browse to http://localhost:3000
```

---
End of DevLog Entry
{% endraw %}
