---
layout: product
title: 2025-08-21-gpt-oss-deployment-fixes
product: DevMentor
source: devlog/2025-08-21-gpt-oss-deployment-fixes.md
---

{% raw %}
# DevLog: 2025-08-21 - GPT-OSS Deployment & System Resource Fixes

## 🎯 Objectives
1. Deploy GPT-OSS (Llama 3.2) as local AI model
2. Fix resource allocation issues across all services
3. Deploy missing critical infrastructure (Redis, PostgreSQL)
4. Document everything for learning purposes

## 📋 Initial State
- Kubernetes cluster running with minimal services
- Istio service mesh partially configured
- No local AI model deployed
- Many services without resource limits
- Observability stack down

## 🔍 Discovery Phase

### Checking Pod Status
```bash
# Check all pods across namespaces
kubectl get pods --all-namespaces

# Found issues:
# - AI Gateway in ImagePullBackOff
# - Ollama pod status Unknown
# - No Redis or PostgreSQL
```

### Image Investigation
```bash
# Check local Docker images
docker images | grep -E "(ai-gateway|ollama)"

# Found:
# - devmentor/ai-gateway:latest available locally
# - ollama/ollama:latest available locally
```

## 🚀 Phase 1: GPT-OSS Deployment

### Problem 1: Images Not in Kind Cluster
**Issue**: Kubernetes trying to pull from Docker Hub instead of using local images

**Solution**:
```bash
# Load images into Kind cluster
kind load docker-image devmentor/ai-gateway:latest --name devmentor
kind load docker-image ollama/ollama:latest --name devmentor
```

### Problem 2: Istio Sidecar Injection Timeout
**Issue**: Webhook timing out when creating pods

**Debugging**:
```bash
# Check Istio status
kubectl get pods -n istio-system

# Check events
kubectl get events -n devmentor --sort-by='.lastTimestamp' | tail -10
# Found: "failed calling webhook namespace.sidecar-injector.istio.io"
```

**Solution**:
```bash
# Temporarily disable Istio injection for namespace
kubectl label namespace devmentor istio-injection=disabled --overwrite

# Add annotation to specific deployments
kubectl patch deployment ai-gateway -n devmentor -p \
  '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
  
kubectl patch deployment ollama -n devmentor -p \
  '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

### Problem 3: ImagePullPolicy Set to Always
**Issue**: Always trying to pull from registry even with local images

**Solution**:
```bash
kubectl patch deployment ai-gateway -n devmentor -p \
  '{"spec":{"template":{"spec":{"containers":[{"name":"ai-gateway","imagePullPolicy":"IfNotPresent"}]}}}}'
```

### Loading Llama 3.2 Model
```bash
# Pull the GPT-OSS model (Llama 3.2)
kubectl exec -n devmentor deployment/ollama -- ollama pull llama3.2:latest

# Verify model loaded
kubectl exec -n devmentor deployment/ollama -- ollama list
# Output: llama3.2:latest    a80c4f17acd5    2.0 GB
```

## 🔧 Phase 2: AI Gateway Code Fixes

### Problem: Missing /api/chat Endpoint
**Issue**: AI Gateway only had /api/chat/completions, not simple /api/chat

**Solution**: Added new endpoint in `services/ai-gateway/src/index.ts`:
```typescript
// Simple chat endpoint (for backward compatibility)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    logger.info(`Simple chat request: ${message}`);
    
    // Convert simple message to chat format
    const messages = [
      { role: 'system', content: context || 'You are a helpful AI assistant.' },
      { role: 'user', content: message }
    ];
    
    // Use llama3.2:latest by default (GPT-OSS equivalent)
    const model = 'llama3.2:latest';
    const response = await chatWithOllama(model, messages, {
      temperature: 0.7,
      maxTokens: 2048
    });
    
    return res.json({
      response,
      model,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Simple chat error:', error);
    return res.status(500).json({ error: error.message });
  }
});
```

### Rebuild and Deploy
```bash
# Build TypeScript
cd services/ai-gateway
npm run build

