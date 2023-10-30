import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";

export class EditLocationsPage extends AdminPage {
  readonly nameTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipCodeTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly countrySelection: Locator;
  readonly saveButton: Locator;
  readonly title: Locator;
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
    this.title = page.locator(
      "//*[@class='oxd-text oxd-text--h6 orangehrm-main-title'][contains(.,'Edit Location')]"
    );
    this.noteTextbox = page.locator(
      '//*[@class="oxd-label"][contains(.,"Note")]//parent::div//parent::div//child::textarea'
    );
  }

  async close() {
    await this.page.close();
  }

  async editName(name: string) {
    await this.nameTextbox.clear();
    await this.nameTextbox.fill(name);
  }
  async editCity(city: string) {
    await this.cityTextbox.clear();
    await this.cityTextbox.fill(city);
  }
  async editZipCode(zipCode: string) {
    await this.zipCodeTextbox.clear();
    await this.zipCodeTextbox.fill(zipCode);
  }
  async editPhone(phone: string) {
    await this.phoneTextbox.clear();
    await this.phoneTextbox.fill(phone);
  }
  async editNote(note: string) {
    await this.noteTextbox.clear();
    await this.noteTextbox.fill(note);
  }

  async clickCountry() {
    await this.countrySelection.click();
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
  getTitle(): Locator {
    return this.title;
  }
  getNote(): Locator {
    return this.noteTextbox;
  }
  async verifyNoteAfterUpdate(newNote: string) {
    await this.getTitle().waitFor({ state: "visible" });
    await this.waitForPageLoad();

    await expect(
      this.getNote(),
      `Verify "Note" has new value ${newNote} `
    ).toHaveValue(newNote);
  }
}
