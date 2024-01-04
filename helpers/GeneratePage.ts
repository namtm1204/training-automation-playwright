import { chromium, type Page, type Browser } from "@playwright/test";

export class GeneratePage {
  readonly browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  async createPage(browser: Browser): Promise<Page> {
    //let downloadPath = "Training-Automation/download/";
    //browser = await chromium.launch();
    return await browser.newPage();
  }
  async closeBrowser() {
    await this.browser.close();
    console.log("close browser");
  }
}