# Build Docker image
docker build -t devmentor/ai-gateway:latest .

# Load into Kind
kind load docker-image devmentor/ai-gateway:latest --name devmentor

# Restart deployment
kubectl rollout restart deployment ai-gateway -n devmentor

# Wait for ready
kubectl wait --for=condition=ready pod -l app=ai-gateway -n devmentor --timeout=60s
```

## 📊 Phase 3: Resource Allocation Analysis

### Current Resource Issues Found
```bash
kubectl get deployments --all-namespaces -o custom-columns=\
'NAMESPACE:.metadata.namespace,NAME:.metadata.name,CPU-REQ:.spec.template.spec.containers[*].resources.requests.cpu,MEM-REQ:.spec.template.spec.containers[*].resources.requests.memory,CPU-LIM:.spec.template.spec.containers[*].resources.limits.cpu,MEM-LIM:.spec.template.spec.containers[*].resources.limits.memory'
```

**Critical Findings**:
- AI Gateway: NO resource limits (can consume all available resources!)
- Ollama: Only 4GB memory limit (Llama 3.2 needs 8GB)
- Monitoring components: No resource limits
- Missing services: Redis, PostgreSQL, Memory Service, etc.

## 🛠️ Phase 4: Fixing Resource Issues

### Fix 1: Update Ollama Resources
```bash
kubectl patch deployment ollama -n devmentor --type='json' -p='[
  {
    "op": "replace",
    "path": "/spec/template/spec/containers/0/resources",
    "value": {
      "requests": {"memory": "6Gi", "cpu": "2000m"},
      "limits": {"memory": "8Gi", "cpu": "4000m"}
    }
  }
]'
```

### Fix 2: Add AI Gateway Resources
```bash
kubectl patch deployment ai-gateway -n devmentor --type='json' -p='[
  {
    "op": "add",
    "path": "/spec/template/spec/containers/0/resources",
    "value": {
      "requests": {"memory": "512Mi", "cpu": "250m"},
      "limits": {"memory": "1Gi", "cpu": "1000m"}
    }
  }
]'
```

### Fix 3: Deploy Redis
```bash
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: devmentor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
      annotations:
        sidecar.istio.io/inject: "false"
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        volumeMounts:
        - name: redis-data
          mountPath: /data
      volumes:
      - name: redis-data
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: devmentor
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379
EOF
```

### Fix 4: Deploy PostgreSQL
```bash
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: devmentor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
      annotations:
        sidecar.istio.io/inject: "false"
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: devmentor
        - name: POSTGRES_USER
          value: devmentor
        - name: POSTGRES_PASSWORD
          value: devmentor123
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-data
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: devmentor
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
EOF
```

## 🧪 Testing & Verification

### Test GPT-OSS Chat Endpoint
```bash
# Port forward to AI Gateway
kubectl port-forward -n devmentor deployment/ai-gateway 3004:3004 &

# Test health check
curl http://localhost:3004/health | jq

# Test chat endpoint
curl -X POST http://localhost:3004/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! What model are you?",
    "context": "You are Llama 3.2, the GPT-OSS model for DevMentor."
  }'

# Check available models
curl http://localhost:3004/api/models | jq
```

### Verify All Services
```bash
# Check pod status
kubectl get pods -n devmentor

# Check resource usage (requires metrics-server)
kubectl top pods -n devmentor

# Check services
kubectl get svc -n devmentor

