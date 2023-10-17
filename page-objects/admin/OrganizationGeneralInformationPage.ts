import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "../../page-objects/login/LoginPage";
import loginData from "../../test-data/login-test-data/TC-01.json";

export class OrganizationGeneralInformationPage {
  readonly page: Page;
  readonly organization_Name: Locator;
  readonly phone: Locator;
  readonly fax: Locator;
  readonly email: Locator;
  readonly edit_Button: Locator;
  submit_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.organization_Name = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"]//parent::div//parent::div//child::input'
    );
    this.phone = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Phone")]//parent::div//parent::div//child::input'
    );
    this.fax = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Fax")]//parent::div//parent::div//child::input'
    );
    this.email = page.locator(
      '//*[@class="oxd-form"]//*[contains(text(),"Email")]//parent::div//parent::div//child::input'
    );
    this.edit_Button = page.locator(
      '//*[@class="oxd-switch-input oxd-switch-input--active --label-left"]'
    );
    // this.submit_Button = page.locator('//*[@type="submit"]');
  }

  async goToOrganizationGeneralInformationPage() {
    let loginPage = new LoginPage(this.page);
    await loginPage.loginProcess(loginData[0].username, loginData[0].password);
    //click "Admin"
    await this.page.locator('//*[text()="Admin"]').click();

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

  async enter_Organization_Name(name: string) {
    await this.organization_Name.fill(name);
  }
  async enterPhone(phone: string) {
    await this.phone.fill(phone);
  }
  async enterFax(fax: string) {
    await this.fax.fill(fax);
  }
  async enterEmail(email: string) {
    await this.email.fill(email);
  }
  async click_Edit() {
    await this.edit_Button.click();
  }
  async click_Submit() {
    this.submit_Button = this.page.locator('//*[@type="submit"]');
    await this.submit_Button.click();
  }
  async getOrganizationName(): Promise<Locator> {
    return this.organization_Name;
  }
}
