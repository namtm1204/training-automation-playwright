import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "../AdminPage";
import { LocationsPage } from "./LocationsPage";
import { Location } from "../../../../interface/LocationInterface";

export class AddLocationsPage extends AdminPage {
  readonly nameTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipCodeTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly countrySelection: Locator;
  readonly saveButton: Locator;
  readonly vietNamItem: Locator;
  readonly noteTextbox: Locator;

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
    this.noteTextbox = page.locator(
      '//*[@class="oxd-label"][contains(.,"Note")]//parent::div//parent::div//child::textarea'
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
  async enterNote(note: any) {
    await this.noteTextbox.fill(note);
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
    locationInfor: Location[],
    randomDate: string,
    locationsPage: LocationsPage
  ) {
    for (let i = 0; i < locationInfor.length; i++) {
      if ("name" in locationInfor[i]) {
        await locationsPage.clickAdd();
        await locationsPage.waitForPageLoad();

        await this.enterName(locationInfor[i].name + "_" + randomDate);
        await this.enterCity(locationInfor[i].city);
        await this.enterZipCode(locationInfor[i].zipCode);
        await this.enterPhone(locationInfor[i].phone);
        await this.clickCountry();
        await this.getCountryItem(locationInfor[i].country).click();

        if (locationInfor[i].note) {
          await this.enterNote(locationInfor[i]?.note);
        }

        await this.clickSave();
        await locationsPage.waitForPageLoad();
      }
    }
  }
}
