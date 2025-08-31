---
layout: product
title: OPS GETTING STARTED GUIDE
product: DevMentor
source: infrastructure/operations/OPS_GETTING_STARTED_GUIDE.md
---

{% raw %}
CURRENT ARCHITECTURE

---

# DevMentor Beginner's Guide

> Start here if you're new. We'll take it step by step.

## Your First Day

### What is DevMentor?
Think of DevMentor as a smart coding assistant made of many small programs (microservices) working together. Like a restaurant where:
- **Kitchen** = Backend services (AI, Auth, Database)
- **Waiter** = API Gateway (takes your order)
- **Menu** = UI Dashboard (what you see)

### Your First Command
Open your terminal and try this:
```bash
# See what's running
kubectl get pods

# If that worked, you're connected! 🎉
# If not, don't worry - we'll fix it together.
```

---

## Part 1: Getting Connected (5 minutes)

### Step 1: Where Are You?
```bash
# Check your current directory
pwd
# You should be in: /Users/betolbook/Documents/github/NatureQuest/devmentor

# If not, go there:
cd /Users/betolbook/Documents/github/NatureQuest/devmentor
```

### Step 2: Set Up Your Environment
```bash
# Copy and paste this whole block:
export NS=devmentor-app
export GATEWAY=http://localhost:8080
export UI=http://localhost:3000

# Test it worked:
echo "Namespace: $NS"
echo "Gateway: $GATEWAY"
echo "UI: $UI"
```

**What did we just do?**
- Created shortcuts so you don't have to type long addresses
- Like saving phone numbers in your contacts

### Step 3: Check If Things Are Running
```bash
# See all the services (like checking if the restaurant is open)
kubectl -n $NS get pods

# You should see something like:
# NAME                            READY   STATUS
# api-gateway-xxxxx               2/2     Running
# auth-service-xxxxx              2/2     Running
```

**What do the columns mean?**
- **NAME**: The service's unique ID
- **READY**: 2/2 means both containers are working (app + monitoring)
- **STATUS**: Running = good! CrashLoopBackOff = broken

---

## Part 2: Your First Debugging (10 minutes)

### Something's Broken? Let's Fix It!

#### Problem 1: "I see nothing when I run kubectl"
```bash
# Check if cluster exists
kubectl config current-context

# No output? Start the cluster:
./scripts/deploy-k8s-istio.sh deploy

# This takes ~5 minutes. Get coffee ☕
```

#### Problem 2: "A pod is not Running"
```bash
# Let's say auth-service is broken. First, look at it:
kubectl -n $NS describe pod auth-service-xxxxx

# Too much info? Just check the events (bottom part):
kubectl -n $NS describe pod auth-service-xxxxx | tail -20

# Common issues you'll see:
# - "ImagePullBackOff" = Can't download the program
# - "CrashLoopBackOff" = Program keeps crashing
# - "Pending" = Waiting for resources
```

#### Problem 3: "How do I see what went wrong?"
```bash
# Check the logs (like reading error messages)
kubectl -n $NS logs auth-service-xxxxx

# Too many logs? Just see recent ones:
kubectl -n $NS logs auth-service-xxxxx --tail=50

# See live logs as they happen:
kubectl -n $NS logs auth-service-xxxxx -f
# (Press Ctrl+C to stop)
```

---

## Part 3: Understanding the System (15 minutes)

### The Map of DevMentor

```
Internet (You)
    ↓
[API Gateway :8080] — Your front door
    ↓
┌─────────────────────────────┐
│   Your Services (Kitchen)   │
├─────────────────────────────┤
│ • UI (:3000) - Website      │
│ • AI (:3001) - Brain        │
│ • Auth (:3002) - Security   │
│ • Memory (:3003) - Storage  │
│ • Projects (:3004) - Tasks  │
└─────────────────────────────┘
    ↓
┌─────────────────────────────┐
│   Databases (Pantry)        │
├─────────────────────────────┤
│ • Redis - Fast storage      │
│ • PostgreSQL - User data    │
│ • Qdrant - AI memory        │
└─────────────────────────────┘
```

