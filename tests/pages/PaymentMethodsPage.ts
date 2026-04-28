import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@infra/env';

/**
 * Gateway values observed on the `/payment/` step of Sites B and C.
 * Site B (planetconfig.com, RU): card_ru | 1Payment?i=4 | sber | yoomoney | stripe.
 * Site C (personal.freevpnplanet.com, EN): stripe | crypto (value set dynamically by JS).
 *
 * Note: assignment requires crypto on Site B, but the gateway list above did not
 * include a crypto option at the time of inspection — see docs/ux-findings.md.
 */
export type Gateway = 'card_ru' | '1Payment?i=4' | 'sber' | 'yoomoney' | 'stripe' | 'crypto';

export type PaymentMethodsOrigin = 'planetconfig' | 'personal';

const ORIGIN_TO_BASE_URL: Record<PaymentMethodsOrigin, string> = {
  planetconfig: env.BASE_URL_PLANETCONFIG,
  personal: env.BASE_URL_PERSONAL,
};

/**
 * `/payment/` page on Sites B and C — method-selection screen.
 * Final submit button shares `data-step="2"` across both origins.
 */
export class PaymentMethodsPage extends BasePage {
  protected readonly url: string;

  constructor(page: Page, origin: PaymentMethodsOrigin) {
    super(page);
    this.url = new URL('payment/', ORIGIN_TO_BASE_URL[origin]).toString();
  }

  gatewayRadio(value: Gateway): Locator {
    return this.page.locator(`input[type="radio"][name="gateway"][value="${value}"]`);
  }

  async selectGateway(value: Gateway): Promise<void> {
    await this.gatewayRadio(value).check();
  }

  /** EN-only: button that opens the cryptocurrency picker (Site C). */
  cryptoPickerButton(): Locator {
    return this.page.locator('.js-select-payment-btn');
  }

  submitButton(): Locator {
    return this.page.locator('button[type="submit"][data-step="2"]');
  }
}
