---
layout: product
title: RUNBOOK external-secrets vault
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_external-secrets_vault.md
---

{% raw %}
# External Secrets with Vault Runbook

Audience: Platform/DevOps
Scope: Install External Secrets Operator (ESO), configure Vault as the secret store, and sync secrets to Kubernetes.

Overview
- ESO reads from Vault and creates/updates Kubernetes Secrets automatically.
- Services consume secrets via envFrom or specific env keys.

1) Install ESO
- Reference: https://external-secrets.io
- Example (Helm):
```bash
helm repo add external-secrets https://charts.external-secrets.io
helm upgrade --install external-secrets external-secrets/external-secrets \
  --namespace external-secrets --create-namespace
```

2) Configure Vault Kubernetes Auth
- In Vault, enable the Kubernetes auth method and create a role bound to the devmentor-app namespace service account.
- Example Vault CLI (adjust paths):
```bash
vault auth enable kubernetes
vault write auth/kubernetes/config \
  kubernetes_host=$K8S_HOST \
  kubernetes_ca_cert=@/path/ca.crt \
  token_reviewer_jwt=@/path/token
vault write auth/kubernetes/role/devmentor \
  bound_service_account_names=default \
  bound_service_account_namespaces=devmentor-app \
  policies=devmentor-read \
  ttl=1h
```

3) Create Vault Policy
- Allows read on paths like kv/data/devmentor/*
```hcl
path "kv/data/devmentor/*" {
  capabilities = ["read"]
}
```

4) Create ClusterSecretStore
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
```

5) Define ExternalSecrets per service
```yaml
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
  data:
    - secretKey: REDIS_URL
      remoteRef: { key: devmentor/api-gateway, property: REDIS_URL }
    - secretKey: JWT_SECRET
      remoteRef: { key: devmentor/api-gateway, property: JWT_SECRET }
```

6) Wire Deployments to secrets
- Example:
```yaml
envFrom:
  - secretRef: { name: api-gateway-secrets }
```

7) Verification
- kubectl -n devmentor-app get externalsecret,secret | grep api-gateway
- kubectl -n devmentor-app describe externalsecret api-gateway-secrets
- Restart rollout if needed; confirm env present on pod

8) Rotation
- Update value in Vault → ESO syncs → If pods need restart, trigger rollout:
```bash
kubectl -n devmentor-app rollout restart deploy/api-gateway
```

Idempotency Note
- You can safely re-apply ClusterSecretStore and ExternalSecret manifests. ESO will reconcile to the desired state without duplicating K8s Secrets.
- Re-applying service Deployments that use envFrom secrets will not create duplicate secrets; it only restarts pods if you trigger a rollout.

9) Troubleshooting
- ESO logs: kubectl -n external-secrets logs deploy/external-secrets
- Auth errors: verify Vault role, SA name/namespace bindings
- Path errors: confirm kv path version and keys

{% endraw %}
