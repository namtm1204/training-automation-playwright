import { expect, type Locator, type Page } from "@playwright/test";
import { AbstractMenuPage } from "../AbstractMenuPage";

export abstract class AdminPage extends AbstractMenuPage {
  readonly organizationTab: Locator;
  readonly generalInforItem: Locator;
  readonly locationsItem: Locator;

  constructor(page: Page) {
    super(page);
    this.organizationTab = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-item"][contains(text(),"Organization ")]'
    );
    this.generalInforItem = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-link"][contains(text(),"General Information")]'
    );
    this.locationsItem = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-link"][contains(text(),"Locations")]'
    );
  }
  async clickMenuItem() {
    await this.adminMenuItem.click();
  }
}
