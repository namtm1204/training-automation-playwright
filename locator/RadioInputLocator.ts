import { Locator, expect } from "@playwright/test";

export class RadioInputLocator {
  readonly locator: Locator;
  constructor(locator: Locator) {
    this.locator = locator;
  }
  async isChecked() {
    return this.locator.isChecked();
  }
  async verifyValue(value: string) {
    await expect(this.locator).toBeChecked();
  }
}
