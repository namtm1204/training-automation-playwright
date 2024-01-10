import { expect, type Locator, type Page } from "@playwright/test";
import { AbstractMenuPage } from "../AbstractMenuPage";

export abstract class PIMPage extends AbstractMenuPage {
  readonly configurationTab: Locator;
  readonly employeeListTab: Locator;
  readonly dataImportItem: Locator;

  constructor(page: Page) {
    super(page);
    this.employeeListTab = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-item"][contains(text(),"Employee List")]'
    );
    this.configurationTab = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-item"][contains(text(),"Configuration ")]'
    );
    this.dataImportItem = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-link"][contains(text(),"Data Import")]'
    );
  }

  async clickConfigurationTab() {
    await this.configurationTab.click();
  }

  async clickEmployeeListTab() {
    await this.employeeListTab.click();
  }

  async clickDataImportItem() {
    await this.dataImportItem.click();
  }
}
