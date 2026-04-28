import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const isCI = !!process.env.CI;

/**
 * Project conventions live in `tests-config.json` and `docs/CONSTRAINTS.md`.
 * Hard defaults from CONSTRAINTS §2.6 (external third-party sites):
 *   retries: 2, trace: 'on-first-retry', video: 'retain-on-failure'.
 * No baseURL — each spec uses absolute URLs because we test three different origins.
 */
export default defineConfig({
  testDir: 'tests/specs',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 2,
  ...(isCI ? { workers: '50%' as const } : {}),
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    testIdAttribute: 'data-testid',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
