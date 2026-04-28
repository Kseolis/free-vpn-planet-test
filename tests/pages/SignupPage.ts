import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@infra/env';

/** Plan options observed on the /order/ page (data-test-id suffix). */
export type SignupPlan = '1_month' | '1_year' | '3_years';

/**
 * Sign-up + plan + payment-method selection page (env.BASE_URL_ACCOUNT + 'order/').
 * Two screens share this URL:
 *   1. email step (button "Next");
 *   2. plan + payment-method step (terms + button "Get your subscription").
 */
export class SignupPage extends BasePage {
  protected readonly url = new URL('order/', env.BASE_URL_ACCOUNT).toString();

  constructor(page: Page) {
    super(page);
  }

  // Step 1: email entry
  emailInput(): Locator {
    return this.page.getByLabel('Email');
  }

  nextButton(): Locator {
    return this.page.getByRole('button', { name: 'Next' });
  }

  // Step 2: plan + payment method
  planSelectToggle(): Locator {
    return this.page.locator('[data-test-id="order-plan-select-current"]');
  }

  planOption(plan: SignupPlan): Locator {
    return this.page.locator(`[data-test-id="order-plan-select-option-${plan}"]`);
  }

  async selectPlan(plan: SignupPlan): Promise<void> {
    await this.planSelectToggle().click();
    await this.planOption(plan).click();
  }

  creditCardButton(): Locator {
    return this.page.getByRole('button', { name: 'Credit Card' });
  }

  cryptocurrencyButton(): Locator {
    return this.page.getByRole('button', { name: /cryptocurrency/i });
  }

  termsCheckbox(): Locator {
    return this.page.locator('#payment-checkbox');
  }

  getSubscriptionButton(): Locator {
    return this.page.getByRole('button', { name: 'Get your subscription' });
  }
}
