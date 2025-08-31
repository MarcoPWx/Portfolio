---
layout: product
title: GPT OSS IMPLEMENTATION GUIDE
product: DevMentor
source: learning/GPT_OSS_IMPLEMENTATION_GUIDE.md
---

{% raw %}
# 📚 GPT-OSS Implementation Learning Guide

## What We're Building & Why

### The Big Picture
You're integrating OpenAI's first open-source model (GPT-OSS) into your DevMentor AI system. This is exciting because:
- **Released August 2024** - You're an early adopter!
- **128K context window** - Can process entire codebases
- **Chain-of-thought reasoning** - Shows its thinking process
- **Free to use** - Apache 2.0 license

### Your Current Architecture

```
┌─────────────────────────────────────────────────┐
│                   KUBERNETES                    │
│                  (Kind Cluster)                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐      ┌──────────────┐       │
│  │ Auth Service │      │  AI Gateway  │       │
│  │   (Running)  │◄────►│  (Not Built) │       │
│  └──────────────┘      └──────────────┘       │
│                               │                │
│                               ▼                │
│                        ┌──────────────┐       │
│                        │    Ollama    │       │
│                        │  (Running)   │       │
│                        └──────────────┘       │
│                                                │
│  ┌─────────────────────────────────────┐      │
│  │        Istio Service Mesh           │      │
│  │    (Traffic Management & Security)   │      │
│  └─────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

## 🎯 Implementation Steps

### Phase 1: Understanding What You Have

#### Step 1.1: Check Your Services
```bash
# See what's running in your cluster
kubectl get pods -n devmentor

# Understanding the output:
# - auth-service: Handles authentication (RUNNING ✅)
# - ai-gateway: Will connect to Ollama (NEEDS BUILDING ❌)
# - ollama: Runs AI models (RUNNING ✅)
```

**What's happening:**
- `auth-service` is working
- `ai-gateway` can't start because the Docker image doesn't exist yet
- `ollama` is running and ready for models

#### Step 1.2: Understand Ollama
Ollama is like Docker but for AI models. It:
- Downloads and manages AI models
- Provides a REST API for inference
- Handles model loading/unloading

### Phase 2: Setting Up GPT-OSS

#### Step 2.1: Download GPT-OSS Model Locally
```bash
# First, install Ollama on your Mac (if not already)
brew install ollama

# Start Ollama service
ollama serve &

# Pull the GPT-OSS model (this is 30GB!)
ollama pull gpt-oss:128k
```

**What's happening:**
- Installing Ollama gives you a local AI runtime
- The model is 30GB because it contains billions of parameters
- The `:128k` tag specifies the context window size

#### Step 2.2: Test GPT-OSS Locally
```bash
# Test the model
ollama run gpt-oss:128k "Explain what Kubernetes is in simple terms"

# Check available models
ollama list

# See model details
ollama show gpt-oss:128k
```

### Phase 3: Building the AI Gateway

#### Step 3.1: Understanding the Code Structure
```
services/
└── ai-gateway/
    ├── src/
    │   ├── index.ts           # Main server file
    │   ├── ollama-integration.ts  # Ollama connection
    │   └── routes/
    │       └── chat.ts        # Chat endpoints
    ├── Dockerfile             # Container definition
    └── package.json          # Dependencies
```

#### Step 3.2: Update Ollama Integration
Create or update `services/ai-gateway/src/ollama-integration.ts`:

```typescript
// This file connects your AI Gateway to Ollama
import axios from 'axios';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://ollama:11434';
const DEFAULT_MODEL = 'gpt-oss:128k';  // Changed from qwen

