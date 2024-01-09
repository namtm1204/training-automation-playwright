import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "../login/LoginPage";
import loginData from "../../test-data/login-test-data/TC-01.json";
export abstract class AbstractMenuPage {
  readonly page: Page;
  readonly adminMenuItem: Locator;
  readonly dashBoardMenuItem: Locator;
  readonly pimMenuItem: Locator;
  readonly loadSpinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminMenuItem = page.locator(
      '//*[@class="oxd-text oxd-text--span oxd-main-menu-item--name"][contains(.,"Admin")]'
    );
    this.loadSpinner = page.locator('//*[@class="oxd-loading-spinner"]');
    this.pimMenuItem = page.locator(
      "//*[@class = 'oxd-main-menu-item']//*[contains(.,'PIM')]"
    );
  }
  async clickMenuItem(): Promise<void> {}
  async goToLoginPage() {
    let loginPage = new LoginPage(this.page);
    await loginPage.loginProcess(loginData[0].username, loginData[0].password);
  }

  async waitForPageLoad(): Promise<void> {
    await this.loadSpinner.waitFor({ state: "hidden" });
  }
}
