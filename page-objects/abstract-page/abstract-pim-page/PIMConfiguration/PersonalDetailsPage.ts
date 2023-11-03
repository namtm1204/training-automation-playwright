import { Locator, Page } from "playwright-core";
import { Employee } from "../../../../implement/Employee";
import { expect } from "playwright/test";
import { EmployeeDetailsPage } from "./EmployeeDetailsPage";
import { EmployeeLocator } from "../../../../implement/EmployeeLocator";
import { InputLocator } from "../../../../locator/InputLocator";
import { SelectionLocator } from "../../../../locator/SelectionLocator";
import { LabelLocator } from "../../../../locator/RadioInputLocator";

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
  readonly nationalitySelection: Locator;
  readonly dateOfBirthInput: Locator;
  readonly maleRadio: Locator;
  readonly feMaleRadio: Locator;
  readonly maleLabel: Locator;
  readonly femaleLabel: Locator;

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
    this.nationalitySelection = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Nationality")]//*[@class="oxd-select-text-input"]'
    );
    this.dateOfBirthInput = page.locator(
      '//*[@class="oxd-input-group oxd-input-field-bottom-space"][contains(.,"Date of Birth")]//child::input'
    );
    this.maleRadio = page.locator('input[type="radio"][ value="1"]');
    this.feMaleRadio = page.locator('input[type="radio"][ value="2"]');
    this.maleLabel = page.locator(
      '//*[@class="oxd-radio-input oxd-radio-input--active --label-right oxd-radio-input"]'
    );
    this.femaleLabel = page.locator(
      '//*[@class="oxd-radio-input oxd-radio-input--active --label-right oxd-radio-input"]//parent::label[text()="Female"]'
    );
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
  getNationalitySelection(): Locator {
    return this.nationalitySelection;
  }
  getDateOfBirthInput(): Locator {
    return this.dateOfBirthInput;
  }
  getMaleRadio(): Locator {
    return this.maleRadio;
  }
  getMaleLabel(): Locator {
    return this.maleLabel;
  }
  getFemaleLabel(): Locator {
    return this.femaleLabel;
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
    // if (employee.gender == "Female") {
    //   await expect(this.getFeMaleRadio()).toBeChecked();
    // }
  }

  async getPersonalInforEmployeeLocator(
    employeeLocator: EmployeeLocator
  ): Promise<EmployeeLocator> {
    // await expect(this.getFirstNameInput()).not.toHaveValue("");

    // employee.firstName = await this.getFirstNameInput().inputValue();
    // employee.middleName = await this.getMiddleNameInput().inputValue();
    // employee.lastName = await this.getLastNameInput().inputValue();
    // employee.employeeId = await this.getEmployeeIdInput().inputValue();
    // employee.otherId = await this.getOtherIdInput().inputValue();
    // employee.driversLicenseNo =
    //   await this.getDriverLicenseNumberInput().inputValue();
    // employee.licenseExpiryDate =
    //   await this.getLicenseExpiryDateInput().inputValue();
    // employee.dateOfBirth = await this.getDateOfBirthInput().inputValue();
    // employee.nationality = await this.getNationalitySelection().innerText();
    // employee.maritalStatus = await this.getMaritalStatusSelection().innerText();
    // if (await this.getMaleRadio().isChecked()) {
    //   employee.gender = "Male";
    // } else {
    //   employee.gender = "Female";
    // }
    // console.log("aaa", employee);
    employeeLocator.firstName = new InputLocator(this.getFirstNameInput());
    employeeLocator.middleName = new InputLocator(this.getMiddleNameInput());
    employeeLocator.lastName = new InputLocator(this.getLastNameInput());
    employeeLocator.employeeId = new InputLocator(this.getEmployeeIdInput());
    employeeLocator.otherId = new InputLocator(this.getOtherIdInput());
    employeeLocator.driversLicenseNo = new InputLocator(
      this.getDriverLicenseNumberInput()
    );
    employeeLocator.licenseExpiryDate = new InputLocator(
      this.getLicenseExpiryDateInput()
    );
    employeeLocator.dateOfBirth = new InputLocator(this.getDateOfBirthInput());
    employeeLocator.nationality = new SelectionLocator(
      this.getNationalitySelection()
    );
    employeeLocator.maritalStatus = new SelectionLocator(
      this.getMaritalStatusSelection()
    );

    employeeLocator.gender = new LabelLocator(this.getMaleLabel());

    // console.log("aaa", employee);
    return employeeLocator;
  }
}
