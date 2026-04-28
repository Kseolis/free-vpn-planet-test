import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * STOP boundary — see docs/CONSTRAINTS.md §2.3.
 *
 * After the user clicks the final submit on Site A's signup page,
 * Site B's PaymentMethodsPage, or Site C's PaymentMethodsPage,
 * the browser is redirected to a third-party payment-provider page
 * (Stripe, Cryptomus, SberPay, ЮMoney, …).
 *
 * Tests use this page object to assert that the redirect happened and the
 * provider page loaded — and then they STOP. No card data, no crypto wallet
 * data, no final "Pay" click.
 */
export class PaymentRedirectPage extends BasePage {
  protected readonly url = 'about:blank';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Returns true if the page has navigated away from any of our 3 source origins
   * to a different origin (the payment provider) OR to a recognised in-house
   * `/payment/` URL with `gateway=` set (some flows render an in-page invoice).
   */
  hasReachedPaymentBoundary(sourceOrigins: readonly string[]): boolean {
    const u = this.page.url();
    if (sourceOrigins.some((o) => u.startsWith(o))) {
      return /[?&]gateway=[^&]+/.test(u);
    }
    return /^https?:\/\//.test(u);
  }
}
