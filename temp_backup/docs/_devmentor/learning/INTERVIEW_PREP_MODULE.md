---
layout: product
title: INTERVIEW PREP MODULE
product: DevMentor
source: learning/INTERVIEW_PREP_MODULE.md
---

{% raw %}
# Interview Preparation Module

Status: Integrated (UI) | Scope: Learning Hub → Interview Prep → Backend Mastery Quiz

Overview
- Purpose: Help users prepare for interviews by analyzing their CV/resume and a job description to generate a tailored study plan and practice quizzes.
- Location: Frontend → /learning → Interview Preparation Hub
- Dependencies: quiz-system (CLI), Learning Hub components, analyzer service

User Flow
1) Upload/paste CV and paste job description
2) Click "Analyze & Generate Prep Plan"
3) Review match score, top skill gaps, likely interview questions, and personalized study plan
4) Click "Practice Quiz" for a topic to launch the Backend Mastery Quiz

Implementation
- UI Components
  - InterviewPrepHub.tsx
    - Path: frontend/devmentor-ui/src/features/learning/InterviewPrepHub.tsx
    - Features: CV upload, JD paste, analysis, gaps, study plan, launch quizzes
  - BackendMasteryQuiz.tsx
    - Path: frontend/devmentor-ui/src/features/learning/BackendMasteryQuiz.tsx
    - Features: Category selection and question-by-question quiz with explanations
- Services
  - interviewPrepAnalyzer.ts
    - Path: frontend/devmentor-ui/src/services/interviewPrepAnalyzer.ts
    - Features: keyword extraction, gap calculation, plan generation, question templates
- CLI Integration
  - quiz-system/backend-mastery-questions.js
    - Exported via module.exports for reuse

Planned Enhancements
- Replace placeholder in UI with direct import of quiz content from quiz-system (build-time JSON export or server route)
- Add minimal API route for PDF/DOCX text extraction (server-side) 
- Persist user prep plans and quiz progress via Learning Engine APIs

Testing Plan
- Unit tests (Jest/RTL)
  - interviewPrepAnalyzer: skills extraction, gap calculation, plan totals
  - InterviewPrepHub: renders, state transitions, button states, error handling
  - BackendMasteryQuiz: navigation, correctness, explanations, results
- E2E tests (Playwright)
  - Scenario: Paste CV + JD → Analyze → Click Practice Quiz → Complete quiz → Score displayed
- CI gates
  - Coverage target: 80% for new files
  - Add to cluster_beta-readiness testing gates

Docs & Sync
- System status updated with module mention and testing notes
- Epic management updated with tasks and deliverables
- Kubernetes beta readiness checklist updated with E2E and unit test gates

{% endraw %}
