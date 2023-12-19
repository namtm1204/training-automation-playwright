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
    if (value != "") {
      await expect(this.locator).toBeChecked();
    } else {
      let arr = await this.locator.all();
      arr.forEach(async (subLocator) => {
        await expect(subLocator).not.toBeChecked();
      });
    }
  }
}
