import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "../../page-objects/login/LoginPage";
import loginData from "../../test-data/login-test-data/TC-01.json";

export class OrganizationGeneralInformationPage {
  readonly page: Page;
  readonly organizationNameInput: Locator;
  readonly phoneInput: Locator;
  readonly faxInput: Locator;
  readonly emailInput: Locator;
  readonly editSwitch: Locator;
  readonly submitButton: Locator;
  readonly adminButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.organizationNameInput = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"]//parent::div//parent::div//child::input'
    );
    this.phoneInput = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Phone")]//parent::div//parent::div//child::input'
    );
    this.faxInput = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Fax")]//parent::div//parent::div//child::input'
    );
    this.emailInput = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Email")]//parent::div//parent::div//child::input'
    );
    this.editSwitch = page.locator(
      '//*[@class="oxd-switch-input oxd-switch-input--active --label-left"]'
    );
    this.submitButton = page.locator('//*[@type="submit"]');
    this.adminButton = page.locator('//*[text()="Admin"]');
  }

  async goToLoginPage() {
    let loginPage = new LoginPage(this.page);
    await loginPage.loginProcess(loginData[0].username, loginData[0].password);
  }
  async goToOrganizationGeneralInformationPage() {
    await this.goToLoginPage();
    //click "Admin"
    await this.adminButton.click();
    //click Organization dropdown
    await this.page
      .locator(
        '//*[@class="oxd-topbar-body-nav-tab-item"][contains(text(),"Organization ")]'
      )
      .click();
    //select "General Information" item
    await this.page
      .locator(
        '//*[@class="oxd-topbar-body-nav-tab-link"][contains(text(),"General Information")]'
      )
      .click();

    await expect(
      this.page.locator(
        '//*[@class="oxd-text oxd-text--h6 orangehrm-main-title"]'
      )
    ).toHaveText("General Information");
  }

  async close() {
    await this.page.close();
  }

  async enterOrganizationName(name: string) {
    await this.organizationNameInput.fill(name);
  }
  async enterPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }
  async enterFax(fax: string) {
    await this.faxInput.fill(fax);
  }
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }
  async clickEdit() {
    await this.editSwitch.click();
  }
  async clickSubmit() {
    await this.submitButton.click();
  }
  async getOrganizationName(): Promise<Locator> {
    return this.organizationNameInput;
  }
}
