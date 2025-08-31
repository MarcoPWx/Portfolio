---
layout: product
title: ISTIO SIDECAR AUTH SETUP
product: DevMentor
source: infrastructure/kubernetes/ISTIO_SIDECAR_AUTH_SETUP.md
---

{% raw %}
# Complete Istio Sidecar & Authentication Setup Guide

## Current Status
- ✅ Istio is installed
- ✅ Kiali is accessible 
- ❌ Services missing sidecars
- ❌ No authentication configured
- ❌ No Istio policies

## Step 1: Enable Sidecar Injection for All Namespaces

### 1.1 Label the namespaces for automatic sidecar injection
```bash
# Enable for devmentor namespace (already done)
kubectl label namespace devmentor istio-injection=enabled --overwrite

# Enable for devmentor-data namespace
kubectl label namespace devmentor-data istio-injection=enabled --overwrite

# Verify labels
kubectl get namespace -L istio-injection
```

### 1.2 Restart ALL deployments to inject sidecars
```bash
# Restart devmentor namespace deployments
kubectl rollout restart deployment -n devmentor

# Restart devmentor-data namespace deployments  
kubectl rollout restart deployment -n devmentor-data
kubectl rollout restart statefulset -n devmentor-data

# Watch the rollout status
kubectl get pods -n devmentor -w
kubectl get pods -n devmentor-data -w
```

### 1.3 Verify sidecars are injected
```bash
# Check if pods have 2 containers (app + sidecar)
kubectl get pods -n devmentor -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[*].name}{"\n"}{end}'
kubectl get pods -n devmentor-data -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[*].name}{"\n"}{end}'
```

## Step 2: Fix PostgreSQL Service Issue

### 2.1 Check PostgreSQL status
```bash
# Check PostgreSQL pod
kubectl get pods -n devmentor-data | grep postgres

# Check PostgreSQL service
kubectl get svc -n devmentor-data postgresql

# Check PostgreSQL logs
kubectl logs -n devmentor-data -l app=postgresql --tail=50
```

### 2.2 Fix PostgreSQL connectivity
```bash
# Create a service if missing
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: postgresql
  namespace: devmentor-data
spec:
  selector:
    app: postgresql
  ports:
  - port: 5432
    targetPort: 5432
  type: ClusterIP
EOF
```

## Step 3: Deploy Keycloak for Authentication

### 3.1 Create Keycloak namespace and secrets
```bash
# Create namespace
kubectl create namespace keycloak

# Create admin password secret
kubectl create secret generic keycloak-admin \
  --from-literal=username=admin \
  --from-literal=password=admin123! \
  -n keycloak
```

### 3.2 Deploy Keycloak with PostgreSQL backend
```yaml
# Save as keycloak-deployment.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: keycloak-config
  namespace: keycloak
data:
  keycloak.conf: |
    db=postgres
    db-url=jdbc:postgresql://postgresql.devmentor-data.svc.cluster.local:5432/keycloak
    db-username=keycloak
    db-password=keycloak123
    hostname-strict=false
    proxy=edge
    http-enabled=true
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: keycloak
  namespace: keycloak
  labels:
    app: keycloak
spec:
  replicas: 1
  selector:
    matchLabels:
      app: keycloak
  template:
    metadata:
      labels:
        app: keycloak
        version: v1
    spec:
      containers:
      - name: keycloak
        image: quay.io/keycloak/keycloak:23.0
        args: ["start-dev"]
        env:
        - name: KEYCLOAK_ADMIN
          valueFrom:
            secretKeyRef:
              name: keycloak-admin
              key: username
        - name: KEYCLOAK_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: keycloak-admin
              key: password
        - name: KC_DB
          value: postgres
        - name: KC_DB_URL
          value: jdbc:postgresql://postgresql.devmentor-data.svc.cluster.local:5432/keycloak
        - name: KC_DB_USERNAME
          value: postgres
        - name: KC_DB_PASSWORD
          value: postgres
        - name: KC_HOSTNAME_STRICT
          value: "false"
        - name: KC_HTTP_ENABLED
          value: "true"
        - name: KC_PROXY
          value: "edge"
        ports:
        - name: http
          containerPort: 8080
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: keycloak
  namespace: keycloak
  labels:
    app: keycloak
spec:
  type: ClusterIP
  ports:
  - port: 8080
    targetPort: 8080
    name: http
  selector:
    app: keycloak
```

### 3.3 Apply Keycloak deployment
```bash
kubectl apply -f keycloak-deployment.yaml

# Wait for it to be ready
kubectl wait --for=condition=ready pod -l app=keycloak -n keycloak --timeout=300s

# Port forward to access Keycloak UI
kubectl port-forward -n keycloak svc/keycloak 8080:8080
```

## Step 4: Configure Istio Authentication Policies

### 4.1 Create PeerAuthentication for mTLS
```yaml
# Save as istio-mtls.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: devmentor
spec:
  mtls:
    mode: STRICT
---
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: devmentor-data
spec:
  mtls:
    mode: STRICT
---
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: keycloak
spec:
  mtls:
    mode: STRICT
```

