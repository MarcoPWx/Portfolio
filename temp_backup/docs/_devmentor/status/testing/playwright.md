---
layout: product
title: playwright
product: DevMentor
source: status/testing/playwright.md
---

{% raw %}
# Playwright Runbook

Last updated: 2025-08-23 12:33 UTC
Owners: Testing and Frontend teams

Scope
- How to run the E2E suite deterministically
- How to update and approve visual snapshots
- Artifacts and reports
- Common fixes for flaky selectors and redirects

Prerequisites
- Node.js LTS and npm installed
- Playwright deps installed in frontend/devmentor-ui
  - npm ci
  - npx playwright install --with-deps
- Dev server or mocked routes available (recommended to rely on route mocks for determinism)

Quick commands
- Headed debug: npx playwright test --headed
- Update snapshots: npx playwright test --update-snapshots
- Chromium only: npx playwright test --project=chromium
- Show report: npx playwright show-report

Deterministic testing
- Mock network:
  - Use page.route() to intercept /api/auth/login and GitHub OAuth endpoints in auth specs.
  - Return fixed JSON responses and status codes.
- Avoid timing flakiness:
  - Prefer role-based locators (getByRole) with accessible names.
  - Use expect(locator).toBeVisible() with awaits and timeouts only if necessary.
  - Gate optional animations/elements with conditional presence checks.
- Mobile emulation:
  - Skip Firefox for mobile: firefox does not support mobile emulation in Playwright.

Artifacts and reports
- Test artifacts: frontend/devmentor-ui/test-results/
  - Per-test: video.webm, trace.zip, screenshot.png on failures (if enabled)
- HTML report: frontend/devmentor-ui/playwright-report/
  - Open via: npx playwright show-report

Visual snapshots
- Baselines live under: frontend/devmentor-ui/tests/playwright/__snapshots__ (or in test-results per config)
- To approve expected UI changes: npx playwright test --update-snapshots
- Review differences in the HTML report before approving.

Common fixes
- Password toggle button not clickable:
  - Expand selector to match [data-testid="toggle-password"], role=button, or text variants.
- Privacy policy heading not found:
  - Prefer getByRole('heading', { name: /privacy policy/i }) with fallback getByText.
- GitHub OAuth flakiness:
  - Mock GET /api/auth/github and final redirect; assert navigation after resolving route.
- Login redirect assertions:
  - After mocking /api/auth/login, explicitly wait for a dashboard marker element or route change.
- File upload on hidden inputs:
  - Use input[type="file"].setInputFiles rather than waiting for the file chooser.

CI notes
- Run Chromium-only in CI for speed, then nightly full matrix (Chromium, Firefox, WebKit).
- Upload HTML report as artifact; retain videos for failed tests.

Troubleshooting
- Tests hang waiting for network:
  - Use page.waitForLoadState('networkidle') judiciously, or prefer explicit waits on UI cues.
- Strict mode locator errors:
  - Add data-testid in UI for unique targets and update tests accordingly.

{% endraw %}
