import { Locator, Page } from "playwright-core";
import { Employee } from "../../../../interface/EmployeeInterface";
import { expect } from "playwright/test";
import { EmployeeDetailsPage } from "./EmployeeDetailsPage";

export class PersonalDetailsPage extends EmployeeDetailsPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly otherIdInput: Locator;
  readonly driverLicenseNumberInput: Locator;
  readonly licenseExpiryDateInput: Locator;
  readonly maritalStatusSelection: Locator;
  readonly dateOfBirthInput: Locator;
  readonly maleRadio: Locator;
  readonly feMaleRadio: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Employee Id")]//child::input'
    );
    this.otherIdInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Other Id")]//child::input'
    );
    this.driverLicenseNumberInput = page.locator(
      `//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Driver's License Number")]//child::input`
    );
    this.licenseExpiryDateInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"License Expiry Date")]//child::input'
    );
    this.maritalStatusSelection = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Marital Status")]//*[@class="oxd-select-text-input"]'
    );
    this.dateOfBirthInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Date of Birth")]//child::input'
    );
    this.maleRadio = page.locator('input[type="radio"][ value="1"]');
    this.feMaleRadio = page.locator('input[type="radio"][ value="2"]');
  }

  getFirstNameInput(): Locator {
    return this.firstNameInput;
  }
  getMiddleNameInput(): Locator {
    return this.middleNameInput;
  }
  getLastNameInput(): Locator {
    return this.lastNameInput;
  }
  getEmployeeIdInput(): Locator {
    return this.employeeIdInput;
  }
  getOtherIdInput(): Locator {
    return this.otherIdInput;
  }
  getLicenseExpiryDateInput(): Locator {
    return this.licenseExpiryDateInput;
  }
  getDriverLicenseNumberInput(): Locator {
    return this.driverLicenseNumberInput;
  }
  getMaritalStatusSelection(): Locator {
    return this.maritalStatusSelection;
  }
  getDateOfBirthInput(): Locator {
    return this.dateOfBirthInput;
  }
  getMaleRadio(): Locator {
    return this.maleRadio;
  }
  getFeMaleRadio(): Locator {
    return this.feMaleRadio;
  }

  async verifyPersionalDetail(employee: Employee) {
    await expect(this.getFirstNameInput()).toHaveValue(employee.firstName);
    await expect(this.getLastNameInput()).toHaveValue(employee.lastName);
    if (employee.middleName) {
      await expect(this.getMiddleNameInput()).toHaveValue(employee.middleName);
    }
    if (employee.employeeId) {
      await expect(this.getEmployeeIdInput()).toHaveValue(employee.employeeId);
    }
    if (employee.otherId) {
      await expect(this.getOtherIdInput()).toHaveValue(employee.otherId);
    }
    if (employee.licenseExpiryDate) {
      await expect(this.getLicenseExpiryDateInput()).toHaveValue(
        employee.licenseExpiryDate
      );
    }
    if (employee.driversLicenseNo) {
      await expect(this.getDriverLicenseNumberInput()).toHaveValue(
        employee.driversLicenseNo
      );
    }
    if (employee.maritalStatus) {
      await expect(this.getMaritalStatusSelection()).toHaveText(
        employee.maritalStatus
      );
    }
    if (employee.dateOfBirth) {
      await expect(this.getDateOfBirthInput()).toHaveValue(
        employee.dateOfBirth
      );
    }
    if (employee.gender == "Male") {
      await expect(this.getMaleRadio()).toBeChecked();
    }
    if (employee.gender == "Female") {
      await expect(this.getFeMaleRadio()).toBeChecked();
    }
  }
}