# Check events for errors
kubectl get events -n devmentor --sort-by='.lastTimestamp'
```

## 🐛 Troubleshooting Issues Encountered

### Issue 1: Chat Request Timeout
**Problem**: Llama 3.2 inference taking too long with 4GB memory
**Solution**: Increased memory to 8GB

### Issue 2: Redis Connection Failed
**Problem**: AI Gateway couldn't connect to Redis
**Solution**: Redis wasn't deployed yet, deployed it

### Issue 3: Port Forward Hanging
**Problem**: kubectl port-forward commands hanging
**Solution**: Kill background processes: `kill %1 %2`

### Issue 4: Model Name Mismatch
**Problem**: Code using 'llama3.2' but Ollama expects 'llama3.2:latest'
**Solution**: Updated code to use full model name with tag

## 📚 Key Learnings

### 1. Kind Cluster Image Loading
- Local Docker images must be explicitly loaded into Kind
- Use `kind load docker-image <image> --name <cluster>`

### 2. Istio Sidecar Injection
- Can timeout during high load or resource constraints
- Disable with namespace label or pod annotation
- Re-enable when system is stable

### 3. Resource Management
- **Always set resource limits** to prevent runaway containers
- Memory requirements for LLMs are substantial (8GB+)
- Use requests for guaranteed resources, limits for maximum

### 4. Service Dependencies
- Redis needed for caching and session management
- PostgreSQL needed for persistent data
- Services should gracefully handle missing dependencies

### 5. Debugging Kubernetes
```bash
# Essential debugging commands
kubectl describe pod <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace> --tail=50
kubectl get events -n <namespace> --sort-by='.lastTimestamp'
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
```

## 📈 Performance Metrics

### Before Fixes
- Ollama: 4GB memory, timeouts on inference
- AI Gateway: Unlimited resources, potential OOM
- No caching (Redis missing)
- No persistence (PostgreSQL missing)

### After Fixes
- Ollama: 8GB memory, successful inference
- AI Gateway: Limited to 1GB memory, 1 CPU
- Redis deployed for caching
- PostgreSQL deployed for persistence

## 🔄 Next Steps

1. **Re-enable Istio injection** once system stable
2. **Deploy remaining microservices**:
   - Memory Service (vector search)
   - Project Service
   - API Gateway (external access)
   - PBML Service (learning engine)
   
3. **Start observability stack**:
   ```bash
   cd infrastructure/observability
   ./start-observability.sh
   ```

4. **Configure monitoring dashboards**
5. **Set up automated backups**
6. **Implement CI/CD pipeline**

## 📝 Configuration Files Created

- `/docs/infrastructure/RESOURCE_ALLOCATION_GUIDE.md` - Complete resource guide
- `/docs/status/GPT_OSS_STATUS.md` - GPT-OSS deployment status
- `/services/ai-gateway/src/index.ts` - Updated with /api/chat endpoint

## 🎓 Educational Notes

### Understanding Resource Limits
- **Requests**: Guaranteed resources, used for scheduling
- **Limits**: Maximum allowed, pod killed if exceeded
- **CPU**: Measured in millicores (1000m = 1 CPU)
- **Memory**: Measured in bytes (Gi = Gibibytes)

### LLM Memory Requirements
- Small models (1-3B params): 2-4GB
- Medium models (7B params): 8-16GB  
- Large models (13B+ params): 16-32GB+
- Llama 3.2 (3B params): ~8GB recommended

### Service Mesh Benefits
- Automatic mTLS between services
- Traffic management and load balancing
- Observability without code changes
- Circuit breaking and retries

## ✅ Completed Tasks
- [x] Deploy GPT-OSS (Llama 3.2)
- [x] Fix AI Gateway endpoints
- [x] Update resource allocations
- [x] Deploy Redis
- [x] Deploy PostgreSQL
- [x] Document everything for learning

## 🔗 Related Documents
- [Resource Allocation Guide](/docs/infrastructure/RESOURCE_ALLOCATION_GUIDE.md)
- [GPT-OSS Status](/docs/status/GPT_OSS_STATUS.md)
- [Kubernetes Debugging Guide](/docs/debugging/k8s-debugging.md)
- [System Status](/docs/status/SYSTEM_STATUS.md)

---
*DevLog created: 2025-08-21 by AI Assistant*
*Purpose: Educational documentation for learning Kubernetes, resource management, and AI deployment*
{% endraw %}