### Let's Visit Each Service

#### Check the Front Door (API Gateway)
```bash
# Is it answering?
curl http://localhost:8080/health

# You should see: {"status":"healthy"}
# If not, let's fix it...

# Make the gateway accessible:
kubectl -n $NS port-forward svc/api-gateway 8080:8080 &

# Try again:
curl http://localhost:8080/health
```

#### Check the Website (UI)
```bash
# Start the website
cd devmentor-ui
npm run dev

# Open your browser to: http://localhost:3000
# You should see the DevMentor homepage!
```

---

## Part 4: Common Tasks (Learn by Doing)

### Task 1: "The website is slow"
```bash
# Step 1: Check if services are healthy
kubectl -n $NS get pods

# Step 2: Check memory usage
kubectl -n $NS top pods

# Step 3: Find the slow service
kubectl -n $NS logs api-gateway-xxxxx --tail=50 | grep "slow\|timeout\|error"

# Step 4: Restart the slow service
kubectl -n $NS rollout restart deploy/api-gateway
```

### Task 2: "I need to see what's in Redis"
```bash
# Step 1: Connect to Redis
kubectl -n $NS port-forward svc/redis 6379:6379 &

# Step 2: Look inside
redis-cli
> PING
PONG  # Good! Redis is responding

> KEYS *  # Show all stored data
> exit
```

### Task 3: "How do I update a service?"
```bash
# Example: Update the API Gateway

# Step 1: Make your code changes
cd services/api-gateway
# ... edit files ...

# Step 2: Build new version
docker build -t devmentor/api-gateway:latest .

# Step 3: Load into cluster
kind load docker-image devmentor/api-gateway:latest --name devmentor

# Step 4: Restart to use new version
kubectl -n $NS rollout restart deploy/api-gateway

# Step 5: Watch it update
kubectl -n $NS rollout status deploy/api-gateway
```

---

## Part 5: When Things Go Wrong (Debugging)

### The Debugging Process (Remember: CALM)

**C** - Check what's broken
**A** - Analyze the logs
**L** - Look for the error
**M** - Make the fix

### Real Example: "Users can't log in"

```bash
# C - Check what's broken
kubectl -n $NS get pods | grep auth
# auth-service-xxxxx  0/2  CrashLoopBackOff

# A - Analyze the logs
kubectl -n $NS logs auth-service-xxxxx

# L - Look for the error
# You see: "Error: Cannot connect to database"
# Aha! Database connection issue

# M - Make the fix
# Check database is running:
kubectl -n $NS get pods | grep postgres

# If not running, start it:
kubectl -n $NS apply -f k8s/postgres.yaml

# Restart auth service:
kubectl -n $NS rollout restart deploy/auth-service
```

---

## Part 6: Your Daily Routine

### Morning Checklist (5 minutes)
```bash
# 1. Check everything is running
kubectl -n $NS get pods

# 2. Check for errors in last 12 hours
kubectl -n $NS get events --sort-by='.lastTimestamp' | head -20

# 3. Quick health check
curl http://localhost:8080/health

# 4. Start your dev environment
cd devmentor-ui && npm run dev
```

### Before You Push Code
```bash
# 1. Run tests
npm test

# 2. Check your service locally
npm start

# 3. Build Docker image
docker build -t devmentor/my-service:latest .

# 4. Test in cluster
kind load docker-image devmentor/my-service:latest --name devmentor
kubectl -n $NS rollout restart deploy/my-service
```

### End of Day
```bash
# 1. Check for any issues
kubectl -n $NS get pods | grep -v Running

# 2. Save logs if debugging
kubectl -n $NS logs -l app --tail=1000 > ~/Desktop/logs-$(date +%Y%m%d).txt

# 3. Stop port forwards
pkill -f "port-forward"
```

