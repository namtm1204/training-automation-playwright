import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";
import { Employee } from "../../../../implement/Employee";
import { EmployeeDetailsPage } from "./EmployeeDetailsPage";
import { EmployeeLocator } from "../../../../implement/EmployeeLocator";
import { InputLocator } from "../../../../locator/InputLocator";
import { SelectionLocator } from "../../../../locator/SelectionLocator";

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

  async getContactInforEmployeeLocator(
    employeeLocator: EmployeeLocator
  ): Promise<EmployeeLocator> {
    employeeLocator.addressStreet1 = new InputLocator(
      this.getFirstStreetInput()
    );
    employeeLocator.addressStreet2 = new InputLocator(
      this.getSecondStreetInput()
    );
    employeeLocator.city = new InputLocator(this.getCityInput());
    employeeLocator.zipPostalCode = new InputLocator(this.getZipCodeInput());
    employeeLocator.stateProvince = new InputLocator(this.getStateInput());
    employeeLocator.country = new SelectionLocator(this.getCountrySelection());
    employeeLocator.homeTelephone = new InputLocator(this.getHomePhoneInput());
    employeeLocator.mobile = new InputLocator(this.getMobilePhoneInput());
    employeeLocator.workTelephone = new InputLocator(this.getWorkPhoneInput());
    employeeLocator.workEmail = new InputLocator(this.getWorkEmailInput());
    employeeLocator.otherEmail = new InputLocator(this.getOtherEmailInput());
    return employeeLocator;
  }
}
