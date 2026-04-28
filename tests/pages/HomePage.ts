import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@infra/env';

/**
 * Marketing landing for Scenario A (Sign Up). The "Log In" link
 * redirects to the account portal (env.BASE_URL_ACCOUNT + 'login/').
 */
export class HomePage extends BasePage {
  protected readonly url = env.BASE_URL_FREEVPN;

  constructor(page: Page) {
    super(page);
  }

  logInLink(): Locator {
    return this.page.getByRole('link', { name: 'Log In' }).first();
  }

  async clickLogIn(): Promise<void> {
    await this.logInLink().click();
  }
}
