import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@infra/env';

/**
 * Account-portal login screen.
 * Field IDs are dynamically generated per render — selectors use label / role / autocomplete.
 */
export class LoginPage extends BasePage {
  protected readonly url = new URL('login/', env.BASE_URL_ACCOUNT).toString();

  constructor(page: Page) {
    super(page);
  }

  emailInput(): Locator {
    return this.page.getByLabel('Email');
  }

  passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

  rememberMeCheckbox(): Locator {
    return this.page.locator('#rememberMe');
  }

  loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  signUpLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign Up' });
  }

  async clickSignUp(): Promise<void> {
    await this.signUpLink().click();
  }
}
