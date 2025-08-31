---
layout: default
title: Harvest.ai Documentation
permalink: /harvest/
---

# Harvest.ai Documentation 🌾

Welcome to the Harvest.ai documentation hub - your guide to the privacy-first AI data harvesting platform.

## 📖 [Start with the Learning Roadmap](/harvest-learning-roadmap/)

The learning roadmap provides a structured path through all Harvest.ai documentation.

## 🚀 Quick Links

### Getting Started
- [User Journeys](/harvest/USER_JOURNEYS/)
- [Trust First User Journey](/harvest/TRUST_FIRST_USER_JOURNEY/)
- [Differentiation Strategy](/harvest/DIFFERENTIATION_STRATEGY/)

### Architecture
- [System Architecture](/harvest/architecture/SYSTEM_ARCHITECTURE/)
- [Data Flow](/harvest/architecture/DATA_FLOW/)

### Operations
- [Deployment Guide](/harvest/deployment/DEPLOYMENT_GUIDE/)
- [Production Readiness](/harvest/runbooks/PRODUCTION_READINESS_RUNBOOK/)

### Status
- [System Status](/harvest/status/SYSTEM_STATUS/)
- [Development Log](/harvest/status/devlog/)
- [Epic Management](/harvest/status/epic_management/)

## 📚 All Documentation

Browse all Harvest.ai documentation files:

{% assign docs = site.harvest | sort: 'title' %}
{% for doc in docs %}
- [{{ doc.title | default: doc.name }}]({{ doc.url | relative_url }})
{% endfor %}

---

[Back to Documentation Home](/) | [View Learning Roadmap](/harvest-learning-roadmap/)
