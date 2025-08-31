---
layout: product
title: playwright-runbook
product: DevMentor
source: status/testing/playwright-runbook.md
---

{% raw %}
# Playwright Testing Runbook

This runbook describes how we test DevMentor UI end-to-end with Playwright: setup, commands, artifacts, visual testing, CI, debugging, and best practices.

Last Updated: 2025-08-21

---

## 1) Prerequisites
- Node.js >= 18
- Dependencies installed: `npm ci`
- Playwright browsers installed: `npm run pw:install`
- Dev server runs at http://localhost:3001 (Next.js)

## 2) Directory Layout
- Config: `playwright.config.ts`
- Tests: `tests/playwright/`
- Per-run artifacts: `test-results/` (screenshots, videos, traces)
- HTML report: `playwright-report/`
- Visual baselines: co-located `*.spec.ts-snapshots/` folders

## 3) Core Commands
```bash
# Run the E2E suite (all browsers defined in projects)
npm run e2e

# Focus a spec
npx playwright test tests/playwright/auth/login.spec.ts

# Headed mode (see the browser)
npx playwright test --project=chromium --headed

# Interactive UI runner
npm run pw:ui

# Only last failures
npx playwright test --last-failed

# Show the latest HTML report
npm run pw:report
```

## 4) Artifacts (Screenshots, Videos, Traces)
Configured in `playwright.config.ts`:
- Screenshots: captured on failures (`screenshot: 'only-on-failure'`)
- Videos: retained on failures (`video: 'retain-on-failure'`)
- Traces: recorded on first retry (`trace: 'on-first-retry'`)
- Output directory: `test-results/`

Helpful:
```bash
# View a trace zip
npx playwright show-trace test-results/**/trace.zip
```

## 5) Visual Regression Testing
- Use `expect(page).toHaveScreenshot('name.png')` to capture baselines.
- First run creates “actual” images and fails if baseline missing.
- Approve baselines after UI is correct:
```bash
npx playwright test --update-snapshots
```
- Mask animation/noise with `mask: [locator]` and set `animations: 'disabled'`.

## 6) Selector Best Practices
Prefer robust locators to reduce flakes and strictness errors:
- Use roles: `getByRole('button', { name: 'Sign in' })`
- Use labels/placeholders: `getByLabel('Email'), getByPlaceholder('Enter your email')`
- Add `data-testid` for complex elements
- Avoid brittle text or deep CSS selectors when possible

Common fixes for strict mode conflicts:
```ts
await expect(page.getByRole('heading', { name: 'AI-Powered Development' })).toBeVisible();
// or ensure exact match
await expect(page.getByText('Password', { exact: true })).toBeVisible();
```

## 7) Multi-browser and Mobile
- Projects include chromium, firefox, webkit.
- Mobile emulation is supported in Chromium/WebKit (via devices) but not in Firefox.
- Skip unsupported features when needed:
```ts
import { test } from '@playwright/test';
test.skip(({ browserName }) => browserName === 'firefox', 'Mobile emulation not supported on Firefox');
```

## 8) Network and Auth
- Use `page.route` for network stubbing or rely on real services.
- For login flows, prefer stable test credentials or mock providers.
- Avoid external OAuth redirects in automated runs; stub at the API boundary.

## 9) CI Integration (Example)
```yaml
- name: Playwright E2E
  run: |
    npm ci
    npm run build
    npm run dev &
    sleep 10
    npm run e2e
  # Optionally upload artifacts
```

## 10) Debugging & Flake Triage
- Re-run a failing spec only: `npx playwright test --last-failed`
- Open headed with slowmo: `PWDEBUG=1 npx playwright test --project=chromium --headed --debug`
- Use trace viewer and video to diagnose timing/locator issues.

## 11) Known Caveats in DevMentor UI

Recent notes (2025-08-23 12:36 UTC)
- Login: after stubbing `/api/auth/login`, test should either navigate to `/dashboard` or await a dashboard marker; relying solely on waitForURL can time out if the app doesn’t navigate automatically in the mocked flow.
- Password toggle: add `[data-testid="toggle-password"]` in UI or extend locator to include button with Eye icon.
- Privacy Policy: prefer `getByRole('heading', { name: 'Zero-Knowledge Architecture', exact: true })` to avoid strict duplicates.
- GitHub OAuth: ensure click triggers a request to `/api/auth/github` in dev; mock this request to avoid external redirect.
- Mobile header: primary heading may be visually hidden at mobile breakpoint; adjust expectation or query a mobile-specific header.
- Interview-Prep: loosen heading/content assumptions; prefer role-based headings with fallbacks and add stable test ids.
- Login flow may require API mocks; otherwise waits for dashboard redirect can timeout.
- `.animate-pulse` selectors may change; prefer role-based or `data-testid`.
- Visual baselines must be approved once per environment.
- Firefox mobile emulation unsupported; skip or conditionally run such tests.

## 12) Maintenance
- Keep `playwright.config.ts` aligned with port and artifact settings.
- Regularly prune old `test-results/` if disk grows large (git-ignored).
- Update snapshots when intentional UI changes occur.

## 13) Contacts
- Owners: DevMentor UI team
- See `TESTING_GUIDE.md` for a quick overview.

{% endraw %}
