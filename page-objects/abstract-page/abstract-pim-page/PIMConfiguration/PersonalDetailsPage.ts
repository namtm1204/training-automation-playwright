import { Locator, Page } from "playwright-core";
import { Employee } from "../../../../implement/Employee";
import { expect } from "playwright/test";
import { EmployeeDetailsPage } from "./EmployeeDetailsPage";
import { EmployeeLocator } from "../../../../implement/EmployeeLocator";
import { InputLocator } from "../../../../locator/InputLocator";
import { SelectionLocator } from "../../../../locator/SelectionLocator";
import { RadioInputLocator } from "../../../../locator/RadioInputLocator";

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
  readonly genderRadio: Locator;


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
    this.genderRadio = page.locator('input[type="radio"]');

    this.maleLabel = page.locator(
      '//*[@class="oxd-radio-input oxd-radio-input--active --label-right oxd-radio-input"]//parent::label[text()="Male"]'
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
  getFemaleRadio(): Locator {
    return this.feMaleRadio;
  }
  getMaleLabel(): Locator {
    return this.maleLabel;
  }
  getFemaleLabel(): Locator {
    return this.femaleLabel;
  }
  getGenDerRadio(): Locator {
    return this.genderRadio;
  }

  async getPersonalInforEmployeeLocator(
    employeeLocator: EmployeeLocator,
    employee: Employee
  ): Promise<EmployeeLocator> {
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
    if (employee.gender == "Male") {
      employeeLocator.gender = new RadioInputLocator(
        this.getGenDerRadio().locator('[ value="1"]')
      );
    } else if (employee.gender == "Female") {
      employeeLocator.gender = new RadioInputLocator(
        this.getGenDerRadio().locator('[ value="2"]')
      );
    } else {
      employeeLocator.gender = new RadioInputLocator(this.getGenDerRadio());
    }

    return employeeLocator;
  }
}
