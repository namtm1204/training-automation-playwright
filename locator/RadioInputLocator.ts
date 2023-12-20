import { Locator, expect } from "@playwright/test";

export class RadioInputLocator {
  readonly locator: Locator;
  constructor(locator: Locator) {
    this.locator = locator;
  }
  getLocator(): Locator {
    return this.locator;
  }
  async isChecked() {
    return this.locator.isChecked();
  }
  async verifyValue(value: string) {
    if (value != "") {
      console.log(this.locator);
      await expect(this.locator).toBeChecked();
    } else {
      await expect(this.locator).not.toBeChecked();
    }
  }
}
