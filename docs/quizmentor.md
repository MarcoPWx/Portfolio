---
layout: default
title: QuizMentor Documentation
permalink: /quizmentor/
---

# QuizMentor Documentation 🎓

Welcome to the QuizMentor documentation hub - your guide to understanding and working with the AI-powered quiz platform.

## 📖 [Start with the Learning Roadmap](/quizmentor-learning-roadmap/)

The learning roadmap provides a structured path through all QuizMentor documentation.

## 🚀 Quick Links

### Getting Started
- [Project Overview](/quizmentor/PROJECT_OVERVIEW/)
- [Platform Vision](/quizmentor/PLATFORM_VISION/)
- [Quick Start Supabase](/quizmentor/QUICK_START_SUPABASE/)
- [Hands On Tutorial](/quizmentor/HANDS_ON_TUTORIAL/)

### Current Status
- [Implementation Status](/quizmentor/IMPLEMENTATION_STATUS/)
- [Actual Status](/quizmentor/ACTUAL_STATUS/)

### Technical Documentation
- [Production Architecture](/quizmentor/PRODUCTION_ARCHITECTURE/)
- [Authentication Design](/quizmentor/AUTHENTICATION_DESIGN/)
- [Deployment Guide](/quizmentor/DEPLOYMENT_GUIDE/)
- [Integration Guide](/quizmentor/INTEGRATION_GUIDE/)

### Features
- [Gamification](/quizmentor/GAMIFICATION_SYSTEM/)
- [Admin Dashboard](/quizmentor/ADMIN_DASHBOARD/)
- [Premium Design System](/quizmentor/PREMIUM_DESIGN_SYSTEM/)

## 📚 All Documentation

Browse all QuizMentor documentation files:

{% assign docs = site.quizmentor | sort: 'title' %}
{% for doc in docs %}
- [{{ doc.title | default: doc.name }}]({{ doc.url | relative_url }})
{% endfor %}

---

[Back to Documentation Home](/) | [View Learning Roadmap](/quizmentor-learning-roadmap/)
