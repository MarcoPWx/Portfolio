---
layout: product
title: CONTAINER ORCHESTRATION GUIDE
product: DevMentor
source: infrastructure/kubernetes/CONTAINER_ORCHESTRATION_GUIDE.md
---

{% raw %}
# 🚀 Container Orchestration Learning Guide
## From Docker Basics to Kubernetes Mastery

---

## 📚 Table of Contents
1. [Understanding Containers](#understanding-containers)
2. [Docker Fundamentals](#docker-fundamentals)
3. [Docker Compose](#docker-compose)
4. [Kubernetes Basics](#kubernetes-basics)
5. [Managing Your DevMentor Stack](#managing-devmentor-stack)
6. [Hands-On Exercises](#hands-on-exercises)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Best Practices](#best-practices)

---

## 🎯 Understanding Containers

### What Are Containers?
Containers are lightweight, portable units that package an application with all its dependencies. Think of them as "shipping containers" for software.

```
Traditional VM:
┌─────────────────────────┐
│      Application        │
│      Guest OS          │  <- Heavy! Each VM needs full OS
│      Hypervisor        │
│      Host OS           │
│      Hardware          │
└─────────────────────────┘

Container:
┌─────────────────────────┐
│      Application        │  <- Lightweight! Shares host OS
│      Container Runtime  │
│      Host OS           │
│      Hardware          │
└─────────────────────────┘
```

### Key Benefits:
- **Portability**: Run anywhere (dev laptop → production server)
- **Consistency**: Same environment everywhere
- **Efficiency**: Share OS kernel, use less resources
- **Isolation**: Apps don't interfere with each other
- **Scalability**: Easy to scale up/down

---

## 🐳 Docker Fundamentals

### Core Concepts

#### 1. **Images vs Containers**
```bash
# Image = Blueprint (like a class)
# Container = Running instance (like an object)

# Pull an image
docker pull nginx:latest

# Run a container from image
docker run -d --name my-nginx -p 8080:80 nginx:latest

# Image is read-only, container has writable layer
```

#### 2. **Dockerfile**
A recipe for building images:

```dockerfile
# Example Dockerfile
FROM node:18-alpine        # Base image
WORKDIR /app               # Set working directory
COPY package*.json ./      # Copy dependency files
RUN npm ci                 # Install dependencies
COPY . .                   # Copy application code
EXPOSE 3000                # Document port
CMD ["npm", "start"]       # Default command
```

#### 3. **Essential Docker Commands**

```bash
# === IMAGES ===
docker images                      # List all images
docker build -t myapp:v1 .        # Build image from Dockerfile
docker tag myapp:v1 myapp:latest  # Tag an image
docker rmi myapp:v1                # Remove image
docker image prune                 # Remove unused images

# === CONTAINERS ===
docker ps                          # List running containers
docker ps -a                       # List all containers
docker run -d --name app image    # Run container in background
docker start/stop/restart app     # Container lifecycle
docker rm app                      # Remove container
docker logs app                    # View container logs
docker exec -it app bash          # Enter container shell

# === INSPECTION ===
docker inspect container_name      # Detailed container info
docker stats                       # Real-time resource usage
docker top container_name          # Running processes

# === CLEANUP ===
docker system prune -a             # Remove all unused resources
docker container prune             # Remove stopped containers
docker volume prune                # Remove unused volumes
```

### Understanding Port Mapping
```bash
# -p HOST_PORT:CONTAINER_PORT
docker run -p 3000:80 nginx

# This means:
# - Container listens on port 80 internally
# - Accessible on host at port 3000
# - Access: http://localhost:3000
```

### Volume Mounting
```bash
# Bind mount (dev environment)
docker run -v /host/path:/container/path myapp

# Named volume (production)
docker run -v mydata:/data myapp

# Read-only mount
docker run -v /host/config:/config:ro myapp
```

---

## 🎼 Docker Compose

### What is Docker Compose?
Orchestration tool for multi-container applications. Define everything in YAML.

### Basic Structure
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://backend:4000
    depends_on:
      - backend
    networks:
      - myapp-network

  backend:
    image: node:18
    command: npm start
    working_dir: /app
    volumes:
      - ./backend:/app
    environment:
      - DB_HOST=database
      - DB_PORT=5432
    depends_on:
      - database
    networks:
      - myapp-network

  database:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - myapp-network

volumes:
  db-data:

networks:
  myapp-network:
    driver: bridge
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f service_name

# Scale service
docker-compose up -d --scale worker=3

# Rebuild and restart
docker-compose up -d --build

# Use specific file
docker-compose -f docker-compose.prod.yml up
```

---

## ☸️ Kubernetes Basics

### Core Concepts

#### 1. **Architecture**
```
┌─────────────────────────────────────────┐
│            Control Plane                 │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │ API      │ │Scheduler │ │  etcd   │ │
│  │ Server   │ │          │ │(storage)│ │
│  └──────────┘ └──────────┘ └─────────┘ │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌─────────┐   ┌─────────┐    ┌─────────┐
│  Node 1 │   │  Node 2 │    │  Node 3 │
│ ┌─────┐ │   │ ┌─────┐ │    │ ┌─────┐ │
│ │ Pod │ │   │ │ Pod │ │    │ │ Pod │ │
│ └─────┘ │   │ └─────┘ │    │ └─────┘ │
└─────────┘   └─────────┘    └─────────┘
```

#### 2. **Key Resources**

| Resource | Purpose | Example |
|----------|---------|---------|
| **Pod** | Smallest deployable unit | Single container or group |
| **Deployment** | Manages replica sets | Ensures N pods running |
| **Service** | Network endpoint | Load balancer for pods |
| **ConfigMap** | Configuration data | Environment variables |
| **Secret** | Sensitive data | Passwords, API keys |
| **Ingress** | HTTP/S routing | External access to services |
| **Namespace** | Resource isolation | dev, staging, production |

#### 3. **Essential kubectl Commands**

```bash
# === CLUSTER INFO ===
kubectl cluster-info
kubectl get nodes
kubectl top nodes                  # Resource usage

# === NAMESPACES ===
kubectl get namespaces
kubectl create namespace dev
kubectl config set-context --current --namespace=dev

# === PODS ===
kubectl get pods
kubectl get pods -A                # All namespaces
kubectl describe pod pod-name
kubectl logs pod-name
kubectl logs -f pod-name           # Follow logs
kubectl exec -it pod-name -- bash  # Enter pod

# === DEPLOYMENTS ===
kubectl get deployments
kubectl create deployment app --image=nginx
kubectl scale deployment app --replicas=3
kubectl rollout status deployment app
kubectl rollout history deployment app
kubectl rollout undo deployment app

# === SERVICES ===
kubectl get services
kubectl expose deployment app --port=80 --type=LoadBalancer
kubectl port-forward svc/app 8080:80

# === CONFIG & SECRETS ===
kubectl get configmaps
kubectl get secrets
kubectl create secret generic mysecret --from-literal=password=123

# === DEBUGGING ===
kubectl describe pod pod-name      # Detailed info
kubectl get events                 # Cluster events
kubectl get pod pod-name -o yaml   # Full YAML output
```

---

## 🔧 Managing Your DevMentor Stack

### Current Architecture

```
Your Setup:
├── Docker Standalone
│   ├── monitoring-service (port 3006)
│   ├── loki (port 3100)
│   ├── promtail
│   └── node-exporter (port 9100)
│
└── Kubernetes (Kind)
    ├── devmentor namespace
    │   ├── ai-gateway
    │   ├── auth-service (needs fixing)
    │   └── ollama
    ├── devmentor-data namespace
    │   ├── postgresql
    │   ├── redis
    │   └── qdrant
    ├── istio-system namespace
    │   ├── grafana
    │   ├── prometheus
    │   ├── jaeger
    │   └── kiali
    └── keycloak namespace
        └── keycloak
```

### Practical Management Tasks

#### 1. **Check What's Running**
```bash
# Docker containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Kubernetes pods
kubectl get pods -A --field-selector=status.phase=Running

# Problem pods
kubectl get pods -A --field-selector=status.phase!=Running
```

#### 2. **Clean Up Duplicates**
```bash
# Find duplicate services
echo "=== Checking for duplicates ==="
for service in prometheus grafana redis postgres; do
  echo "\n$service:"
  docker ps | grep $service || echo "  Not in Docker ✓"
  kubectl get pods -A | grep $service || echo "  Not in K8s"
done
```

#### 3. **Access Services**

```bash
# Kubernetes services via port-forward
kubectl port-forward -n istio-system svc/grafana 3000:3000
kubectl port-forward -n istio-system svc/kiali 20001:20001
kubectl port-forward -n devmentor-data svc/postgresql 5432:5432

# Docker services are already exposed on host ports
# Check docker ps for port mappings
```

#### 4. **Update Configurations**

**For Docker Compose:**
```bash
# Edit docker-compose.yml
vim docker-compose.yml

# Apply changes
docker-compose down
docker-compose up -d
```

**For Kubernetes:**
```bash
# Edit deployment
kubectl edit deployment -n devmentor auth-service

# Or apply from file
kubectl apply -f k8s/auth-service.yaml

# Force restart
kubectl rollout restart deployment -n devmentor auth-service
```

---

## 🎮 Hands-On Exercises

### Exercise 1: Container Lifecycle
```bash
# 1. Run a simple web server
docker run -d --name myweb -p 8080:80 nginx

# 2. Check it's running
curl http://localhost:8080

# 3. View logs
docker logs myweb

# 4. Enter the container
docker exec -it myweb bash
# Inside: echo "Hello from container" > /usr/share/nginx/html/index.html
# Exit: exit

# 5. Refresh browser - see your change

# 6. Stop and remove
docker stop myweb
docker rm myweb
```

### Exercise 2: Build Custom Image
```bash
# 1. Create a simple Node.js app
mkdir myapp && cd myapp

cat > app.js << 'EOF'
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello from Docker!'));
app.listen(3000, () => console.log('Server running on port 3000'));
EOF

cat > package.json << 'EOF'
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": { "start": "node app.js" },
  "dependencies": { "express": "^4.18.0" }
}
EOF

# 2. Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

# 3. Build and run
docker build -t myapp:v1 .
docker run -d --name myapp -p 3000:3000 myapp:v1

# 4. Test
curl http://localhost:3000
```

### Exercise 3: Kubernetes Deployment
```bash
# 1. Create a deployment
kubectl create deployment hello --image=nginx --replicas=3

# 2. Expose it
kubectl expose deployment hello --port=80 --type=NodePort

# 3. Check pods
kubectl get pods -l app=hello

# 4. Scale up
kubectl scale deployment hello --replicas=5

# 5. Watch scaling
kubectl get pods -l app=hello -w

# 6. Clean up
kubectl delete deployment hello
kubectl delete service hello
```

---

## 🔍 Troubleshooting Guide

### Common Docker Issues

#### Container Won't Start
```bash
# Check logs
docker logs container_name

# Check last 50 lines
docker logs --tail 50 container_name

# Common fixes:
# - Port already in use: change host port
# - Missing environment variable: add to docker-compose
# - Volume permission: check file ownership
```

#### Out of Space
```bash
# Check disk usage
docker system df

# Clean up
docker system prune -a --volumes
```

### Common Kubernetes Issues

#### Pod Stuck in Pending
```bash
# Check events
kubectl describe pod pod-name

# Common causes:
# - No nodes available
# - Resource limits too high
# - PVC not bound
```

#### Pod CrashLoopBackOff
```bash
# Check logs
kubectl logs pod-name
kubectl logs pod-name --previous  # Previous crash

# Common fixes:
# - Fix application error
# - Add health checks
# - Increase memory/CPU limits
```

#### Can't Access Service
```bash
# Check service endpoints
kubectl get endpoints service-name

# Check pod labels match service selector
kubectl get pods --show-labels
kubectl get service service-name -o yaml
```

---

## 📋 Best Practices

### Docker Best Practices

1. **Use Specific Tags**
   ```dockerfile
   # Bad
   FROM node:latest
   
   # Good
   FROM node:18.17.1-alpine
   ```

2. **Multi-stage Builds**
   ```dockerfile
   # Build stage
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   
   # Runtime stage
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/node_modules ./node_modules
   CMD ["node", "dist/index.js"]
   ```

3. **Layer Caching**
   ```dockerfile
   # Copy dependency files first (changes less often)
   COPY package*.json ./
   RUN npm ci
   
   # Then copy source code (changes frequently)
   COPY . .
   ```

### Kubernetes Best Practices

1. **Resource Limits**
   ```yaml
   resources:
     requests:
       memory: "128Mi"
       cpu: "100m"
     limits:
       memory: "256Mi"
       cpu: "200m"
   ```

2. **Health Checks**
   ```yaml
   livenessProbe:
     httpGet:
       path: /health
       port: 3000
     initialDelaySeconds: 30
     periodSeconds: 10
   
   readinessProbe:
     httpGet:
       path: /ready
       port: 3000
     initialDelaySeconds: 5
     periodSeconds: 5
   ```

3. **Use Namespaces**
   ```bash
   # Organize by environment
   kubectl create namespace dev
   kubectl create namespace staging
   kubectl create namespace production
   ```

---

## 🎯 Quick Reference Card

### Docker Compose to Kubernetes Mapping

| Docker Compose | Kubernetes | Purpose |
|---------------|------------|---------|
| `service` | `Deployment` + `Service` | Application definition |
| `ports` | `Service` type LoadBalancer/NodePort | Expose to outside |
| `environment` | `ConfigMap` or `Secret` | Configuration |
| `volumes` | `PersistentVolumeClaim` | Storage |
| `depends_on` | `initContainers` | Startup order |
| `replicas` (scale) | `replicas` in Deployment | Multiple instances |
| `networks` | `NetworkPolicy` | Network isolation |

### Port Management in Your Stack

| Service | Docker Port | K8s Access | Purpose |
|---------|------------|------------|---------|
| Monitoring | 3006 | - | Monitoring dashboard |
| Grafana | - | port-forward 3000 | Metrics visualization |
| Prometheus | - | port-forward 9090 | Metrics storage |
| PostgreSQL | - | port-forward 5432 | Database |
| Redis | - | port-forward 6379 | Cache |
| Loki | 3100 | - | Log aggregation |
| Kiali | - | port-forward 20001 | Service mesh viz |

---

## 📚 Learning Path

### Week 1: Docker Fundamentals
- [ ] Run your first container
- [ ] Build custom images
- [ ] Understand volumes and networking
- [ ] Write docker-compose files

### Week 2: Kubernetes Basics
- [ ] Understand pods, deployments, services
- [ ] Deploy simple applications
- [ ] Use kubectl effectively
- [ ] Understand namespaces

### Week 3: Advanced Topics
- [ ] ConfigMaps and Secrets
- [ ] Persistent storage
- [ ] Ingress controllers
- [ ] Service mesh (Istio)

### Week 4: Production Skills
- [ ] Monitoring and logging
- [ ] Security best practices
- [ ] CI/CD integration
- [ ] Troubleshooting skills

---

## 🔗 Useful Resources

### Documentation
- [Docker Official Docs](https://docs.docker.com/)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

### Interactive Learning
- [Play with Docker](https://labs.play-with-docker.com/)
- [Play with Kubernetes](https://labs.play-with-k8s.com/)
- [Katacoda Scenarios](https://www.katacoda.com/)

### Tools
- [k9s](https://k9scli.io/) - Terminal UI for Kubernetes
- [Lens](https://k8slens.dev/) - Kubernetes IDE
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Kind](https://kind.sigs.k8s.io/) - Kubernetes in Docker

---

## 💡 Pro Tips

1. **Always use version control for configs** - Track changes in Git
2. **Start small** - Don't try to containerize everything at once
3. **Monitor from day one** - Set up logging and metrics early
4. **Automate repetitive tasks** - Create scripts for common operations
5. **Learn by breaking things** - Use a dev environment to experiment
6. **Read error messages carefully** - They usually tell you exactly what's wrong
7. **Use aliases** - `alias k=kubectl` saves lots of typing

---

## 🎉 Congratulations!

You now have a solid foundation in container orchestration. Remember:
- **Practice regularly** - Hands-on experience is key
- **Build projects** - Apply what you learn
- **Join communities** - Learn from others
- **Stay updated** - Technology evolves quickly

Happy containerizing! 🚀
{% endraw %}
