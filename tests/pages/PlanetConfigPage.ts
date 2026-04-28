import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@infra/env';

export type PlanetConfigOffer = '2_days' | '1_month' | '1_year';

/**
 * RU landing page (Scenario B) — env.BASE_URL_PLANETCONFIG.
 * Form #PPG submits via GET to /payment/ with the chosen offer + email.
 * The site exposes intentional `qa-*` IDs as a stable QA contract.
 */
export class PlanetConfigPage extends BasePage {
  protected readonly url = env.BASE_URL_PLANETCONFIG;

  constructor(page: Page) {
    super(page);
  }

  offerRadio(offer: PlanetConfigOffer): Locator {
    const map: Record<PlanetConfigOffer, string> = {
      '2_days': '#qa-radio-offer-2-days',
      '1_month': '#qa-radio-offer-1-month',
      '1_year': '#qa-radio-offer-1-year',
    };
    return this.page.locator(map[offer]);
  }

  async selectOffer(offer: PlanetConfigOffer): Promise<void> {
    await this.offerRadio(offer).check();
  }

  emailInput(): Locator {
    return this.page.locator('#qa-input-email');
  }

  submitButton(): Locator {
    return this.page.locator('#qa-btn-submit-step1');
  }
}
