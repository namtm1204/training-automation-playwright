import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";

export class LocationsPage extends AdminPage {
  readonly nameTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly countrySelection: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;
  readonly vietNamItem: Locator;
  readonly loadSpinner: Locator;
  readonly nameRecord: Locator;
  readonly cityRecord: Locator;
  readonly countryRecord: Locator;
  readonly numberLocation: Locator;
  readonly selectAllCheckbox: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    //*[@class="oxd-select-option"]//*[contains(text(),"Viet Nam")]
    this.nameTextbox = page.locator(
      "//*[@class='oxd-label'][text()='Name']//parent::div//parent::div//child::input"
    );
    this.cityTextbox = page.locator(
      "//*[@class='oxd-label'][text()='City']//parent::div//parent::div//child::input"
    );
    this.countrySelection = page.locator(
      "//*[@class='oxd-select-text oxd-select-text--active']"
    );
    this.searchButton = page.locator("button[type='submit']");
    this.addButton = page.locator("//button[text()=' Add ']");
    this.vietNamItem = page.locator(
      "//*[@class='oxd-select-option']//*[contains(text(),'Viet Nam')]//parent::div"
    );
    this.loadSpinner = page.locator('//*[@class="oxd-loading-spinner"]');
    this.nameRecord = page.locator(
      '//*[@class="header"][text()="Name"]//parent::div//child::div[@class="data"]'
    );
    this.cityRecord = page.locator(
      '//*[@class="header"][text()="City"]//parent::div//child::div[@class="data"]'
    );
    this.countryRecord = page.locator(
      '//*[@class="header"][text()="Country"]//parent::div//child::div[@class="data"]'
    );
    this.numberLocation = page.locator("//*[text()='(1) Record Found']");
    this.selectAllCheckbox = page.locator(
      '//*[@class="oxd-table-header-sort"]//parent::div//parent::div//*[@class="oxd-checkbox-wrapper"]'
    );
    this.deleteButton = page.locator('//*[text()=" Delete Selected "]');
    this.confirmDeleteButton = page.locator('//*[text()=" Yes, Delete "]');
  }

  async goToLocationsPage() {
    await this.goToLoginPage();
    //click "Admin"
    await this.clickMenuItem();
    //click Organization dropdown
    await this.getOrganizationTab().waitFor({ state: "visible" });
    await this.getOrganizationTab().click();
    //select "General Information" item
    await this.getLocationsItem().click();
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
  async clickCountry() {
    this.countrySelection.click();
  }

  async clickVietNamItem() {
    this.vietNamItem.click();
  }

  async clickAdd() {
    await this.addButton.click();
  }
  async clickSearch() {
    await this.searchButton.click();
  }
  async clickSelectAll() {
    await this.selectAllCheckbox.click();
  }
  async clickDelete() {
    await this.deleteButton.click();
  }
  async clickConfirmDelete() {
    await this.confirmDeleteButton.click();
  }

  getOrganizationTab(): Locator {
    return this.organizationTab;
  }
  getLocationsItem(): Locator {
    return this.locationsItem;
  }
  getAddButton(): Locator {
    return this.addButton;
  }
  getLoadSpinner(): Locator {
    return this.loadSpinner;
  }
  getNameRecord(): Locator {
    return this.nameRecord;
  }
  getCityRecord(): Locator {
    return this.cityRecord;
  }
  getCountryRecord(): Locator {
    return this.countryRecord;
  }
  getNumberLocation(): Locator {
    return this.numberLocation;
  }
}
