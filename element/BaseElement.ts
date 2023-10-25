import { type Locator } from "@playwright/test";

export abstract class BaseElement {
  readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }
}
