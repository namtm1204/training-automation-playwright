import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "../login/LoginPage";
import loginData from "../../test-data/login-test-data/TC-01.json";
export abstract class AbstractMenuPage {
  readonly page: Page;
  readonly adminMenuItem: Locator;
  readonly dashBoardMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminMenuItem = page.locator('//*[text()="Admin"]');
  }
  async clickMenuItem(): Promise<void> {}
  async goToLoginPage() {
    let loginPage = new LoginPage(this.page);
    await loginPage.loginProcess(loginData[0].username, loginData[0].password);
  }
}
