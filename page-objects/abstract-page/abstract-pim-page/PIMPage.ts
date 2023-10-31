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

  async goToDataImportPage() {
    await this.goToLoginPage();
    //click "PIM"
    await this.clickMenuItem();
    //click Configuration dropdown
    await this.configurationTab.waitFor({ state: "visible" });
    await this.clickConfigurationTab();
    //select "Data import" item
    await this.clickDataImportItem();
  }

  async goToEmployeeListPageFromDataImportPage() {
    await this.clickEmployeeListTab();
  }
  async clickMenuItem() {
    await this.pimMenuItem.click();
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
