import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";
import { LocationsPage } from "./LocationsPage";

export class AddLocationsPage extends AdminPage {
  readonly nameTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipCodeTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly countrySelection: Locator;
  readonly saveButton: Locator;
  readonly vietNamItem: Locator;

  constructor(page: Page) {
    super(page);
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
    this.vietNamItem = page.locator(
      "//*[@class='oxd-select-option']//*[contains(text(),'Viet Nam')]//parent::div"
    );
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
  async addTestData(
    testCaseData: any,
    randomDate: string,
    locationsPage: LocationsPage
  ) {
    for (let i = 1; i < testCaseData.length; i++) {
      await locationsPage.clickAdd();
      await locationsPage.waitForPageLoad();

      await this.enterName(testCaseData[i].Location_Name + "_" + randomDate);
      await this.enterCity(testCaseData[i].City);
      await this.enterZipCode(testCaseData[i].Zip);
      await this.enterPhone(testCaseData[i].Phone);
      await this.clickCountry();
      await this.getCountryItem(testCaseData[i].Country).click();
      await this.clickSave();

      await locationsPage.waitForPageLoad();
      await locationsPage.getAddButton().waitFor({ state: "visible" });
    }
  }
}
