import {
  chromium,
  expect,
  type Locator,
  type Page,
  type Browser,
} from "@playwright/test";

export class GeneratePage {
  readonly browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  async createPage(browser: Browser): Promise<Page> {
    browser = await chromium.launch();
    return await browser.newPage();
  }
  async closeBrowser() {
    this.browser.close();
  }
}
