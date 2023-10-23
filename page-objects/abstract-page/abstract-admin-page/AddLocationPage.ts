import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";

export class AddLocationsPage extends AdminPage {
  readonly nameTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipCodeTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly countrySelection: Locator;
  readonly saveButton: Locator;
  readonly vietNamItem: Locator;
  readonly loadSpinner: Locator;

  constructor(page: Page) {
    super(page);
    //*[@class="oxd-select-option"]//*[contains(text(),"Viet Nam")]
    this.nameTextbox = page.locator(
      '//*[text()="Name"]//parent::div//parent::div//child::input'
    );
    this.cityTextbox = page.locator(
      '//*[text()="City"]//parent::div//parent::div//child::input'
    );
    this.countrySelection = page.locator(
      '//*[@class="oxd-select-text oxd-select-text--active"]'
    );
    this.zipCodeTextbox = page.locator(
      '//*[text()="Zip/Postal Code"]//parent::div//parent::div//child::input'
    );
    this.phoneTextbox = page.locator(
      '//*[text()="Phone"]//parent::div//parent::div//child::input'
    );
    this.saveButton = page.locator('button[type="submit"]');
    //    this.vietNamItem = page.locator("//*[@role='listbox']");
    this.vietNamItem = page.locator(
      "//*[@class='oxd-select-option']//*[contains(text(),'Viet Nam')]//parent::div"
    );

    this.loadSpinner = page.locator('//*[@class="oxd-loading-spinner"]');
  }

  async close() {
    await this.page.close();
  }

  async enterName(name: string) {
    await this.nameTextbox.fill(name);
  }
  async enterCity(city: string) {
    await this.cityTextbox.fill(city);
  }
  async enterZipCode(zipCode: string) {
    await this.zipCodeTextbox.fill(zipCode);
  }
  async enterPhone(phone: string) {
    await this.phoneTextbox.fill(phone);
  }
  async clickCountry() {
    await this.countrySelection.click();
  }

  async clickVietNamItem() {
    await this.vietNamItem.click();
  }
  async clickSave() {
    await this.saveButton.click();
  }
  getOrganizationTab(): Locator {
    return this.organizationTab;
  }
  getLoadSpinner(): Locator {
    return this.loadSpinner;
  }
}
