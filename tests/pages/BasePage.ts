import type { Page } from '@playwright/test';

/**
 * BasePage — abstract anchor for all page objects.
 * Hard rules (enforced by scripts/validate-layout.sh):
 *  - NO `expect` imports here. Assertions belong to specs.
 *  - NO navigation logic. Each subclass declares its own `url` and a public `goto()`.
 *  - NO shared mutable state.
 *  - Only locator builders and stateless helpers.
 *
 * NOTE: this project tests THREE different external origins
 * (freevpnplanet.com, planetconfig.com, personal.freevpnplanet.com),
 * so each subclass declares an absolute URL — there is no single `baseURL`.
 */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected abstract readonly url: string;

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  currentUrl(): string {
    return this.page.url();
  }
}
