---
layout: product
title: DEVMENTOR OPERATIONS GUIDE
product: DevMentor
source: infrastructure/operations/DEVMENTOR_OPERATIONS_GUIDE.md
---

{% raw %}
CURRENT ARCHITECTURE

---

# DevMentor Operations & Debugging Guide

> A comprehensive, teaching-focused guide for operating and debugging the DevMentor platform
> Learn not just the "how" but the "why" behind every command and decision

## Table of Contents
- [Quick Start](#quick-start)
- [Understanding the System](#understanding-the-system)
- [Cluster Operations Deep Dive](#cluster-operations-deep-dive)
- [Essential Commands](#essential-commands)
- [Redis Mastery](#redis-mastery)
- [Debugging Flows](#debugging-flows)
- [Common Issues & Solutions](#common-issues--solutions)
- [Advanced Operations](#advanced-operations)
- [Learning Exercises](#learning-exercises)
- [Troubleshooting Playbook](#troubleshooting-playbook)

---

## Quick Start

### 🚀 One-Minute Setup
```bash
# From repo root (devmentor/)
export NS=devmentor-app
export GATEWAY=http://localhost:8080
export UI=http://localhost:3000
export REDIS_URL=redis://localhost:6379

# Start the UI
cd devmentor-ui && npm run dev+watch

# Port-forward the gateway (if using K8s)
kubectl -n $NS port-forward svc/api-gateway 8080:8080 >/dev/null 2>&1 &

# Quick health check
curl -s $GATEWAY/health | jq '.'
```

### 📋 Pre-flight Checklist
```bash
# 1. Check cluster context
kubectl config current-context | cat

# 2. Verify services are up
kubectl -n $NS get pods | cat

# 3. Check Redis connectivity
redis-cli -u $REDIS_URL PING | cat

# 4. UI reachability
curl -sI $UI | head -n 1 | cat
```

---

## Understanding the System

### Why Microservices Architecture?

**The Problem We're Solving:**
Imagine building a monolithic application where every feature (auth, AI, projects) is in one codebase. A bug in the AI module could crash authentication. Scaling means duplicating everything. DevMentor uses microservices to:

1. **Isolation**: Each service fails independently
2. **Scalability**: Scale only what needs scaling (e.g., AI Gateway during heavy load)
3. **Technology Freedom**: Auth in TypeScript, AI in Python, each optimized
4. **Team Independence**: Teams work on services without conflicts

### Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│                    Internet/Browser                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ↓
┌─────────────────────────────────────────────────────────┐
│   Istio Ingress Gateway (NodePort/LoadBalancer)         │
│   Why: Single entry point, TLS termination, routing     │
└────────────────────┬────────────────────────────────────┘
                     │ Internal routing
                     ↓
┌─────────────────────────────────────────────────────────┐
│         API Gateway (8080) - Express.js                  │
│   Why: Request aggregation, auth checks, rate limiting  │
└──┬──────────┬──────────┬──────────┬──────────┬─────────┘
   │          │          │          │          │
   ↓          ↓          ↓          ↓          ↓
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│ UI   │  │ AI   │  │Auth  │  │Memory│  │Project│
│(3000)│  │(3001)│  │(3002)│  │(3003)│  │(3004)│
└──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘
   │         │         │         │         │
   └─────────┴────┬────┴─────────┴─────────┘
                  │
     ┌────────────┼────────────┐
     ↓            ↓            ↓
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Redis  │  │PostgreSQL│  │ Qdrant  │
│ Cache & │  │   RDBMS  │  │ Vector  │
│ Streams │  │          │  │   DB    │
└─────────┘  └─────────┘  └─────────┘
```

### Key Components Explained

| Component | Port | Purpose | Why It Exists | Health Check |
|-----------|------|---------|---------------|---------------|
| **API Gateway** | 8080 | Single entry point, routing | Acts as a reverse proxy, hiding internal complexity from clients | `curl $GATEWAY/health` |
| **UI Dashboard** | 3000 | Frontend, LADS endpoints | Serves React app, handles SSR, provides architecture analysis APIs | `curl $UI/api/architecture/manifest` |
| **AI Gateway** | 3001 | LLM integration, tooltips | Abstracts multiple AI providers (OpenAI, Ollama), handles retries | `curl localhost:3001/health` |
| **Auth Service** | 3002 | OAuth, JWT, sessions | Centralizes authentication, issues tokens, manages sessions | `curl localhost:3002/health` |
| **Memory Service** | 3003 | Vector search, RAG | Stores embeddings, enables semantic search, powers context retrieval | `curl localhost:3003/health` |
| **Project Service** | 3004 | Tasks, epics, roadmaps | Manages project state, integrates with Linear/Jira | `curl localhost:3004/health` |
| **Learning Engine** | 3005 | Quizzes, recommendations | Tracks learning progress, suggests content, generates assessments | `curl localhost:3005/health` |

### Data Flow Example: User Login
```
1. Browser → POST /api/auth/login → API Gateway
2. API Gateway → Validates request → Auth Service
3. Auth Service → Checks credentials → PostgreSQL
4. Auth Service → Creates session → Redis
5. Auth Service → Returns JWT → API Gateway
6. API Gateway → Returns token → Browser
7. Browser → Stores token → Local Storage
```

### Why Each Database?

- **Redis**: Fast (in-memory), perfect for caching, pub/sub for real-time updates
- **PostgreSQL**: ACID compliance for critical data (users, projects)
- **Qdrant**: Optimized for vector similarity search (AI context retrieval)

---

## Cluster Operations Deep Dive

### 🎓 Understanding Kubernetes & KIND

**What is Kubernetes?**
Kubernetes (K8s) is like a smart building manager for your applications. Instead of manually starting services on servers, K8s:
- **Schedules**: Decides which server runs which service
- **Heals**: Restarts crashed services automatically
- **Scales**: Adds more instances when load increases
- **Networks**: Creates internal DNS and load balancing

**What is KIND?**
KIND (Kubernetes IN Docker) runs a full K8s cluster using Docker containers. Perfect for local development because:
- No VMs needed (lightweight)
- Fast to create/destroy
- Mimics production behavior

### 🚀 Starting the Cluster from Scratch

#### Step 1: Create KIND Cluster
```bash
# Why: Creates a control plane + worker node as Docker containers
kind create cluster --name devmentor --config=- <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: devmentor
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
EOF

# Verify cluster is running
# Why: Ensures kubectl can communicate with the cluster
kubectl cluster-info --context kind-devmentor

# What just happened:
# 1. Docker created containers acting as K8s nodes
# 2. KIND installed K8s components (API server, etcd, scheduler)
# 3. kubectl config was updated to point to this cluster
```

#### Step 2: Install Istio Service Mesh
```bash
# Why Istio? It provides:
# - Automatic mTLS between services (security)
# - Traffic management (canary deployments)
# - Observability (distributed tracing)
# - Resilience (retries, circuit breakers)

# Download Istio
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.26.3 sh -
cd istio-1.26.3
export PATH=$PWD/bin:$PATH

# Install Istio
istioctl install --set profile=demo -y
# What this does:
# - Deploys Istio control plane (istiod)
# - Deploys Ingress/Egress gateways
# - Configures automatic sidecar injection

# Enable sidecar injection for our namespace
kubectl create namespace devmentor-app
kubectl label namespace devmentor-app istio-injection=enabled
# Why: Every pod in this namespace will get an Envoy proxy sidecar
# The sidecar intercepts all network traffic for security/observability
```

#### Step 3: Deploy Core Infrastructure
```bash
# Deploy Redis
# Why: Needed for caching, session storage, pub/sub
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: devmentor-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        volumeMounts:
        - name: redis-storage
          mountPath: /data
      volumes:
      - name: redis-storage
        emptyDir: {}  # Why emptyDir: Data persists for pod lifetime
---
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: devmentor-app
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379
EOF

# Why Service object? 
# - Provides stable DNS name (redis.devmentor-app.svc.cluster.local)
# - Load balances if multiple Redis pods exist
# - Decouples service discovery from pod IPs
```

#### Step 4: Understanding What We Built
```bash
# View the cluster architecture
kubectl get nodes -o wide
# Shows: Node IPs, OS, container runtime

# View all resources in our namespace
kubectl -n devmentor-app get all
# Shows: Deployments (desired state), ReplicaSets (maintains replicas), Pods (actual containers)

# Understand pod networking
kubectl -n devmentor-app get pods -o wide
# Shows: Pod IPs (internal), Node placement

# Check Istio injection
kubectl -n devmentor-app get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[*].name}{"\n"}{end}'
# Why check: Ensures each pod has both app container AND istio-proxy sidecar
```

### 🔍 Cluster Debugging Techniques

```bash
# Technique 1: Events tell you what K8s is doing
kubectl -n devmentor-app get events --sort-by='.lastTimestamp'
# Why: Shows pod scheduling, image pulls, crashes, resource issues

# Technique 2: Describe for detailed troubleshooting
kubectl -n devmentor-app describe pod <pod-name>
# Why: Shows init containers, volume mounts, environment variables, events

# Technique 3: Logs from crashed pods
kubectl -n devmentor-app logs <pod-name> --previous
# Why: --previous flag shows logs from before the crash

# Technique 4: Shell into pod for investigation
kubectl -n devmentor-app exec -it <pod-name> -- /bin/sh
# Why: Inspect files, test connectivity, check environment

# Technique 5: Resource usage analysis
kubectl -n devmentor-app top pods
# Why: Identify memory leaks, CPU bottlenecks
```

---

## Redis Mastery

### 🎓 Why Redis? Understanding the Use Cases

**Redis in DevMentor serves 5 critical functions:**

1. **Session Storage**: User sessions (faster than database)
2. **Caching Layer**: API responses, computed diagrams
3. **Pub/Sub Messaging**: Real-time updates to UI
4. **Streams**: Event sourcing for audit logs
5. **Rate Limiting**: API throttling counters

### 🔑 Connecting to Redis

#### Method 1: Port Forwarding (Development)
```bash
# Why port-forward? Makes cluster Redis accessible locally
kubectl -n devmentor-app port-forward svc/redis 6379:6379 &

# How it works:
# 1. kubectl proxies TCP connection
# 2. localhost:6379 → kubectl → API server → Pod:6379
# 3. Secure tunnel without exposing Redis publicly

# Connect with redis-cli
redis-cli -h localhost -p 6379
# OR with environment variable
export REDIS_URL=redis://localhost:6379
redis-cli -u $REDIS_URL
```

#### Method 2: In-Cluster Access (Debugging)
```bash
# Why: Test Redis from within the cluster network
kubectl -n devmentor-app run redis-client --rm -it --image redis:alpine -- redis-cli -h redis

# What's happening:
# 1. Creates temporary pod with redis-cli
# 2. Uses cluster DNS (redis = redis.devmentor-app.svc.cluster.local)
# 3. Auto-deletes pod when you exit (--rm flag)
```

#### Method 3: Through a Jump Pod (Advanced)
```bash
# Deploy a tools pod for persistent debugging
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: tools
  namespace: devmentor-app
spec:
  containers:
  - name: tools
    image: nicolaka/netshoot
    command: ["sleep", "infinity"]
EOF

# Connect to Redis through tools pod
kubectl -n devmentor-app exec -it tools -- redis-cli -h redis
# Why: Persistent pod for multiple debugging sessions
```

### 📊 Redis Data Patterns in DevMentor

#### Pattern 1: Session Storage
```bash
# How sessions are stored
redis-cli> SET session:user123 '{"userId":"123","email":"user@example.com","roles":["admin"]}'
redis-cli> EXPIRE session:user123 3600  # Why: Auto-cleanup after 1 hour
redis-cli> TTL session:user123  # Check time-to-live

# Why Redis for sessions?
# - Faster than PostgreSQL (memory vs disk)
# - Automatic expiration (no cleanup jobs needed)
# - Shared across service instances
```

#### Pattern 2: Caching API Responses
```bash
# Cache LADS diagram for 5 minutes
redis-cli> SET cache:lads:diagram:services '{"svg":"<svg>...</svg>"}' EX 300

# Why this pattern?
# - Expensive computations cached (diagram generation)
# - EX flag sets expiry atomically
# - Key naming convention prevents collisions

# Check all cached diagrams
redis-cli> KEYS cache:lads:diagram:*
```

#### Pattern 3: Pub/Sub for Real-time Updates
```bash
# Terminal 1: Subscribe to project updates
redis-cli> SUBSCRIBE projects:updates

# Terminal 2: Publish an update
redis-cli> PUBLISH projects:updates '{"id":"proj1","status":"completed"}'

# Why Pub/Sub?
# - WebSocket connections subscribe to channels
# - Zero polling, instant updates
# - Decoupled publishers and subscribers
```

#### Pattern 4: Streams for Event Sourcing
```bash
# Add event to stream
redis-cli> XADD events:projects * action "created" projectId "123" userId "456"

# Read events
redis-cli> XRANGE events:projects - +  # All events
redis-cli> XREAD COUNT 10 STREAMS events:projects 0  # First 10 events

# Why Streams?
# - Ordered, immutable event log
# - Multiple consumers can read independently
# - Perfect for audit trails and event replay
```

#### Pattern 5: Rate Limiting
```bash
# Implement sliding window rate limit
redis-cli> INCR rate:api:user123:$(date +%s)
redis-cli> EXPIRE rate:api:user123:$(date +%s) 60

# Check rate in last minute
for i in {0..59}; do
  redis-cli GET rate:api:user123:$(($(date +%s) - i))
done | paste -sd+ | bc

# Why this works:
# - One key per second, auto-expires
# - Sum keys for sliding window count
# - No complex data structures needed
```

### 🔍 Redis Debugging Commands

```bash
# Memory analysis
redis-cli> INFO memory
# Why: Check memory usage, fragmentation, RSS

# Slow query log
redis-cli> SLOWLOG GET 10
# Why: Identify performance bottlenecks

# Monitor real-time commands
redis-cli> MONITOR
# Why: See all commands being executed (careful in production!)

# Check persistence
redis-cli> LASTSAVE
# Why: Verify backups are happening

# Key distribution
redis-cli --bigkeys
# Why: Find memory hogs

# Pattern analysis
redis-cli --scan --pattern 'session:*' | head -20
# Why: Sample keys without blocking
```

---

## Essential Commands

### 🔧 Environment Setup
```bash
# Complete environment setup
cat << 'EOF' > ~/.devmentor-env
export NS=devmentor-app
export GATEWAY=http://localhost:8080
export UI=http://localhost:3000
export REDIS_URL=redis://localhost:6379
export PATH="$PATH:$(pwd)/istio-1.26.3/bin"
EOF

# Source it
source ~/.devmentor-env
```

### 🏗️ Build & Deploy

#### Local Development
```bash
# Start UI with live reload
cd devmentor-ui
npm run dev+watch  # Runs on port 3001 with architecture watcher

# Start services individually
cd services/api-gateway && npm start
cd services/ai-gateway && npm start
cd services/auth-service && npm start
```

#### Kubernetes Deployment
```bash
# Deploy everything (KIND + Istio + services)
./scripts/deploy-k8s-istio.sh deploy | cat

# Build and reload a specific service
svc=api-gateway
img=devmentor/$svc:latest
path=services/$svc

docker build -t $img $path | cat && \
kind load docker-image $img --name devmentor | cat && \
kubectl -n $NS rollout restart deploy/$svc && \
kubectl -n $NS rollout status deploy/$svc | cat
```

### 📊 Monitoring & Logs

#### Real-time Logs
```bash
# Follow gateway logs with prefix
kubectl -n $NS logs deploy/api-gateway -f | sed -u 's/^/[gateway] /'

# Tail multiple services
for svc in api-gateway ai-gateway auth-service; do
  kubectl -n $NS logs deploy/$svc --tail=50 | sed "s/^/[$svc] /"
done
```

#### Health Monitoring
```bash
# Comprehensive health check
echo "=== Service Health Status ===" && \
for svc in api-gateway ai-gateway auth-service memory-service project-service; do
  echo -n "$svc: "
  kubectl -n $NS get pods -l app=$svc -o jsonpath='{.items[0].status.phase}' 2>/dev/null || echo "Not found"
done
```

---

## Debugging Flows

### 🎓 The Debugging Mindset

Before diving into specific flows, understand the debugging philosophy:

1. **Observe, Don't Assume**: Gather data before forming hypotheses
2. **Start Wide, Narrow Down**: Check system health → service health → specific endpoints
3. **Follow the Request**: Trace the path from client to database
4. **Check the Basics First**: Network, DNS, resources before complex issues
5. **Document Everything**: Your future self will thank you

### 🔍 Flow 1: LADS Pipeline Issues

**Symptom**: `/lads/manifest` returns 504 Gateway Timeout

**Debugging Steps**:
```bash
# 1. Check if UI is running
ps aux | grep "next dev -p 3001" | grep -v grep || echo "UI not running!"

# 2. Test UI endpoint directly
curl -s $UI/api/architecture/manifest | jq '.' || echo "UI endpoint failed"

# 3. Check gateway proxy configuration
kubectl -n $NS describe configmap api-gateway-config | grep DASHBOARD_URL

# 4. Verify network path
kubectl -n $NS run debug --image=nicolaka/netshoot --rm -it -- \
  curl -s http://devmentor-ui:3001/api/architecture/manifest

# 5. Check logs for errors
kubectl -n $NS logs deploy/api-gateway --tail=100 | grep -E "ERROR|504|timeout"
```

**Resolution**:
```bash
# Restart UI with proper port
cd devmentor-ui
pkill -f "next dev" || true
npm run dev+watch  # Should start on 3001

# Update gateway environment if needed
kubectl -n $NS set env deploy/api-gateway DASHBOARD_URL=http://devmentor-ui:3001
kubectl -n $NS rollout restart deploy/api-gateway
```

### 🔍 Flow 2: Redis Connection Issues

**Symptom**: Services show `ECONNREFUSED 127.0.0.1:6379`

**Debugging Steps**:
```bash
# 1. Check Redis deployment
kubectl -n $NS get pods -l app=redis

# 2. Test Redis connectivity from cluster
kubectl -n $NS run redis-test --image=redis:alpine --rm -it -- \
  redis-cli -h redis -p 6379 PING

# 3. Check service DNS
kubectl -n $NS run dns-test --image=busybox --rm -it -- \
  nslookup redis.devmentor-app.svc.cluster.local

# 4. Verify Redis data
kubectl -n $NS port-forward svc/redis 6379:6379 &
redis-cli -u $REDIS_URL INFO keyspace | cat
redis-cli -u $REDIS_URL --raw KEYS '*' | head -20
```

**Resolution**:
```bash
# Option 1: Use cluster Redis with port-forward
kubectl -n $NS port-forward svc/redis 6379:6379 >/dev/null 2>&1 &

# Option 2: Start local Redis for dev
docker run -d --name devmentor-redis -p 6379:6379 redis:alpine

# Option 3: Update service to use cluster Redis
kubectl -n $NS set env deploy/ai-gateway REDIS_URL=redis://redis:6379
kubectl -n $NS rollout restart deploy/ai-gateway
```

### 🔍 Flow 3: Service Discovery Problems

**Symptom**: Services can't reach each other (connection refused)

**Debugging Steps**:
```bash
# 1. Test service-to-service connectivity
kubectl -n $NS run netshoot --image=nicolaka/netshoot --rm -it -- sh -c "
  echo '=== Testing Service Connectivity ==='
  for svc in auth-service:3002 ai-gateway:3001 memory-service:3003; do
    echo -n \"Testing \$svc: \"
    wget -q -O- http://\$svc/health >/dev/null 2>&1 && echo 'OK' || echo 'FAILED'
  done
"

# 2. Check service endpoints
for svc in auth-service ai-gateway memory-service; do
  echo "=== $svc endpoints ==="
  kubectl -n $NS get endpoints $svc
done

# 3. Verify Istio sidecar injection
kubectl -n $NS get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[*].name}{"\n"}{end}' | column -t
```

**Resolution**:
```bash
# Restart services with proper labels
kubectl -n $NS label namespace devmentor-app istio-injection=enabled --overwrite
kubectl -n $NS rollout restart deploy --all

# Verify sidecars are injected
kubectl -n $NS get pods -o jsonpath='{.items[*].spec.containers[*].name}' | tr ' ' '\n' | grep istio-proxy
```

### 🔍 Flow 4: Authentication Failures

**Symptom**: 401 Unauthorized on protected endpoints

**Understanding the Auth Flow**:
```
1. Client → Login request → Auth Service
2. Auth Service → Validate credentials → Database
3. Auth Service → Generate JWT → Sign with secret
4. Client → Store JWT → Send in headers
5. API Gateway → Validate JWT → Forward request
```

**Debugging Steps**:
```bash
# 1. Test auth service directly
curl -s -X POST $GATEWAY/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' | jq '.'

# 2. Check JWT secret configuration
kubectl -n $NS get secret auth-jwt-secret -o jsonpath='{.data.JWT_SECRET}' | base64 -d

# 3. Verify GitHub OAuth setup
kubectl -n $NS describe configmap auth-service-config | grep -E "GITHUB_CLIENT|GITHUB_CALLBACK"

# 4. Test token validation
TOKEN="your-jwt-token-here"
curl -s $GATEWAY/api/auth/profile \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 5. Decode JWT to check claims
echo $TOKEN | cut -d. -f2 | base64 -d | jq '.'
# Why: Check expiration, issuer, audience claims
```

**Resolution**:
```bash
# Create/update JWT secret
kubectl -n $NS create secret generic auth-jwt-secret \
  --from-literal=JWT_SECRET=$(openssl rand -base64 32) \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart auth service
kubectl -n $NS rollout restart deploy/auth-service

# Test GitHub OAuth flow
curl -s -X POST $GATEWAY/api/auth/github/login | jq '.redirectUrl'
```

### 🔍 Flow 5: Memory Leak Detection

**Symptom**: 401 Unauthorized on protected endpoints

**Debugging Steps**:
```bash
# 1. Test auth service directly
curl -s -X POST $GATEWAY/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' | jq '.'

# 2. Check JWT secret configuration
kubectl -n $NS get secret auth-jwt-secret -o jsonpath='{.data.JWT_SECRET}' | base64 -d

# 3. Verify GitHub OAuth setup
kubectl -n $NS describe configmap auth-service-config | grep -E "GITHUB_CLIENT|GITHUB_CALLBACK"

# 4. Test token validation
TOKEN="your-jwt-token-here"
curl -s $GATEWAY/api/auth/profile \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

**Resolution**:
```bash
# Create/update JWT secret
kubectl -n $NS create secret generic auth-jwt-secret \
  --from-literal=JWT_SECRET=$(openssl rand -base64 32) \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart auth service
kubectl -n $NS rollout restart deploy/auth-service

# Test GitHub OAuth flow
curl -s -X POST $GATEWAY/api/auth/github/login | jq '.redirectUrl'
```

**Symptom**: Service pods restarting frequently, OOMKilled status

**Debugging Steps**:
```bash
# 1. Check pod restart history
kubectl -n $NS get pods -o custom-columns=NAME:.metadata.name,RESTARTS:.status.containerStatuses[0].restartCount,LAST_RESTART:.status.containerStatuses[0].lastState.terminated.finishedAt

# 2. Analyze memory usage over time
kubectl -n $NS top pods --containers | grep -E "NAME|api-gateway"

# 3. Check OOM events
kubectl -n $NS get events --field-selector reason=OOMKilled

# 4. Inspect Node.js heap (if service is running)
kubectl -n $NS exec -it deploy/api-gateway -- node -e "console.log(process.memoryUsage())"

# 5. Get heap snapshot for analysis
kubectl -n $NS exec -it deploy/api-gateway -- kill -USR2 1
kubectl -n $NS cp api-gateway-xxx:/tmp/heapdump.xxx.heapsnapshot ./heapdump.heapsnapshot
# Why: USR2 signal triggers V8 heap dump
```

**Resolution**:
```bash
# Increase memory limits
kubectl -n $NS patch deployment api-gateway -p '
{
  "spec": {
    "template": {
      "spec": {
        "containers": [{
          "name": "api-gateway",
          "resources": {
            "limits": {"memory": "1Gi"},
            "requests": {"memory": "512Mi"}
          }
        }]
      }
    }
  }
}'

# Enable Node.js memory monitoring
kubectl -n $NS set env deploy/api-gateway NODE_OPTIONS="--max-old-space-size=768 --expose-gc"
```

### 🔍 Flow 6: Distributed Tracing Deep Dive

**Symptom**: Slow API responses, unclear bottlenecks

**Understanding Distributed Tracing**:
- Each request gets a unique trace ID
- Services create spans (timed operations)
- Spans form a tree showing the request path
- Bottlenecks become visually obvious

**Setup & Analysis**:
```bash
# 1. Deploy Jaeger (if not installed)
kubectl apply -n istio-system -f https://raw.githubusercontent.com/istio/istio/release-1.26/samples/addons/jaeger.yaml

# 2. Generate traced traffic
TRACE_ID=$(uuidgen | tr '[:upper:]' '[:lower:]' | tr -d '-')
curl -v $GATEWAY/api/projects \
  -H "x-b3-traceid: $TRACE_ID" \
  -H "x-b3-spanid: $(openssl rand -hex 8)" \
  -H "x-b3-sampled: 1"

echo "Trace ID: $TRACE_ID"

# 3. Port-forward Jaeger
kubectl -n istio-system port-forward svc/tracing 16686:80 &

# 4. Query trace via API
curl -s "http://localhost:16686/api/traces/$TRACE_ID" | jq '.data[0].spans[] | {service: .process.serviceName, operation: .operationName, duration: .duration}'

# 5. Find slow spans
curl -s "http://localhost:16686/api/traces/$TRACE_ID" | jq '.data[0].spans | sort_by(.duration) | reverse | .[0:3]'
```

### 🔍 Flow 7: WebSocket Connection Issues

**Symptom**: Real-time updates not working, WebSocket disconnections

**Debugging Steps**:
```bash
# 1. Test WebSocket endpoint
wscat -c ws://localhost:8080/ws
# Why: wscat is like curl for WebSockets

# 2. Check Istio WebSocket configuration
kubectl -n $NS get virtualservice -o yaml | grep -A5 websocket

# 3. Monitor WebSocket connections
kubectl -n $NS exec -it deploy/api-gateway -- netstat -an | grep :8080 | grep ESTABLISHED

# 4. Check timeout settings
kubectl -n $NS get destinationrule -o yaml | grep -E "timeout|keepalive"

# 5. Test with custom client
cat > test-ws.js << 'EOF'
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080/ws');

ws.on('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({type: 'ping'}));
});

ws.on('message', (data) => {
  console.log('Received:', data.toString());
});

ws.on('error', (err) => {
  console.error('Error:', err);
});

ws.on('close', (code, reason) => {
  console.log(`Closed: ${code} - ${reason}`);
});
EOF

node test-ws.js
```

**Resolution**:
```bash
# Configure Istio for WebSocket
kubectl apply -f - <<EOF
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: api-gateway-websocket
  namespace: devmentor-app
spec:
  host: api-gateway
  trafficPolicy:
    connectionPool:
      http:
        http2MaxRequests: 10000
        h2UpgradePolicy: UPGRADE  # Allow WebSocket upgrade
EOF
```

### 🔍 Flow 8: Database Connection Pool Exhaustion

**Symptom**: Intermittent database errors, "too many connections"

**Debugging Steps**:
```bash
# 1. Check PostgreSQL connections
kubectl -n $NS exec -it deploy/postgres -- psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;"

# 2. View active queries
kubectl -n $NS exec -it deploy/postgres -- psql -U postgres -c "SELECT pid, state, query FROM pg_stat_activity WHERE state != 'idle';"

# 3. Check service connection pool settings
kubectl -n $NS describe configmap project-service-config | grep -E "DB_POOL|DATABASE"

# 4. Monitor connection metrics
watch -n 2 'kubectl -n $NS exec deploy/postgres -- psql -U postgres -c "SELECT state, count(*) FROM pg_stat_activity GROUP BY state;"'

# 5. Identify connection leaks
kubectl -n $NS exec deploy/postgres -- psql -U postgres -c "
SELECT 
  pid,
  usename,
  application_name,
  client_addr,
  state,
  state_change,
  NOW() - state_change as duration
FROM pg_stat_activity 
WHERE state != 'idle' 
ORDER BY duration DESC;"
```

**Resolution**:
```bash
# Kill long-running queries
kubectl -n $NS exec deploy/postgres -- psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state != 'idle' AND NOW() - state_change > interval '5 minutes';"

# Update pool configuration
kubectl -n $NS set env deploy/project-service \
  DB_POOL_MIN=2 \
  DB_POOL_MAX=10 \
  DB_POOL_IDLE_TIMEOUT=30000 \
  DB_POOL_CONNECTION_TIMEOUT=5000

# Restart service
kubectl -n $NS rollout restart deploy/project-service
```

### 🔍 Flow 9: Istio Sidecar Issues

**Symptom**: Service mesh not working, no telemetry data

**Debugging Steps**:
```bash
# 1. Check sidecar injection
kubectl -n $NS get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.metadata.annotations.sidecar\.istio\.io/status}{"\n"}{end}'

# 2. Verify Envoy proxy is running
kubectl -n $NS get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{range .spec.containers[*]}{.name}{" "}{end}{"\n"}{end}' | grep istio-proxy

# 3. Check Envoy configuration
kubectl -n $NS exec deploy/api-gateway -c istio-proxy -- curl -s localhost:15000/config_dump | jq '.configs[0].dynamic_listeners'

# 4. View Envoy stats
kubectl -n $NS exec deploy/api-gateway -c istio-proxy -- curl -s localhost:15000/stats/prometheus | grep -E "http.*success"

# 5. Check mTLS status
istioctl authn tls-check api-gateway.devmentor-app.svc.cluster.local
```

**Resolution**:
```bash
# Force sidecar injection
kubectl -n $NS label namespace devmentor-app istio-injection=enabled --overwrite
kubectl -n $NS rollout restart deploy --all

# Debug specific pod
istioctl proxy-config listeners deploy/api-gateway -n devmentor-app
istioctl proxy-config routes deploy/api-gateway -n devmentor-app
```

---

## Common Issues & Solutions

### Issue: "Cannot find module" errors
```bash
# Check node_modules
cd services/api-gateway
rm -rf node_modules package-lock.json
npm install

# For TypeScript services
npm run build
```

### Issue: Port already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Issue: Docker build failures
```bash
# Clean Docker cache
docker system prune -af
docker volume prune -f

# Rebuild with no cache
docker build --no-cache -t devmentor/api-gateway:latest services/api-gateway
```

### Issue: Kubernetes pods stuck in "Pending"
```bash
# Check events
kubectl -n $NS describe pod <pod-name> | tail -20

# Check resource constraints
kubectl top nodes
kubectl -n $NS top pods

# Check PVC if using storage
kubectl -n $NS get pvc
```

---

## Advanced Operations

### 🎯 Distributed Tracing with Jaeger

```bash
# 1. Enable tracing
kubectl -n istio-system port-forward svc/tracing 16686:80 &

# 2. Send traced request
curl -s -H 'x-b3-sampled: 1' \
     -H 'traceparent: 00-$(openssl rand -hex 16)-$(openssl rand -hex 8)-01' \
     $GATEWAY/lads/manifest >/dev/null

# 3. View trace
open http://localhost:16686
# Search for: service=api-gateway operation=GET /lads/manifest
```

### 📈 Performance Testing

```bash
# Simple load test
ab -n 1000 -c 10 $GATEWAY/health

# Test LADS generation under load
for i in {1..10}; do
  curl -s -X POST $GATEWAY/lads/generate \
    -H 'Content-Type: application/json' \
    -d '{"repoPath":"/path/to/repo"}' &
done
wait

# Monitor during test
watch -n 1 'kubectl -n $NS top pods'
```

### 🔄 Blue-Green Deployment

```bash
# 1. Deploy green version
kubectl -n $NS create deployment api-gateway-green \
  --image=devmentor/api-gateway:v2

# 2. Test green version
kubectl -n $NS port-forward deploy/api-gateway-green 8081:8080 &
curl http://localhost:8081/health

# 3. Switch traffic
kubectl -n $NS patch service api-gateway \
  -p '{"spec":{"selector":{"app":"api-gateway","version":"green"}}}'

# 4. Verify and cleanup
kubectl -n $NS delete deployment api-gateway-blue
```

### 🧪 Chaos Engineering

```bash
# Simulate network latency
kubectl -n $NS run chaos --image=nicolaka/netshoot --rm -it -- \
  tc qdisc add dev eth0 root netem delay 500ms

# Simulate pod failure
kubectl -n $NS delete pod -l app=ai-gateway

# Simulate high CPU
kubectl -n $NS run stress --image=progrium/stress --rm -it -- \
  --cpu 2 --timeout 60s
```

---

## Learning Exercises

### 🎯 Exercise 0: Understanding the Basics

**Goal**: Master fundamental concepts before complex operations

```bash
# Question 1: What's the difference between a Service and a Deployment?
# Let's explore:

# Create a deployment (manages pods)
kubectl create deployment nginx --image=nginx --replicas=3

# See what was created
kubectl get all -l app=nginx
# Notice: Deployment → ReplicaSet → 3 Pods

# Now expose it as a service
kubectl expose deployment nginx --port=80 --type=ClusterIP

# Compare the resources
kubectl get deploy,rs,pod,svc -l app=nginx

# Key Learning:
# - Deployment: Desired state ("I want 3 nginx pods")
# - ReplicaSet: Maintains the replicas
# - Pods: Actual running containers
# - Service: Stable network endpoint for the pods

# Clean up
kubectl delete deploy,svc nginx
```

### Exercise 1: Complete LADS Flow
**Goal**: Generate and retrieve architecture diagrams

```bash
# Step 1: Get manifest (available pages)
curl -s $GATEWAY/lads/manifest | jq '.pages[]'

# Step 2: Generate diagrams
curl -s -X POST $GATEWAY/lads/generate \
  -H 'Content-Type: application/json' \
  -d '{"repoPath":"'$(pwd)'","includeMetrics":true}' | jq '.'

# Step 3: Fetch specific diagram
PAGE="Services"
curl -s "$GATEWAY/lads/diagram?format=svg&page=$PAGE" > "/tmp/$PAGE.svg"
open "/tmp/$PAGE.svg"

# Step 4: Fetch all pages
for page in $(curl -s $GATEWAY/lads/manifest | jq -r '.pages[]'); do
  encoded=$(echo -n "$page" | python3 -c "import sys,urllib.parse; print(urllib.parse.quote(sys.stdin.read()))")
  curl -s "$GATEWAY/lads/diagram?format=svg&page=$encoded" > "/tmp/${page// /_}.svg"
  echo "Generated: /tmp/${page// /_}.svg"
done
```

### Exercise 2: Redis Streams Monitoring
**Goal**: Watch real-time project events

```bash
# Terminal 1: Monitor stream
redis-cli -u $REDIS_URL --raw XREAD BLOCK 0 STREAMS stream:devmentor:projects $

# Terminal 2: Create project event
curl -s -X POST $GATEWAY/api/projects \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Project","description":"Learning exercise"}'

# Terminal 3: Check stream info
redis-cli -u $REDIS_URL XINFO STREAM stream:devmentor:projects
```

### Exercise 3: Service Mesh Visualization
**Goal**: Understand traffic flow with Kiali

```bash
# 1. Start Kiali
kubectl -n istio-system port-forward svc/kiali 20001:20001 &

# 2. Generate traffic
for i in {1..100}; do
  curl -s $GATEWAY/health >/dev/null
  curl -s $GATEWAY/api/auth/profile >/dev/null 2>&1
  curl -s $GATEWAY/lads/manifest >/dev/null
  sleep 0.1
done &

# 3. View graph
open http://localhost:20001
# Navigate to Graph → Select namespace: devmentor-app → Display: Traffic Animation
```

### Exercise 4: Debugging with Logs Aggregation
**Goal**: Correlate logs across services

```bash
# Create a correlation ID
CORRELATION_ID=$(uuidgen)

# Send request with correlation ID
curl -s $GATEWAY/lads/generate \
  -H "X-Correlation-ID: $CORRELATION_ID" \
  -H 'Content-Type: application/json' \
  -d '{"repoPath":"'$(pwd)'"}'

# Search logs across all services
for svc in api-gateway ai-gateway auth-service; do
  echo "=== $svc logs with correlation $CORRELATION_ID ==="
  kubectl -n $NS logs deploy/$svc --tail=1000 | grep $CORRELATION_ID
done
```

### Exercise 5: Service Mesh Deep Dive

**Goal**: Understand Istio's role in the architecture

```bash
# 1. Deploy a test service with and without Istio
# Without Istio
kubectl create ns no-istio
kubectl -n no-istio create deployment httpbin --image=kennethreitz/httpbin
kubectl -n no-istio expose deployment httpbin --port=80

# With Istio
kubectl create ns with-istio
kubectl label ns with-istio istio-injection=enabled
kubectl -n with-istio create deployment httpbin --image=kennethreitz/httpbin
kubectl -n with-istio expose deployment httpbin --port=80

# 2. Compare the pods
echo "Without Istio:"
kubectl -n no-istio get pods -o jsonpath='{.items[0].spec.containers[*].name}'
echo -e "\nWith Istio:"
kubectl -n with-istio get pods -o jsonpath='{.items[0].spec.containers[*].name}'

# 3. Test mTLS
# From no-istio to with-istio (should work)
kubectl -n no-istio run curl --image=curlimages/curl --rm -it -- curl http://httpbin.with-istio/get

# 4. Enable strict mTLS
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: with-istio
spec:
  mtls:
    mode: STRICT
EOF

# 5. Test again (should fail - no client cert)
kubectl -n no-istio run curl --image=curlimages/curl --rm -it -- curl http://httpbin.with-istio/get

# Clean up
kubectl delete ns no-istio with-istio
```

### Exercise 6: Chaos Engineering Practice

**Goal**: Build confidence by breaking things safely

```bash
# 1. Setup: Deploy a resilient service
kubectl -n $NS apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: resilient-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: resilient-app
  template:
    metadata:
      labels:
        app: resilient-app
    spec:
      containers:
      - name: app
        image: kennethreitz/httpbin
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /status/200
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /status/200
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 3
EOF

# 2. Chaos Test 1: Kill random pod
echo "Pods before chaos:"
kubectl -n $NS get pods -l app=resilient-app

# Kill one pod
kubectl -n $NS delete pod $(kubectl -n $NS get pods -l app=resilient-app -o jsonpath='{.items[0].metadata.name}')

# Watch recovery
watch -n 1 'kubectl -n $NS get pods -l app=resilient-app'

# 3. Chaos Test 2: Network partition
kubectl -n $NS exec -it $(kubectl -n $NS get pods -l app=resilient-app -o jsonpath='{.items[0].metadata.name}') -- sh -c "apk add iproute2 && tc qdisc add dev eth0 root netem loss 50%"

# 4. Chaos Test 3: Resource starvation
kubectl -n $NS run stress --image=progrium/stress --rm -it -- --cpu 8 --timeout 30s

# Monitor impact
kubectl -n $NS top pods

# Clean up
kubectl -n $NS delete deployment resilient-app
```

---

## Troubleshooting Playbook

### 🚨 Emergency Response Checklist

When production is down, follow this order:

```bash
# 1. ASSESS - What's the scope?
kubectl get nodes  # Cluster healthy?
kubectl -n $NS get pods | grep -v Running  # What's not running?
kubectl -n $NS get events --sort-by='.lastTimestamp' | head -20  # Recent issues?

# 2. ISOLATE - Find the problem service
for svc in api-gateway ai-gateway auth-service memory-service project-service; do
  echo -n "$svc: "
  kubectl -n $NS logs deploy/$svc --tail=1 2>&1 | grep -E "ERROR|FATAL|panic" | wc -l
done

# 3. MITIGATE - Quick fixes
# Option A: Restart crashed services
kubectl -n $NS get pods | grep -E "CrashLoop|Error" | awk '{print $1}' | xargs -I {} kubectl -n $NS delete pod {}

# Option B: Scale down problematic service
kubectl -n $NS scale deploy/ai-gateway --replicas=0  # Stop it
kubectl -n $NS scale deploy/ai-gateway --replicas=1  # Restart it

# Option C: Rollback to previous version
kubectl -n $NS rollout undo deploy/api-gateway

# 4. INVESTIGATE - Root cause
# Collect diagnostic bundle
mkdir -p /tmp/incident-$(date +%s)
cd /tmp/incident-*
kubectl -n $NS describe pods > pods.txt
kubectl -n $NS logs -l app --tail=1000 > logs.txt
kubectl -n $NS get events > events.txt
kubectl top nodes > nodes.txt
kubectl -n $NS top pods > pod-resources.txt

# 5. COMMUNICATE
echo "Incident Report:"
echo "Time: $(date)"
echo "Impact: $(kubectl -n $NS get pods | grep -v Running | wc -l) pods affected"
echo "Services affected: $(kubectl -n $NS get pods | grep -v Running | awk '{print $1}' | cut -d- -f1-2 | sort -u)"
echo "Action taken: [Document what you did]"
echo "Status: [Resolved/Ongoing]"
```

### 🔍 Performance Troubleshooting Guide

```bash
# Symptom: Everything is slow

# 1. Check resource pressure
kubectl top nodes
kubectl -n $NS top pods --sort-by=cpu
kubectl -n $NS top pods --sort-by=memory

# 2. Find bottleneck service
for svc in api-gateway ai-gateway auth-service; do
  echo "=== $svc response time ==="
  time curl -s $GATEWAY/health -H "X-Target-Service: $svc" > /dev/null
done

# 3. Check database performance
kubectl -n $NS exec deploy/postgres -- psql -U postgres -c "
SELECT 
  query,
  calls,
  mean_exec_time,
  total_exec_time
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 5;"

# 4. Analyze Redis performance
redis-cli -u $REDIS_URL --latency
redis-cli -u $REDIS_URL --latency-history
redis-cli -u $REDIS_URL INFO commandstats | grep -E "calls|usec_per_call" | sort -t: -k2 -rn | head -10

# 5. Check network latency
kubectl -n $NS run netperf --image=nicolaka/netshoot --rm -it -- sh -c "
  for svc in auth-service:3002 ai-gateway:3001 redis:6379; do
    echo \"Testing \$svc\";
    time nc -zv \$svc;
  done
"
```

---

## Quick Reference Card

### 🎯 Most Used Commands
```bash
# Health check everything
curl -s $GATEWAY/health | jq '.status'

# Quick LADS test
curl -s $GATEWAY/lads/manifest | jq '.pages | length'

# All service logs
kubectl -n $NS logs -l app --tail=50 --prefix=true

# Redis keys overview
redis-cli -u $REDIS_URL --raw KEYS '*' | head -20

# Port-forward all essentials
kubectl -n $NS port-forward svc/api-gateway 8080:8080 &
kubectl -n $NS port-forward svc/redis 6379:6379 &
kubectl -n istio-system port-forward svc/tracing 16686:80 &
kubectl -n istio-system port-forward svc/kiali 20001:20001 &

# Emergency restart all
kubectl -n $NS rollout restart deploy --all
```

### 🚨 Emergency Commands
```bash
# Stop everything
kubectl -n $NS scale deploy --all --replicas=0

# Clear Redis (DANGEROUS!)
redis-cli -u $REDIS_URL FLUSHALL

# Delete and recreate namespace
kubectl delete namespace $NS
kubectl create namespace $NS
kubectl label namespace $NS istio-injection=enabled

# Force delete stuck pod
kubectl -n $NS delete pod <pod-name> --grace-period=0 --force

# Recover from bad config
kubectl -n $NS rollout undo deploy/api-gateway
```

### 📝 Debugging Checklist
- [ ] Cluster context correct? (`kubectl config current-context`)
- [ ] All pods running? (`kubectl -n $NS get pods`)
- [ ] Services have endpoints? (`kubectl -n $NS get endpoints`)
- [ ] DNS resolution works? (`nslookup <service>.<namespace>.svc.cluster.local`)
- [ ] Istio sidecars injected? (look for `istio-proxy` containers)
- [ ] Redis accessible? (`redis-cli -u $REDIS_URL PING`)
- [ ] PostgreSQL accessible? (`psql $DATABASE_URL -c "SELECT 1"`)
- [ ] UI running? (`curl -sI $UI | head -1`)
- [ ] Gateway routing correctly? (`curl -s $GATEWAY | jq '.'`)
- [ ] Logs show errors? (`kubectl -n $NS logs -l app --tail=100 | grep ERROR`)

---

## Tips & Best Practices

### 🎓 Learning Path Recommendations

**Week 1: Foundations**
- Master kubectl basics (get, describe, logs, exec)
- Understand pod lifecycle
- Learn service discovery
- Practice port-forwarding

**Week 2: Debugging**
- Debug a crashed pod
- Trace a slow request
- Fix a connection issue
- Analyze resource usage

**Week 3: Advanced**
- Set up monitoring
- Implement blue-green deployment
- Configure auto-scaling
- Practice chaos engineering

**Week 4: Production**
- Handle an outage
- Perform a rollback
- Optimize performance
- Document runbooks

### 💡 Pro Tips
1. **Always use correlation IDs** for tracing requests across services
2. **Set up aliases** for common commands:
   ```bash
   alias k='kubectl -n $NS'
   alias klog='kubectl -n $NS logs'
   alias kexec='kubectl -n $NS exec -it'
   ```

3. **Use `watch` for monitoring**:
   ```bash
   watch -n 2 'kubectl -n $NS get pods'
   ```

4. **Keep separate terminal tabs** for:
   - Logs streaming
   - Redis monitoring
   - Command execution
   - Port-forwards

5. **Save useful outputs**:
   ```bash
   # Save current state
   kubectl -n $NS get all > /tmp/cluster-state-$(date +%s).txt
   
   # Save logs
   kubectl -n $NS logs -l app --tail=1000 > /tmp/all-logs-$(date +%s).txt
   ```

### ⚠️ Common Pitfalls
- **Wrong namespace**: Always verify with `echo $NS`
- **Stale port-forwards**: Kill and restart if connection issues
- **Cache issues**: Clear Redis keys if seeing old data
- **DNS caching**: Restart coredns if service discovery fails
- **Resource limits**: Check quotas if pods won't start

### 📚 Further Learning
- Study the service mesh patterns in Kiali
- Analyze trace waterfalls in Jaeger
- Create custom Grafana dashboards
- Write chaos engineering scenarios
- Implement custom health checks

---

## Appendix: Environment Variables

```bash
# Core
export NS=devmentor-app
export GATEWAY=http://localhost:8080
export UI=http://localhost:3000

# Data stores
export REDIS_URL=redis://localhost:6379
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/devmentor
export QDRANT_URL=http://localhost:6333

# Services (internal)
export AI_GATEWAY=http://localhost:3001
export AUTH_SERVICE=http://localhost:3002
export MEMORY_SERVICE=http://localhost:3003
export PROJECT_SERVICE=http://localhost:3004
export LEARNING_ENGINE=http://localhost:3005

# Observability
export JAEGER_URL=http://localhost:16686
export PROMETHEUS_URL=http://localhost:9090
export GRAFANA_URL=http://localhost:3000
export KIALI_URL=http://localhost:20001

# Development
export LOG_LEVEL=debug
export NODE_ENV=development
export SKIP_OLLAMA_HEALTH=true
```

---

### 🎯 Command Patterns to Master

```bash
# Pattern 1: The Investigation Pipeline
kubectl get → kubectl describe → kubectl logs → kubectl exec

# Pattern 2: The Resource Chain
Deployment → ReplicaSet → Pod → Container

# Pattern 3: The Network Path
Client → Ingress → Service → Pod → Container

# Pattern 4: The Debug Escalation
Health check → Logs → Events → Shell access → Trace

# Pattern 5: The Recovery Sequence
Identify → Isolate → Mitigate → Investigate → Document
```

### 📚 Recommended Learning Resources

1. **Kubernetes Fundamentals**
   - [Kubernetes Documentation](https://kubernetes.io/docs/)
   - Practice with: `kubectl explain <resource>`
   - Interactive: [Killercoda Kubernetes](https://killercoda.com/kubernetes)

2. **Istio Service Mesh**
   - [Istio Documentation](https://istio.io/latest/docs/)
   - Key concept: Sidecar proxy pattern
   - Practice: Traffic management, security, observability

3. **Redis**
   - [Redis University](https://university.redis.com/)
   - Key patterns: Caching, pub/sub, streams
   - Tool: RedisInsight for visualization

4. **Distributed Systems**
   - Book: "Designing Data-Intensive Applications"
   - Concepts: CAP theorem, consensus, eventual consistency
   - Practice: Build a distributed counter

### 🏆 Mastery Milestones

- [ ] **Level 1**: Can deploy and access services
- [ ] **Level 2**: Can debug common issues (crashes, connection failures)
- [ ] **Level 3**: Can trace distributed requests
- [ ] **Level 4**: Can optimize performance
- [ ] **Level 5**: Can design and implement resilient systems
- [ ] **Level 6**: Can handle production incidents calmly
- [ ] **Level 7**: Can architect microservices platforms

---

*Last updated: 2025-08-17 | Version: 2.0*
*For the latest version, check: docs/03-operations/DEVMENTOR_OPERATIONS_GUIDE.md*

> "The best way to learn is to break things... in a safe environment." - DevMentor Team
{% endraw %}
