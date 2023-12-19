import { Locator, expect } from "@playwright/test";

export class SelectionLocator {
  readonly locator: Locator;
  constructor(locator: Locator) {
    this.locator = locator;
  }
  async getValue() {
    return await this.locator.innerText();
  }
  async verifyValue(value: string) {
    await expect(this.locator).toHaveText(value);
  }
}
