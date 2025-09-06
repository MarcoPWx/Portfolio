---
layout: default
title: Chameleon Documentation
permalink: /harvest/
---

# Chameleon Documentation 🌾

Welcome to the Chameleon documentation hub - your guide to the privacy-first AI data harvesting platform.

## 📖 [Start with the Learning Roadmap](/harvest-learning-roadmap/)

The learning roadmap provides a structured path through all Chameleon documentation.

## 🚀 Quick Links

### Getting Started
- [User Journeys](/harvest/USER_JOURNEYS/)
- [Trust First User Journey](/harvest/TRUST_FIRST_USER_JOURNEY/)
- [Differentiation Strategy](/harvest/DIFFERENTIATION_STRATEGY/)

### Architecture
- [Complete System Architecture](/harvest/architecture/COMPLETE_SYSTEM_ARCHITECTURE/)
- [Concurrency & Locking Patterns](/harvest/architecture/CONCURRENCY_AND_LOCKING_PATTERNS/)

### Operations
- [Deployment Guide](/harvest/deployment/DEPLOYMENT_GUIDE/)
- [Production Readiness Runbook](/harvest/runbooks/PRODUCTION_READINESS_RUNBOOK/)

### Status
- [System Status](/harvest/status/SYSTEM_STATUS/)
- [DevLog](/harvest/status/DEVLOG/)
- [Epic Management](/harvest/status/EPIC_MANAGEMENT/)

## 📚 All Documentation

Browse all Chameleon documentation files:

{% assign docs = site.harvest | sort: 'title' %}
{% for doc in docs %}
- [{{ doc.title | default: doc.name }}]({{ doc.url | relative_url }})
{% endfor %}

---

[Back to Documentation Home](/) | [View Learning Roadmap](/harvest-learning-roadmap/)
