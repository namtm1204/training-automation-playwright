import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";

export class OrganizationGeneralInformationPage extends AdminPage {
  readonly organizationNameTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly faxTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly editSwitch: Locator;
  readonly submitButton: Locator;
  readonly generalInforTitle: Locator;
  readonly organizationNameRequiredLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.organizationNameTextbox = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"]//parent::div//parent::div//child::input'
    );
    this.phoneTextbox = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Phone")]//parent::div//parent::div//child::input'
    );
    this.faxTextbox = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Fax")]//parent::div//parent::div//child::input'
    );
    this.emailTextbox = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Email")]//parent::div//parent::div//child::input'
    );
    this.editSwitch = page.locator(
      '//*[@class="oxd-switch-input oxd-switch-input--active --label-left"]'
    );
    this.submitButton = page.locator('//*[@type="submit"]');
    this.generalInforTitle = page.locator(
      '//*[@class="oxd-text oxd-text--h6 orangehrm-main-title"]'
    );
    this.organizationNameRequiredLabel = page.locator('//*[text()="Required"]');
  }

  async goToOrganizationGeneralInformationPage() {
    //click "Admin"
    await this.clickMenuItem();
    //click Organization dropdown
    await this.getOrganizationTab().waitFor({ state: "visible" });
    await this.getOrganizationTab().click();
    //select "General Information" item
    await this.getGeneralInforItem().click();

    await this.getGeneralInforTitle().waitFor({ state: "visible" });

    await this.getLoadSpinner().waitFor({ state: "hidden" });
  }

  async close() {
    await this.page.close();
  }

  async enterOrganizationName(name: string) {
    await this.organizationNameTextbox.clear();
    await this.organizationNameTextbox.fill(name);
  }
  async enterPhone(phone: string) {
    await this.phoneTextbox.clear();
    await this.phoneTextbox.fill(phone);
  }
  async enterFax(fax: string) {
    await this.faxTextbox.clear();
    await this.faxTextbox.fill(fax);
  }
  async enterEmail(email: string) {
    await this.emailTextbox.clear();
    await this.emailTextbox.fill(email);
  }
  async clickEdit() {
    await this.editSwitch.click();
  }
  async clickSubmit() {
    await this.submitButton.click();
  }
  getOrganizationNameTextbox(): Locator {
    return this.organizationNameTextbox;
  }
  getPhoneTextbox(): Locator {
    return this.phoneTextbox;
  }
  getFaxTextbox(): Locator {
    return this.faxTextbox;
  }
  getEmailTextbox(): Locator {
    return this.emailTextbox;
  }
  getOrganizationNameRequiredLabel(): Locator {
    return this.organizationNameRequiredLabel;
  }
  getLoadSpinner(): Locator {
    return this.loadSpinner;
  }
  getGeneralInforTitle(): Locator {
    return this.generalInforTitle;
  }
  getGeneralInforItem(): Locator {
    return this.generalInforItem;
  }
  getOrganizationTab(): Locator {
    return this.organizationTab;
  }
}
