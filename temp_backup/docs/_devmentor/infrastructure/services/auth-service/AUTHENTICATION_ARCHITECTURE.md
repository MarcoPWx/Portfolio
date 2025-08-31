---
layout: product
title: AUTHENTICATION ARCHITECTURE
product: DevMentor
source: infrastructure/services/auth-service/AUTHENTICATION_ARCHITECTURE.md
---

{% raw %}
# DevMentor Authentication Architecture

## Authentication Options Comparison

### 1. OAuth 2.0 (Protocol)
**What it is:** An authorization framework/protocol, not an authentication solution
- **Purpose:** Allows third-party applications to access user resources without sharing passwords
- **Use Case:** When you want users to login with Google, GitHub, etc.
- **Implementation:** You need to build the authentication layer yourself
- **Cost:** Free (it's a protocol)
- **Complexity:** Medium to High

### 2. Auth0 (Service)
**What it is:** A complete authentication-as-a-service platform
- **Purpose:** Provides ready-to-use authentication, authorization, and user management
- **Use Case:** When you want a complete auth solution without building it yourself
- **Features:** 
  - User management dashboard
  - Multi-factor authentication (MFA)
  - Social logins (Google, GitHub, etc.)
  - Enterprise SSO (SAML, LDAP)
  - Passwordless authentication
  - Anomaly detection
- **Cost:** Free tier (7,000 active users/month), then paid
- **Complexity:** Low (plug and play)

### 3. Keycloak (Self-hosted)
**What it is:** Open-source identity and access management solution
- **Purpose:** Enterprise-grade authentication and authorization
- **Use Case:** When you want full control and self-hosting
- **Features:**
  - Single Sign-On (SSO)
  - Identity brokering and social login
  - User federation (LDAP, Active Directory)
  - Fine-grained authorization
- **Cost:** Free (open source)
- **Complexity:** Medium

## Recommended Architecture for DevMentor

Given your Kubernetes setup with Istio service mesh, here's the recommended approach:

### Option 1: Istio + OAuth2 Proxy (Recommended for Your Setup)
Since you already have Istio installed, leverage its built-in authentication capabilities:

```yaml
# 1. Service Mesh Authentication (mTLS between services)
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: devmentor
spec:
  mtls:
    mode: STRICT

# 2. Request Authentication (JWT validation)
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
  - issuer: "https://your-auth-service.devmentor.svc.cluster.local"
    jwksUri: "https://your-auth-service.devmentor.svc.cluster.local/.well-known/jwks.json"

# 3. Authorization Policy
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: require-jwt
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
```

### Option 2: Keycloak Integration (Best for Enterprise)
Deploy Keycloak in your cluster for complete identity management:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: keycloak
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: keycloak
  namespace: keycloak
spec:
  replicas: 1
  selector:
    matchLabels:
      app: keycloak
  template:
    metadata:
      labels:
        app: keycloak
    spec:
      containers:
      - name: keycloak
        image: quay.io/keycloak/keycloak:latest
        env:
        - name: KEYCLOAK_ADMIN
          value: "admin"
        - name: KEYCLOAK_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: keycloak-secrets
              key: admin-password
        - name: KC_PROXY
          value: "edge"
        - name: KC_HOSTNAME_STRICT
          value: "false"
        ports:
        - containerPort: 8080
        command:
        - "/opt/keycloak/bin/kc.sh"
        - "start-dev"
```

### Option 3: Auth0 Integration (Fastest to Implement)
Use Auth0's managed service with your existing auth-service:

```javascript
// auth-service/index.js enhancement
const { auth } = require('express-oauth2-jwt-bearer');

// Auth0 configuration
const checkJwt = auth({
  audience: 'https://devmentor-api',
  issuerBaseURL: 'https://YOUR_DOMAIN.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Protect API endpoints
app.use('/api/protected', checkJwt, (req, res) => {
  res.json({ 
    message: 'Authenticated!',
    user: req.auth 
  });
});
```

## Implementation Plan

### Phase 1: Enable Istio Sidecar Injection
```bash
# Label namespace for automatic sidecar injection
kubectl label namespace devmentor istio-injection=enabled
kubectl label namespace devmentor-data istio-injection=enabled

# Restart deployments to inject sidecars
kubectl rollout restart deployment -n devmentor
kubectl rollout restart deployment -n devmentor-data
```

### Phase 2: Configure Service Mesh Security
```bash
# Apply mTLS configuration
kubectl apply -f istio-security/peer-authentication.yaml
kubectl apply -f istio-security/destination-rules.yaml
```

### Phase 3: Set Up Authentication Service
Choose one:
- **Quick:** Use Auth0 (managed, 5 minutes setup)
- **Flexible:** Deploy Keycloak (self-hosted, 30 minutes setup)
- **Simple:** Use OAuth2 Proxy with GitHub/Google (15 minutes setup)

### Phase 4: Configure Authorization Policies
```yaml
# Fine-grained access control
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: api-access
  namespace: devmentor
spec:
  selector:
    matchLabels:
      app: ai-gateway
  action: ALLOW
  rules:
  - to:
    - operation:
        methods: ["GET"]
        paths: ["/api/public/*"]
  - to:
    - operation:
        methods: ["GET", "POST", "PUT", "DELETE"]
        paths: ["/api/*"]
    when:
    - key: request.auth.claims[role]
      values: ["admin", "developer"]
```

## Quick Start: OAuth2 Proxy with GitHub

Since you already have Kubernetes and Istio, here's the fastest path:

```yaml
# oauth2-proxy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oauth2-proxy
  namespace: devmentor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: oauth2-proxy
  template:
    metadata:
      labels:
        app: oauth2-proxy
    spec:
      containers:
      - name: oauth2-proxy
        image: quay.io/oauth2-proxy/oauth2-proxy:latest
        args:
        - --provider=github
        - --github-org=YOUR_GITHUB_ORG
        - --email-domain=*
        - --upstream=http://ai-gateway:3001
        - --http-address=0.0.0.0:4180
        - --cookie-secure=false
        env:
        - name: OAUTH2_PROXY_CLIENT_ID
          valueFrom:
            secretKeyRef:
              name: oauth2-proxy
              key: client-id
        - name: OAUTH2_PROXY_CLIENT_SECRET
          valueFrom:
            secretKeyRef:
              name: oauth2-proxy
              key: client-secret
        - name: OAUTH2_PROXY_COOKIE_SECRET
          valueFrom:
            secretKeyRef:
              name: oauth2-proxy
              key: cookie-secret
        ports:
        - containerPort: 4180
---
apiVersion: v1
kind: Service
metadata:
  name: oauth2-proxy
  namespace: devmentor
spec:
  ports:
  - port: 4180
    targetPort: 4180
  selector:
    app: oauth2-proxy
```

## Security Best Practices

1. **Always use mTLS** between services in the mesh
2. **Validate JWTs** at the ingress gateway
3. **Use RBAC** for fine-grained access control
4. **Rotate secrets** regularly
5. **Enable audit logging** for all auth events
6. **Implement rate limiting** to prevent abuse
7. **Use short-lived tokens** (15 minutes for access tokens)
8. **Implement refresh token rotation**

## Monitoring Authentication

Add these metrics to your monitoring service:

```javascript
// Authentication metrics
const authMetrics = {
  successful_logins: new prometheus.Counter({
    name: 'auth_successful_logins_total',
    help: 'Total successful login attempts'
  }),
  failed_logins: new prometheus.Counter({
    name: 'auth_failed_logins_total',
    help: 'Total failed login attempts'
  }),
  token_validations: new prometheus.Counter({
    name: 'auth_token_validations_total',
    help: 'Total JWT token validations'
  }),
  active_sessions: new prometheus.Gauge({
    name: 'auth_active_sessions',
    help: 'Current active user sessions'
  })
};
```

## Next Steps

1. **Enable sidecar injection** for your namespaces
2. **Choose authentication provider** (GitHub OAuth for quick start)
3. **Deploy OAuth2 Proxy** or Keycloak
4. **Configure Istio policies**
5. **Test with curl commands**
6. **Update frontend** to handle auth flow
7. **Add monitoring** for auth events
{% endraw %}
