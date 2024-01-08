import { expect, type Locator, type Page } from "@playwright/test";
import { AbstractMenuPage } from "../AbstractMenuPage";

export abstract class AdminPage extends AbstractMenuPage {
  readonly organizationTab: Locator;
  readonly generalInforItem: Locator;
  readonly locationsItem: Locator;
  readonly corporateBrandingTab: Locator;
  readonly mainMenuButton: Locator;

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
    this.corporateBrandingTab = page.locator(
      '//*[@class="oxd-topbar-body-nav-tab-item"][contains(text(),"Corporate Branding")]'
    );
    this.mainMenuButton = page.locator(".oxd-main-menu-button");
  }
  async clickMenuItem() {
    await this.adminMenuItem.click();
  }
  getCountryItem(country: string): Locator {
    return this.page.locator(
      `//*[@class='oxd-select-option']//*[contains(text(),'${country}')]//parent::div`
    );
  }
}