### 4.2 Create RequestAuthentication for JWT
```yaml
# Save as istio-jwt-auth.yaml
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-auth
  namespace: devmentor
spec:
  selector:
    matchLabels:
      app: ai-gateway
  jwtRules:
  - issuer: "http://keycloak.keycloak.svc.cluster.local:8080/realms/devmentor"
    jwksUri: "http://keycloak.keycloak.svc.cluster.local:8080/realms/devmentor/protocol/openid-connect/certs"
---
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-auth
  namespace: devmentor
spec:
  selector:
    matchLabels:
      app: auth-service
  jwtRules:
  - issuer: "http://keycloak.keycloak.svc.cluster.local:8080/realms/devmentor"
    jwksUri: "http://keycloak.keycloak.svc.cluster.local:8080/realms/devmentor/protocol/openid-connect/certs"
```

### 4.3 Create Authorization Policies
```yaml
# Save as istio-authz-policy.yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-all-in-namespace
  namespace: devmentor
spec:
  action: ALLOW
  rules:
  - from:
    - source:
        namespaces: ["devmentor", "devmentor-data", "istio-system"]
---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: require-jwt-for-api
  namespace: devmentor
spec:
  selector:
    matchLabels:
      app: ai-gateway
  action: ALLOW
  rules:
  - from:
    - source:
        requestPrincipals: ["*"]
    to:
    - operation:
        methods: ["GET", "POST", "PUT", "DELETE"]
  - to:
    - operation:
        methods: ["GET"]
        paths: ["/health", "/metrics"]
```

### 4.4 Apply all Istio configurations
```bash
kubectl apply -f istio-mtls.yaml
kubectl apply -f istio-jwt-auth.yaml
kubectl apply -f istio-authz-policy.yaml

# Verify configurations
kubectl get peerauthentication -A
kubectl get requestauthentication -A
kubectl get authorizationpolicy -A
```

## Step 5: Configure Keycloak Realm and Clients

### 5.1 Access Keycloak Admin Console
```bash
# Port forward if not already done
kubectl port-forward -n keycloak svc/keycloak 8080:8080

# Open browser
open http://localhost:8080
# Login: admin / admin123!
```

### 5.2 Create DevMentor Realm
1. Click "Create Realm"
2. Name: `devmentor`
3. Click "Create"

### 5.3 Create Client for Frontend
1. Go to Clients → Create
2. Client ID: `devmentor-frontend`
3. Client Protocol: `openid-connect`
4. Root URL: `http://localhost:3000`
5. Valid Redirect URIs: `http://localhost:3000/*`
6. Web Origins: `*`

### 5.4 Create Client for Services
1. Go to Clients → Create
2. Client ID: `devmentor-services`
3. Client Protocol: `openid-connect`
4. Access Type: `confidential`
5. Service Accounts Enabled: `ON`
6. Valid Redirect URIs: `http://localhost:*`

### 5.5 Create Test Users
1. Go to Users → Add User
2. Username: `developer`
3. Email: `developer@devmentor.local`
4. Save → Credentials → Set Password

## Step 6: Update Auth Service to Use Keycloak

### 6.1 Install dependencies
```bash
cd services/auth-service
npm install jsonwebtoken jwks-rsa axios
```

### 6.2 Update auth-service to validate Keycloak tokens
```javascript
// services/auth-service/keycloak.js
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const client = jwksClient({
  jwksUri: 'http://keycloak.keycloak.svc.cluster.local:8080/realms/devmentor/protocol/openid-connect/certs'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {
      audience: 'devmentor-frontend',
      issuer: 'http://keycloak.keycloak.svc.cluster.local:8080/realms/devmentor',
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

module.exports = { verifyToken };
```

## Step 7: Test the Setup

### 7.1 Get a token from Keycloak
```bash
# Get token
TOKEN=$(curl -X POST http://localhost:8080/realms/devmentor/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=devmentor-frontend" \
  -d "username=developer" \
  -d "password=password123" \
  -d "grant_type=password" | jq -r '.access_token')

echo $TOKEN
```

### 7.2 Test API with token
```bash
# Test without token (should fail)
curl http://localhost:3001/api/test

# Test with token (should work)
curl http://localhost:3001/api/test \
  -H "Authorization: Bearer $TOKEN"
```

## Step 8: Monitoring Authentication

### 8.1 View in Kiali
- Check service mesh traffic
- Look for mTLS badges
- Check authorization policies

### 8.2 Check Istio logs
```bash
# Check Envoy proxy logs
kubectl logs -n devmentor -l app=ai-gateway -c istio-proxy --tail=100
```

## Troubleshooting

### If sidecars not injecting:
```bash
# Check webhook
kubectl get mutatingwebhookconfiguration istio-sidecar-injector -o yaml

# Restart istio
kubectl rollout restart deployment/istiod -n istio-system
```

### If PostgreSQL connection fails:
```bash
# Create database for Keycloak
kubectl exec -it -n devmentor-data postgresql-0 -- psql -U postgres -c "CREATE DATABASE keycloak;"
```

### If Keycloak won't start:
```bash
# Check logs
kubectl logs -n keycloak -l app=keycloak --tail=100
```

## Summary

After completing these steps, you'll have:
1. ✅ All services with Istio sidecars
2. ✅ mTLS between all services
3. ✅ Keycloak for authentication
4. ✅ JWT validation at the gateway
5. ✅ Authorization policies enforced
6. ✅ Full observability in Kiali

## Next Steps
1. Configure frontend to use Keycloak login
2. Add role-based access control (RBAC)
3. Set up user registration flow
4. Configure social logins (GitHub, Google)
5. Add multi-factor authentication
{% endraw %}
