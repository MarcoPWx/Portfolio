---
layout: product
title: EPIC E2E PLAYWRIGHT MIGRATION
product: DevMentor
source: status/testing/EPIC_E2E_PLAYWRIGHT_MIGRATION.md
---

{% raw %}
# Epic: E2E Testing Overhaul (Playwright Migration)

Status: In Progress
Start: 2025-08-21
Owner: DevMentor Team

Objectives
- Make Playwright the primary E2E framework with multi-browser support.
- Capture rich artifacts (videos, screenshots, traces) to speed up debugging.
- Establish a clear developer runbook and CI path.

Deliverables
- Updated UI `playwright.config.ts` with artifacts and reporters.
- NPM scripts for running, debugging, and reporting.
- Runbook: `/docs/testing/playwright-runbook.md`.
- TESTING_GUIDE.md section on Playwright artifacts.
- .gitignore rules for artifacts.

Progress
- Config, scripts, docs updated; initial runs show failures (selectors, snapshots missing, auth flows).

Risks / Issues
- Strict locator conflicts (getByText resolves multiple elements).
- Missing visual baselines causing snapshot failures.
- Firefox mobile emulation unsupported.
- Login/dashboard navigation timing without stubs.

Next Steps
- Harden selectors; add conditional skips for Firefox mobile-only features.
- Establish and approve stable visual baselines.
- Decide on auth mocking strategy for E2E flows.

Metrics
- Goal: Green Chromium suite locally; flake rate <2%.

---

Update — 2025-08-21 21:41 UTC
- Runbook centralized at root `/docs/testing/playwright-runbook.md`.
- Initial Playwright run executed; videos/screenshots captured. Investigations queued for selectors, auth flow, and visual baselines.

Update — 2025-08-22 09:51 UTC
- Applied selector hardening, auth mocking, Firefox mobile skip, and file upload fix.
- Performed snapshot update run; next focus: refine locators in feature cards and headings; stabilize login redirect.

Update — 2025-08-23 12:36 UTC (Snapshots + Chromium run)
- Commands:
  - `npx playwright test --update-snapshots`
  - `npx playwright test --project=chromium --reporter=line`
- Results (Chromium only): 32 tests → 18 passed, 1 skipped, 13 failed (~54s)
- Failure buckets:
  - Feature card hover locator strictness
  - Login redirect waitForURL("**/dashboard") after mocked login
  - Password visibility toggle button not located
  - GitHub OAuth request not observed (ensure `/api/auth/github` triggered + mocked)
  - Privacy Policy modal heading strict conflict (duplicate matches)
  - Mobile heading hidden at breakpoint
  - Keyboard focus and ARIA label strict assertions
  - Interview-prep headings/content expectations too strict
- Artifacts:
  - Test artifacts: `frontend/devmentor-ui/test-results/` (videos, screenshots, traces)
  - HTML report: `frontend/devmentor-ui/playwright-report/` (open via `npm run pw:report`)
- Next actions:
  - Add data-testid to feature cards and password toggle in the UI
  - Refine privacy policy checks to role-based heading with exact match
  - After mocking /api/auth/login, explicitly navigate to /dashboard or await a dashboard marker
  - Ensure GitHub OAuth click triggers `/api/auth/github` in dev and mock response
  - Loosen interview-prep heading/content assertions and add stable test ids

Update — 2025-08-23 13:00 UTC (Full suite across browsers)
- Command: `npx playwright test --reporter=line`
- Totals: 96 tests → 53 passed, 4 skipped, 39 failed (~2m 12s)
- Failure types (unchanged from Chromium-only, reproduced in Firefox/WebKit):
  - Feature card hover locator strictness
  - Login redirect waitForURL after mocked login
  - Password toggle selector missing
  - GitHub OAuth request wait not observed
  - Privacy policy heading strict conflict (duplicate matches)
  - Mobile heading hidden at breakpoint
  - Keyboard focus and ARIA label assertions too strict
  - Interview-prep headings/content too strict
- Artifacts: `frontend/devmentor-ui/test-results/`, `frontend/devmentor-ui/playwright-report/`

{% endraw %}
