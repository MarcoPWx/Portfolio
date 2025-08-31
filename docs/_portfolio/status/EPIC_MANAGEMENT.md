# NatureQuest Portfolio — Epic Management

Last Updated: 2025-08-28
Status: Active
Owner: NatureQuest Portfolio Team

Overview
- This document tracks the epics and tasks for the Portfolio project (Next.js + React + Tailwind + Framer Motion).
- Use the checklists below to plan, execute, and review progress. Link PRs/issues next to tasks as they land.

How to use
- Status tags: [Planned] [In Progress] [Blocked] [Done]
- Mark tasks with [ ] / [x]
- Keep acceptance criteria concise and measurable

Epic P1 — UI Refactor & Component Library [In Progress]
Goal: Consolidate and harden the UI system, improve accessibility and responsiveness, and provide Storybook coverage for all components.
Key outcomes
- Consistent, reusable components with forwardRef where needed
- Accessible nav and controls (roles, aria-labels, keyboard support)
- Storybook as the source of truth for the design system
Deliverables
- Shared components: Button, IconButton, Badge, Card3D, Typography, StatsGrid/StatCard, Modal (Roadmap), Timeline/Tabs, SkillCard suite, Navigation
- Updated styles/tokens; responsive refinements
Tasks
- [ ] Extract and document common UI components (see src/components/ui)
- [ ] Add React.forwardRef to components that render DOM nodes (Button, Card3D, etc.)
- [ ] Add ARIA roles/labels and keyboard handlers to nav and interactive controls
- [ ] Create Storybook stories for each component (args + controls)
- [ ] Add visual regression stories for key components (if using Chromatic/Playwright snapshots)
- [ ] Audit and align spacing/typography across pages
Acceptance criteria
- No console warnings about refs on function components
- Storybook includes all key UI components with controls and usage docs
- Manual accessibility pass (keyboard navigation + screen reader labels) passes in Storybook and app

Epic P2 — Testing & Quality [Planned]
Goal: Stabilize unit/integration tests and improve coverage while aligning queries with accessible markup.
Tasks
- [x] Fix brittle queries (use role/name or getAllBy when multiple matches are expected)
- [x] Ensure ComprehensiveSkills container exposes data-testid="comprehensive-skills"
- [x] Improve terminal input handler (support Enter on onKeyDown for reliability in tests)
- [ ] Expand unit tests for Skill components and Roadmap modal
- [ ] Add a11y tests (axe) for critical pages/components
- [ ] Raise coverage thresholds after stabilization
Acceptance criteria
- Jest suite passes locally and in CI (repeatable runs)
- Coverage >= 70% with meaningful lines covered

Epic P3 — Performance & Responsiveness [Planned]
Goal: Maintain smooth UX, optimize bundle size, and keep animations performant.
Tasks
- [x] Dynamic import for heavy, non-critical components (RoadmapModal, StatsDashboard). Defer SkillComponentsShowcase.
- [ ] Conditional animation/particle density (reduced in tests/reduced-motion)
- [ ] Analyze bundle and add code-splitting boundaries
- [ ] Audit image usage and Next/Image where applicable
Acceptance criteria
- TTI remains smooth on mid-range devices
- Lighthouse performance score >= 90 in a production build

Epic P4 — Documentation & Knowledge Base [In Progress]
Goal: Keep docs aligned with the codebase, provide quick onboarding, and surface the roadmap.
Tasks
- [x] Create Portfolio Epics & Tasks document (this file)
- [x] Update Portfolio Status doc with a Roadmap & Epics section
- [ ] Add a prominent link from docs/index.md to this epics doc
- [ ] Add testing and Storybook contribution guides (docs/tests/ and docs/storybook/)
Acceptance criteria
- Status doc references epics and next steps
- Contributors can discover and follow documented workflows

Epic P5 — CI/CD & Tooling [Planned]
Goal: Ensure high-signal CI with consistent results and fast feedback.
Tasks
- [ ] GitHub Actions: lint, typecheck, unit/integration tests
- [ ] Optional Playwright job (can be scheduled or on-demand)
- [ ] Cache dependencies to speed up CI
- [ ] Enforce formatting (Prettier) and lint (ESLint) pre-push or via CI
Acceptance criteria
- Green CI on main; broken builds are blocked from merging

Epic P6 — Accessibility & i18n [Planned]
Goal: Meet WCAG 2.1 AA across core flows and prepare for multi-language content.
Tasks
- [ ] Alt text on images/icons where needed
- [ ] Keyboard-only navigation validation (focus rings, traps)
- [ ] Color contrast validation pass
- [ ] i18n scaffolding (strings extraction plan)
Acceptance criteria
- a11y checks pass with no critical violations

Epic P7 — Admin Panel & Remote Config (Backlog)
Goal: Centralize content/config control for the portfolio and ecosystem widget.
Tasks
- [ ] Remote config schema design
- [ ] Admin UI skeleton + auth gates
- [ ] Rollout plan (staging → production)
Acceptance criteria
- Not in scope until core portfolio epics are Done

Epic P8 — Analytics & Monitoring (Backlog)
Goal: Privacy-first analytics and basic error monitoring.
Tasks
- [ ] Lightweight page analytics (self-hosted or privacy-first)
- [ ] Error tracking (client/browser) with sampling
Acceptance criteria
- No PII captured; analytics disabled locally and in tests

Milestones
- M1 (v2.1): UI refactor and core Storybook coverage completed (P1)
- M2 (v2.2): Stable tests and >=70% coverage (P2), perf baseline (P3)
- M3 (v2.3): a11y pass and i18n scaffolding (P6)

References
- Portfolio Status: ./PORTFOLIO_STATUS.md
- Interactive Portfolio: src/components/InteractivePortfolio.tsx
- Skills: src/components/ComprehensiveSkills.tsx and ComprehensiveSkillsV2.tsx

