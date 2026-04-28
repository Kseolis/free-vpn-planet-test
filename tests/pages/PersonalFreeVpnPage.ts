import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@infra/env';

export type PersonalOffer = '2_days' | '1_month' | '1_year';

/**
 * EN landing page (Scenario C) — env.BASE_URL_PERSONAL.
 * Same form architecture as Site B (#PPG → /payment/), but no qa-* IDs:
 * selectors use [name][value] attributes, role and placeholder.
 */
export class PersonalFreeVpnPage extends BasePage {
  protected readonly url = env.BASE_URL_PERSONAL;

  constructor(page: Page) {
    super(page);
  }

  offerRadio(offer: PersonalOffer): Locator {
    return this.page.locator(`input[type="radio"][name="offer_id"][value="${offer}"]`);
  }

  async selectOffer(offer: PersonalOffer): Promise<void> {
    await this.offerRadio(offer).check();
  }

  emailInput(): Locator {
    return this.page.getByPlaceholder('name@example.com');
  }

  submitButton(): Locator {
    return this.page.locator('form#PPG button[type="submit"]');
  }
}