export class OllamaService {
    async chat(prompt: string, context?: string[]) {
        try {
            const response = await axios.post(`${OLLAMA_HOST}/api/chat`, {
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are DevMentor, an AI coding assistant powered by GPT-OSS.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false,
                options: {
                    temperature: 0.7,
                    num_ctx: 128000  // Use full context window
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Ollama error:', error);
            throw error;
        }
    }
}
```

#### Step 3.3: Build the Docker Image
```bash
# Navigate to the service directory
cd services/ai-gateway

# Build the image
docker build -t devmentor/ai-gateway:latest .

# Verify it was created
docker images | grep ai-gateway
```

**What's happening:**
- Docker builds a container with your Node.js app
- The image is tagged for local use
- This fixes the "ImagePullBackOff" error

#### Step 3.4: Load Image into Kind Cluster
```bash
# Load the image into your Kind cluster
kind load docker-image devmentor/ai-gateway:latest --name devmentor

# This copies the image from Docker to Kind's nodes
```

### Phase 4: Deploy to Kubernetes

#### Step 4.1: Update the Deployment
```bash
# Force Kubernetes to use the new image
kubectl rollout restart deployment ai-gateway -n devmentor

# Watch it come up
kubectl get pods -n devmentor -w
```

#### Step 4.2: Load GPT-OSS into Cluster's Ollama
```bash
# Port-forward to Ollama
kubectl port-forward -n devmentor svc/ollama 11434:11434 &

# Pull GPT-OSS into the cluster's Ollama
curl -X POST http://localhost:11434/api/pull -d '{"name": "gpt-oss:128k"}'

# This will take time (30GB download)
```

### Phase 5: Testing the System

#### Step 5.1: Test AI Gateway Directly
```bash
# Port-forward to AI Gateway
kubectl port-forward -n devmentor svc/ai-gateway 8080:80 &

# Test the chat endpoint
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain Docker in simple terms"
  }'
```

#### Step 5.2: Test Through Istio Ingress
```bash
# Get Istio ingress details
export INGRESS_HOST=$(kubectl -n istio-system get svc istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
export INGRESS_PORT=$(kubectl -n istio-system get svc istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')

# Test through the mesh
curl -X POST "http://${INGRESS_HOST}:${INGRESS_PORT}/ai/chat" \
  -H "Host: devmentor.local" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What makes GPT-OSS special?"
  }'
```

## 📊 Monitoring Your Implementation

### Check Pod Status
```bash
# See all pods with their container count
kubectl get pods -n devmentor -o wide

# Check logs for issues
kubectl logs -n devmentor deployment/ai-gateway
kubectl logs -n devmentor deployment/ollama
```

### Verify Istio Integration
```bash
# Check if sidecars are injected
kubectl get pods -n devmentor -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[*].name}{"\n"}{end}'

# View traffic in Kiali
kubectl port-forward -n istio-system svc/kiali 20001:20001
# Open http://localhost:20001
```

## 🎓 Key Concepts Explained

### Why Kubernetes?
- **Orchestration**: Manages multiple services
- **Scaling**: Can add more instances when needed
- **Self-healing**: Restarts failed services
- **Service discovery**: Services find each other by name

### Why Istio?
- **Traffic management**: Routes requests intelligently
- **Security**: Automatic TLS between services
- **Observability**: See all service communications
- **Resilience**: Retries, timeouts, circuit breakers

### Why Ollama?
- **Model management**: Like Docker for AI
- **Standard API**: Same interface for all models
- **Resource optimization**: Loads/unloads models as needed
- **Local-first**: Run AI without cloud dependencies

### Why GPT-OSS?
- **Open source**: No API costs
- **Large context**: Process entire files/documents
- **Chain-of-thought**: Explains reasoning
- **Function calling**: Can integrate with tools

## 🚨 Common Issues & Solutions

### Issue: "ImagePullBackOff"
**Cause**: Docker image doesn't exist
**Solution**: Build and load the image (Step 3.3-3.4)

### Issue: "Missing Sidecar" in Kiali
**Cause**: Istio proxy not injected
**Solution**: 
```bash
kubectl label namespace devmentor istio-injection=enabled
kubectl rollout restart deployment -n devmentor
```

### Issue: "Connection Refused"
**Cause**: Service not running or wrong port
**Solution**: Check logs and port-forward directly to test

### Issue: Model Download Too Slow
**Cause**: 30GB is large
**Solution**: Use smaller model for testing: `ollama pull qwen2.5:3b`

## 📈 Next Steps After Implementation

1. **Add streaming responses**: Make chat feel more responsive
2. **Implement context management**: Remember conversation history
3. **Add function calling**: Let GPT-OSS call your APIs
4. **Create specialized prompts**: Optimize for coding tasks
5. **Add rate limiting**: Prevent overload
6. **Implement caching**: Save common responses

## 🎯 Success Checklist

- [ ] Ollama installed locally
- [ ] GPT-OSS model downloaded
- [ ] AI Gateway code updated
- [ ] Docker image built
- [ ] Image loaded into Kind
- [ ] Deployment restarted
- [ ] Model loaded in cluster
- [ ] Test requests working
- [ ] Kiali showing traffic
- [ ] Logs are clean

## 💡 Learning Resources

- [Ollama Documentation](https://ollama.ai/docs)
- [GPT-OSS Announcement](https://openai.com/blog/gpt-oss)
- [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Istio Concepts](https://istio.io/latest/docs/concepts/)
- [Kind Documentation](https://kind.sigs.k8s.io/)

---

Remember: This is cutting-edge stuff! You're implementing a model that was just released. Take it step by step, and don't hesitate to check logs when something doesn't work as expected.
{% endraw %}
