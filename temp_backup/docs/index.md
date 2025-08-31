---
layout: default
title: NatureQuest Documentation Hub
---

# 🌟 NatureQuest Documentation Hub

Welcome to the comprehensive documentation center for the NatureQuest ecosystem - a suite of AI-powered development and learning tools.

## 🎯 Quick Navigation

<div class="grid">
  <a href="/learning-roadmap" class="card">
    <h3>📚 Learning Roadmap</h3>
    <p>Structured learning path through all products</p>
  </a>
  
  <a href="/devmentor" class="card">
    <h3>🧠 DevMentor</h3>
    <p>AI development assistant with pattern learning</p>
  </a>
  
  <a href="/quizmentor" class="card">
    <h3>🎓 QuizMentor</h3>
    <p>Adaptive learning platform</p>
  </a>
  
  <a href="/harvest" class="card">
    <h3>🌾 Harvest.ai</h3>
    <p>Content intelligence platform</p>
  </a>
  
  <a href="/omni" class="card">
    <h3>🔮 Omni.ai</h3>
    <p>Universal VS Code AI assistant</p>
  </a>
  
  <a href="/architecture" class="card">
    <h3>🏗️ Architecture</h3>
    <p>System design and patterns</p>
  </a>
</div>

## 🚀 Start Here

### For New Developers
1. **[4-Hour Quick Start](/learning-roadmap#quick-start)** - Get operational fast
2. **[Environment Setup](/setup)** - Configure your development environment
3. **[Ecosystem Overview](/ecosystem)** - Understand how products connect

### For Specific Roles
- **[Frontend Developers](/tracks/frontend)** - React, Next.js, UI patterns
- **[Backend Engineers](/tracks/backend)** - APIs, microservices, databases
- **[DevOps/SRE](/tracks/devops)** - Kubernetes, monitoring, scaling
- **[AI/ML Engineers](/tracks/ai-ml)** - LLMs, vector DBs, ML patterns

## 📊 Documentation Stats
- **Total Documents**: 256+ markdown files
- **Products Covered**: 4 major platforms
- **Learning Paths**: 30+ structured guides
- **Code Examples**: 100+ practical samples

## 🔍 Search Documentation

<div class="search-container">
  <input type="text" id="search" placeholder="Search all documentation..." />
  <div id="search-results"></div>
</div>

## 📈 Latest Updates

| Date | Update | Product |
|------|--------|---------|
| 2024-12-26 | Comprehensive learning roadmap created | All |
| 2024-12-25 | DevMentor system audit completed | DevMentor |
| 2024-12-24 | Authentication architecture updated | DevMentor |
| 2024-12-23 | QuizMentor testing guide enhanced | QuizMentor |
| 2024-12-22 | Harvest.ai competitive analysis | Harvest.ai |

## 🎓 Learning Tracks

### Week 1: Foundation
- [System Architecture](/architecture/overview)
- [Development Environment](/setup/environment)
- [Container Orchestration](/devops/kubernetes)

### Week 2: Services
- [Authentication](/services/auth)
- [AI Integration](/services/ai)
- [Real-time Features](/services/websocket)

### Week 3: Operations
- [Monitoring](/operations/monitoring)
- [Security](/operations/security)
- [Production Deployment](/operations/deployment)

### Week 4: Advanced
- [Testing Strategies](/testing/strategies)
- [CI/CD Pipeline](/cicd/pipeline)
- [Business Strategy](/business/strategy)

## 🛠️ Tools & Resources

### Development Tools
- [VS Code Extensions](/tools/vscode)
- [CLI Commands](/tools/cli)
- [Docker Compose Files](/tools/docker)

### Monitoring Dashboards
- [Grafana Templates](/monitoring/grafana)
- [Prometheus Queries](/monitoring/prometheus)
- [Kiali Service Mesh](/monitoring/kiali)

### Testing Resources
- [E2E Test Suites](/testing/e2e)
- [Unit Test Examples](/testing/unit)
- [Load Testing Scripts](/testing/load)

## 📚 Documentation by Category

### Architecture & Design
- [System Architecture](/architecture/system)
- [Design Patterns](/architecture/patterns)
- [API Design](/architecture/api)
- [Database Schema](/architecture/database)

### Development
- [Getting Started](/development/quickstart)
- [Code Standards](/development/standards)
- [Best Practices](/development/best-practices)
- [Troubleshooting](/development/troubleshooting)

### Operations
- [Deployment Guide](/operations/deployment)
- [Scaling Strategies](/operations/scaling)
- [Incident Response](/operations/incidents)
- [Runbooks](/operations/runbooks)

### Business
- [Product Strategy](/business/strategy)
- [Competitive Analysis](/business/competition)
- [Monetization](/business/monetization)
- [Roadmap](/business/roadmap)

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](/contributing) for:
- Documentation standards
- How to submit updates
- Style guidelines
- Review process

## 📞 Support

- **GitHub Issues**: [Report problems](https://github.com/NatureQuest)
- **Discussions**: [Ask questions](https://github.com/NatureQuest/discussions)
- **Email**: support@naturequest.ai
- **Discord**: [Join our community](https://discord.gg/naturequest)

---

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  background: white;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.card h3 {
  margin-top: 0;
  color: #0969da;
}

.search-container {
  margin: 2rem 0;
}

#search {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e1e4e8;
  border-radius: 6px;
}

#search-results {
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
}
</style>

<script>
// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      if (query.length > 2) {
        // This would connect to a search API or index
        searchResults.innerHTML = '<p>Searching...</p>';
        // Implement actual search here
      } else {
        searchResults.innerHTML = '';
      }
    });
  }
});
</script>
