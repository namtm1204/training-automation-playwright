import { Locator, expect } from "@playwright/test";

export class InputLocator {
  readonly locator: Locator;
  constructor(locator: Locator) {
    this.locator = locator;
  }
  async getValue() {
    return await this.locator.inputValue();
  }
  async verifyValue(value: string) {
    await expect(this.locator).toHaveValue(value);
  }
}