---

## Part 7: Learning More (Your Journey)

### Week 1: Master the Basics
- [ ] Run `kubectl get pods` without looking at notes
- [ ] Check logs for any service
- [ ] Restart a service
- [ ] Understand Running vs CrashLoopBackOff

### Week 2: Start Debugging
- [ ] Fix a crashed service
- [ ] Find errors in logs
- [ ] Connect to Redis
- [ ] Check service health

### Week 3: Make Changes
- [ ] Update a service
- [ ] Build and deploy your code
- [ ] Understand the architecture
- [ ] Debug connection issues

### Week 4: Become Independent
- [ ] Handle a full outage
- [ ] Debug without help
- [ ] Teach someone else
- [ ] Write your own runbook

---

## Quick Reference Card

### 🚨 Emergency Commands
```bash
# What's broken?
kubectl -n $NS get pods | grep -v Running

# Check logs
kubectl -n $NS logs <pod-name> --tail=100

# Restart service
kubectl -n $NS rollout restart deploy/<service-name>

# Get help
kubectl explain pods
kubectl explain deployments
```

### 📍 Most Used Commands
```bash
# See everything
kubectl -n $NS get all

# Check specific service
kubectl -n $NS get pods | grep api-gateway

# Follow logs live
kubectl -n $NS logs -f api-gateway-xxxxx

# Access service locally
kubectl -n $NS port-forward svc/api-gateway 8080:8080
```

### 🔧 Common Fixes
| Problem | Solution |
|---------|----------|
| CrashLoopBackOff | Check logs, fix error, restart |
| ImagePullBackOff | Check image name, rebuild, reload |
| Pending | Check resources, may need more memory |
| Connection refused | Service down, restart it |
| 504 Gateway Timeout | Backend service slow/down |

---

## Getting Help

### When You're Stuck

1. **Check the logs first**
   ```bash
   kubectl -n $NS logs <pod-name> --tail=100
   ```

2. **Google the exact error message**
   - Copy the error
   - Search: "kubernetes <your-error>"

3. **Ask for help with context**
   ```bash
   # Gather info for help
   kubectl -n $NS get pods > problem.txt
   kubectl -n $NS logs <problem-pod> --tail=200 >> problem.txt
   kubectl -n $NS describe pod <problem-pod> >> problem.txt
   # Share problem.txt when asking for help
   ```

### Useful Resources
- **Kubernetes Basics**: https://kubernetes.io/docs/tutorials/kubernetes-basics/
- **kubectl Cheat Sheet**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- **DevMentor Docs**: `/docs` folder in this repo

---

## You Made It! 🎉

### What You've Learned
- ✅ How to check what's running
- ✅ How to read logs
- ✅ How to restart services
- ✅ How to debug basic issues
- ✅ How to get help

### Next Steps
1. Practice the daily routine for a week
2. Try fixing a problem on your own
3. Read the advanced guide when ready: `DEVMENTOR_OPERATIONS_GUIDE.md`

### Remember
- Everyone was a beginner once
- It's okay to make mistakes (that's how you learn!)
- The worst that can happen: restart the cluster
- You've got this! 💪

---

## Appendix: Glossary

**Pod**: A running instance of your service (like a process)

**Deployment**: Instructions for how many pods to run

**Service**: Network endpoint to reach your pods

**Namespace**: Folder for organizing resources (we use `devmentor-app`)

**Container**: Package containing your code and dependencies

**kubectl**: Command-line tool to control Kubernetes ("kube control")

**Logs**: Text output from your services (errors, info, etc.)

**Port-forward**: Make a cluster service accessible on localhost

**Rollout**: Deploy a new version of your service

**CrashLoopBackOff**: Service keeps crashing and restarting

---

*Remember: The best way to learn is by doing. Start with Part 1 and take it slow!*
{% endraw %}
