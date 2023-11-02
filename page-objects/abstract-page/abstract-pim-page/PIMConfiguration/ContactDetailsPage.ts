import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";
import { Employee } from "../../../../interface/EmployeeInterface";
import { EmployeeDetailsPage } from "./EmployeeDetailsPage";

export class ContactDetailsPage extends EmployeeDetailsPage {
  readonly page: Page;
  readonly firstStreetInput: Locator;
  readonly secondStreetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly countrySelection: Locator;
  readonly homePhoneInput: Locator;
  readonly mobilePhoneInput: Locator;
  readonly workPhoneInput: Locator;
  readonly workEmailInput: Locator;
  readonly otherEmailInput: Locator;

  constructor(page: Page) {
    super(page);

    this.firstStreetInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Street 1")]//child::input'
    );
    this.secondStreetInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Street 2")]//child::input'
    );
    this.cityInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"City")]//child::input'
    );
    this.stateInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"State/Province")]//child::input'
    );
    this.zipCodeInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Zip/Postal Code")]//child::input'
    );
    this.countrySelection = page.locator(
      `//*[@class="oxd-select-text oxd-select-text--active"]//*[@class="oxd-select-text-input"]`
    );
    this.homePhoneInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Home")]//child::input'
    );
    this.mobilePhoneInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Mobile")]//child::input'
    );
    this.workPhoneInput = page.locator(
      '//*[@class="oxd-grid-3 orangehrm-full-width-grid"][contains(.,"Home")]//child::div[contains(.,"Work")]//child::input'
    );
    this.workEmailInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Work Email")]//child::input'
    );
    this.otherEmailInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Other Email")]//child::input'
    );
  }
  getFirstStreetInput(): Locator {
    return this.firstStreetInput;
  }
  getSecondStreetInput(): Locator {
    return this.secondStreetInput;
  }
  getCityInput(): Locator {
    return this.cityInput;
  }
  getStateInput(): Locator {
    return this.stateInput;
  }
  getZipCodeInput(): Locator {
    return this.zipCodeInput;
  }
  getCountrySelection(): Locator {
    return this.countrySelection;
  }
  getHomePhoneInput(): Locator {
    return this.homePhoneInput;
  }
  getMobilePhoneInput(): Locator {
    return this.mobilePhoneInput;
  }
  getWorkPhoneInput(): Locator {
    return this.workPhoneInput;
  }
  getWorkEmailInput(): Locator {
    return this.workEmailInput;
  }
  getOtherEmailInput(): Locator {
    return this.otherEmailInput;
  }

  async verifyContactDetail(employee: Employee) {
    if (employee.addressStreet1) {
      await expect(this.getFirstStreetInput()).toHaveValue(
        employee.addressStreet1
      );
    }
    if (employee.addressStreet2) {
      await expect(this.getSecondStreetInput()).toHaveValue(
        employee.addressStreet2
      );
    }
    if (employee.city) {
      await expect(this.getCityInput()).toHaveValue(employee.city);
    }
    if (employee.stateProvince) {
      await expect(this.getStateInput()).toHaveValue(employee.stateProvince);
    }
    if (employee.zipPostalCode) {
      await expect(this.getZipCodeInput()).toHaveValue(employee.zipPostalCode);
    }
    if (employee.country) {
      await expect(this.getCountrySelection()).toHaveText(employee.country);
    }
    if (employee.homeTelephone) {
      await expect(this.getHomePhoneInput()).toHaveValue(
        employee.homeTelephone
      );
    }
    if (employee.mobile) {
      await expect(this.getMobilePhoneInput()).toHaveValue(employee.mobile);
    }
    if (employee.workTelephone) {
      await expect(this.getWorkPhoneInput()).toHaveValue(
        employee.workTelephone
      );
    }
    if (employee.homeTelephone) {
      await expect(this.getHomePhoneInput()).toHaveValue(
        employee.homeTelephone
      );
    }
    if (employee.workEmail) {
      await expect(this.getWorkEmailInput()).toHaveValue(employee.workEmail);
    }
    if (employee.otherEmail) {
      await expect(this.getOtherEmailInput()).toHaveValue(employee.otherEmail);
    }
  }
}
