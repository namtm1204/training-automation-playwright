import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";
import { Table } from "../../../element/Table";

export class LocationsPage extends AdminPage {
  readonly nameTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly countrySelection: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;
  readonly vietNamItem: Locator;
  readonly nameRecord: Locator;
  readonly cityRecord: Locator;
  readonly countryRecord: Locator;
  readonly numberLocation: Locator;
  readonly selectAllCheckbox: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly successToast: Locator;
  readonly table: Table;

  constructor(page: Page) {
    super(page);
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
    this.nameRecord = page.locator(
      '//*[@class="oxd-table-body"]//*[contains(text(),"yRioii")]'
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
    this.deleteButton = page.locator(
      '//*[@class="oxd-icon bi-trash-fill oxd-button-icon"]'
    );
    this.confirmDeleteButton = page.locator(
      '//*[@class="oxd-icon bi-trash oxd-button-icon"]'
    );
    this.successToast = page.locator('//*[@class="oxd-toast-start"]');
    this.table = new Table(page.locator("//*[@role='table']"));
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
    await this.countrySelection.click();
  }

  async clickVietNamItem() {
    await this.vietNamItem.click();
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
  async verifySearch(
    name: string,
    city: string,
    country: string
  ): Promise<Boolean> {
    const columnName = await this.table.getColumnIndex("Name");
    const rowName = await this.table.getRowIndex(name, columnName);
    const columnCity = await this.table.getColumnIndex("City");
    const rowCity = await this.table.getRowIndex(city, columnCity);
    const columnCountry = await this.table.getColumnIndex("Country");
    const rowCountry = await this.table.getRowIndex(country, columnCountry);
    console.log(rowName + " " + rowCity + " " + rowCountry);
    if (rowName == rowCity && rowName == rowCountry && rowName != 0)
      return true;
    return false;
  }
  getCityRecord(city: string): Locator {
    return this.page.locator(
      `//*[@class="oxd-table-body"]//*[contains(text(),"${city}")]`
    );
  }
  getCountryRecord(country: string): Locator {
    return this.page.locator(
      `//*[@class="oxd-table-body"]//*[contains(text(),"${country}")]`
    );
  }
  getNumberLocation(): Locator {
    return this.numberLocation;
  }
  getSuccessToast(): Locator {
    return this.successToast;
  }
}
