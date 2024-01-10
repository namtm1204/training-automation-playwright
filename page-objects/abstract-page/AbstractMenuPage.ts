import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "../login/LoginPage";
import loginData from "../../test-data/login-test-data/TC-01.json";
export abstract class AbstractMenuPage {
  readonly page: Page;
  readonly adminMenuItem: Locator;
  readonly dashBoardMenuItem: Locator;
  readonly pimMenuItem: Locator;
  readonly loadSpinner: Locator;
  readonly moduleHeader: Locator;
  readonly userDropdownName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminMenuItem = page.locator(
      '//*[@class="oxd-text oxd-text--span oxd-main-menu-item--name"][contains(.,"Admin")]'
    );
    this.loadSpinner = page.locator('//*[@class="oxd-loading-spinner"]');
    this.pimMenuItem = page.locator(
      "//*[@class = 'oxd-main-menu-item']//*[contains(.,'PIM')]"
    );
    this.moduleHeader = page.locator(".oxd-topbar-header-breadcrumb-module");
    this.userDropdownName = page.locator(".oxd-userdropdown-name");
  }
  async clickMenuItem(item: string): Promise<void> {
    switch (item) {
      case "PIM":
        await this.pimMenuItem.click();
        break;
      case "Admin":
        await this.adminMenuItem.click();
        break;
      // code block
    }
  }

  async goToLoginPage() {
    let loginPage = new LoginPage(this.page);
    await loginPage.loginProcess(loginData[0].username, loginData[0].password);
  }

  async waitForPageLoad(): Promise<void> {
    await this.loadSpinner.waitFor({ state: "hidden" });
  }

  async verifyPrimaryFontColorOfAbstractPage(rgbColor: any) {
    await expect(this.adminMenuItem, "Verify color of admin item ").toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
    await expect(this.moduleHeader, "Verify color of modulw header ").toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
    await expect(
      this.userDropdownName,
      "Verify color of user dropdown name"
    ).toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }
}
