---
layout: product
title: QUICK REFERENCE
product: DevMentor
source: infrastructure/services/monitoring-service/QUICK_REFERENCE.md
---

{% raw %}
# 🚀 Monitoring Service Quick Reference

## Quick Start

### Terminal Monitoring
```bash
# Basic monitoring
npm run monitor

# Enhanced monitoring (no flashing)
npm run monitor:enhanced

# Ultra monitoring (AI-powered)
npm run monitor:ultra
```

### Web Dashboard
```bash
# Start monitoring service
cd services/monitoring-service
npm install
npm run dev

# Access dashboard
open http://localhost:3001/architecture/monitoring
```

### Docker
```bash
# Start all services with monitoring
docker-compose up -d

# View monitoring logs
docker-compose logs -f monitoring-service
```

## Service Endpoints

| Service | Port | Health Check | Description |
|---------|------|--------------|-------------|
| Frontend | 3001 | `/api/health` | Next.js UI |
| Auth | 3002 | `/health` | Authentication |
| Memory | 3003 | `/health` | Redis cache |
| AI Gateway | 3004 | `/health` | OpenAI integration |
| Project | 3005 | `/health` | Project management |
| **Monitoring** | **3006** | **/health** | **Observability hub** |

## Key Features

### 🔍 Real-Time Monitoring
- Service health checks every 10s
- System metrics every 5s
- WebSocket live updates
- Docker container monitoring

### 🤖 AI Intelligence
- Predictive maintenance
- Pattern recognition
- Smart fix suggestions
- Anomaly detection

### 🚨 Incident Management
- Auto-detection
- Severity classification
- Automated responses
- Incident timeline

### 📊 Metrics & Dashboards
- Prometheus `/metrics`
- Custom React dashboard
- Grafana integration ready
- Historical data analysis

## API Quick Reference

### REST Endpoints
```bash
# Health check
curl http://localhost:3006/health

# Get all services
curl http://localhost:3006/api/services

# Get metrics
curl http://localhost:3006/api/metrics

# Get incidents
curl http://localhost:3006/api/incidents

# Get AI predictions
curl http://localhost:3006/api/predictions

# Restart a service
curl -X POST http://localhost:3006/api/services/auth/restart

# Prometheus metrics
curl http://localhost:3006/metrics
```

### WebSocket Events
```javascript
// Connect to monitoring
const socket = io('http://localhost:3006');

// Listen for updates
socket.on('servicesUpdate', (services) => {
  console.log('Services:', services);
});

socket.on('incident', (incident) => {
  console.log('New incident:', incident);
});

socket.on('prediction', (prediction) => {
  console.log('AI prediction:', prediction);
});

// Request data
socket.emit('requestMetrics');
socket.emit('restartService', 'auth');
```

## Environment Variables

```bash
# Essential
PORT=3006
NODE_ENV=production
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/monitoring
REDIS_URL=redis://localhost:6379

# Intervals (milliseconds)
HEALTH_CHECK_INTERVAL=10000    # 10 seconds
METRICS_COLLECTION_INTERVAL=5000 # 5 seconds
PREDICTIVE_MAINTENANCE_INTERVAL=300000 # 5 minutes

# Alerts (optional)
ALERT_SLACK_ENABLED=true
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

## Dashboard Navigation

```
Architecture
├── System Overview
├── Service Map
├── Real-time Diagrams
└── Monitoring 🆕
    ├── Services Tab
    │   ├── Health Status
    │   ├── Response Times
    │   └── Error Rates
    ├── Metrics Tab
    │   ├── CPU Usage
    │   ├── Memory Distribution
    │   └── Performance Charts
    ├── Incidents Tab
    │   ├── Active Incidents
    │   ├── Incident History
    │   └── Auto-Responses
    └── AI Insights Tab
        ├── Predictions
        ├── Pattern Analysis
        └── Recommendations
```

## Keyboard Shortcuts (Ultra Monitor)

| Key | Action |
|-----|--------|
| `h` | Show help |
| `r` | Restart all services |
| `d` | Run diagnostics |
| `s` | Show detailed status |
| `b` | Backup configuration |
| `a` | Run security audit |
| `m` | Show metrics |
| `c` | Clear screen |
| `Ctrl+C` | Exit |

## Common Issues & Fixes

### Cannot connect to Docker
```bash
sudo chmod 666 /var/run/docker.sock
# OR
docker run --privileged devmentor-monitoring
```

### WebSocket connection fails
```javascript
// Check CORS in server.js
cors: {
  origin: process.env.FRONTEND_URL || 'http://localhost:3001'
}
```

### High memory usage
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

### Service not appearing
```bash
# Check health endpoint
curl http://localhost:3002/health

# Check monitoring service logs
docker-compose logs monitoring-service
```

## Integration Points

### With Event System
- Receives events from all services via WebSocket
- Emits monitoring events (incidents, predictions)
- See: `/docs/events/`

### With Observability Stack
- Exports Prometheus metrics
- Sends logs to Winston/ELK
- Ready for OpenTelemetry traces
- See: `/docs/monitoring-service/OBSERVABILITY_INTEGRATION.md`

### With Frontend
- WebSocket connection for real-time updates
- REST API for data queries
- Integrated under Architecture section
- Component: `/src/features/monitoring/MonitoringDashboard.tsx`

## File Structure

```
monitoring-service/
├── server.js           # Main server file
├── package.json        # Dependencies
├── Dockerfile          # Container config
├── .env.example        # Environment template
├── config/
│   └── services.js     # Service configuration
├── logs/
│   ├── error.log      # Error logs
│   └── combined.log   # All logs
└── tests/
    └── monitoring.test.js # Test suite
```

## Useful Commands

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start

# Run tests
npm test

# Build Docker image
npm run docker:build

# View logs
tail -f logs/combined.log
tail -f logs/error.log

# Debug mode
DEBUG=monitoring:* npm run dev
```

## Metrics to Watch

### System Health
- CPU Usage < 80%
- Memory Usage < 90%
- Disk Usage < 85%
- Network Latency < 100ms

### Service Health
- Response Time < 2000ms
- Error Rate < 5%
- Uptime > 99%
- Restart Count < 5/hour

### AI Predictions
- Memory Leak Detection
- Performance Degradation
- Failure Predictions
- Anomaly Detection

## Support & Documentation

- **Main README**: `/docs/monitoring-service/README.md`
- **Observability Guide**: `/docs/monitoring-service/OBSERVABILITY_INTEGRATION.md`
- **Event System**: `/docs/events/`
- **Operations Guide**: `/docs/operations/DEVMENTOR_OPERATIONS_GUIDE.md`

---

**Version**: 1.0.0 | **Port**: 3006 | **Status**: Production Ready
{% endraw %}
