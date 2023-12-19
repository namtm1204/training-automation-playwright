import { Locator, Page } from "playwright/test";
import { PIMPage } from "../PIMPage";

export class EmployeeDetailsPage extends PIMPage {
  readonly personalDetailButton: Locator;
  readonly contactDetailButton: Locator;
  constructor(page: Page) {
    super(page);
    this.personalDetailButton = page.locator(
      '//*[@class="orangehrm-tabs-wrapper"][contains(.,"Personal Details")]'
    );
    this.contactDetailButton = page.locator(
      '//*[@class="orangehrm-tabs-wrapper"][contains(.,"Contact Details")]'
    );
  }

  async clickPersonalDetialButton() {
    await this.personalDetailButton.click();
  }

  async clickContactDetailButton() {
    await this.contactDetailButton.click();
  }
}
