import { Locator, Page, expect } from "@playwright/test";
import { PIMPage } from "../PIMPage";
import { Table } from "../../../../element/Table";
import { Employee } from "../../../../implement/Employee";
import { PersonalDetailsPage } from "./PersonalDetailsPage";
import { ContactDetailsPage } from "./ContactDetailsPage";
import { EmployeeLocator } from "../../../../implement/EmployeeLocator";

export class EmployeeListPage extends PIMPage {
  readonly table: Table;
  readonly rightTableButton: Locator;
  readonly resetButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.table = new Table(page.locator("//*[@role='table']"));
    this.rightTableButton = page.locator(
      ".oxd-pagination-page-item--previous-next .bi-chevron-right"
    );
    this.resetButton = page.locator(
      "//*[@class='oxd-button oxd-button--medium oxd-button--ghost']"
    );
    this.confirmDeleteButton = page.locator(
      '//*[@class="oxd-icon bi-trash oxd-button-icon"]'
    );
  }

  getTable(): Table {
    return this.table;
  }

  getRightTableButton(): Locator {
    return this.rightTableButton;
  }

  getResetButton() {
    return this.resetButton;
  }
  getConfirmDeleteButton() {
    return this.confirmDeleteButton;
  }

  async getDeleteButton(name: string): Promise<Locator> {
    const columnName = await this.table.getColumnIndex("First (& Middle) Name");
    const columnActions = await this.table.getColumnIndex("Actions");
    const rowName = await this.table.getRowIndex(name, columnName);
    return (
      await this.table.getLocatorOfContent(columnActions, rowName)
    ).locator("//*[@class='oxd-icon bi-trash']//parent::button");
  }

  async getEditButton(name: string): Promise<Locator> {
    await this.getTable().waitForTableVisible();

    const columnFirstMiddleName = await this.table.getColumnIndex(
      "First (& Middle) Name"
    );
    const columnActions = await this.table.getColumnIndex("Actions");
    const rowName = await this.table.getRowIndex(name, columnFirstMiddleName);
    return (
      await this.table.getLocatorOfContent(columnActions, rowName)
    ).locator("//*[@class='oxd-icon bi-pencil-fill']//parent::button");
  }

  async deleteTestData(listEmployee: Employee[]) {
    await this.getResetButton().click();
    await this.waitForPageLoad();

    let isContinue = true;
    do {
      let index = 0;
      ////find locator and delete employees in each page
      while (index < listEmployee.length) {
        const deleteButton = await this.getDeleteButton(
          listEmployee[index].firstName + " " + listEmployee[index].middleName
        );

        if ((await deleteButton.count()) > 0) {
          await deleteButton.click();
          await this.getConfirmDeleteButton().click();
          await this.waitForPageLoad();
          listEmployee.splice(index, 1);
        } else index++;
      }
      if (
        (await this.getRightTableButton().isVisible()) &&
        listEmployee.length > 0
      ) {
        await this.getRightTableButton().click();
        await this.waitForPageLoad();
      } else {
        isContinue = false;
      }
    } while (isContinue);
  }

  verifyDeleteTestData(listEmployee: Employee[]) {
    expect(
      listEmployee.length,
      `Verify deleted all employees in test data with length of test data equal to ${listEmployee.length}`
    ).toEqual(0);
  }

  async verifyImportSuccessFully(
    listEmployee: Employee[],
    personalDetailsPage: PersonalDetailsPage,
    contactDetailsPage: ContactDetailsPage
  ) {
    await this.getTable().waitForTableVisible();

    const columnFirstMiddleName = await this.table.getColumnIndex(
      "First (& Middle) Name"
    );
    for (let index = 0; index < listEmployee.length; index++) {
      // with each employee, verify this employee is imported successfully
      let employee = listEmployee[index];
      let isContinue = true;
      let isCheck = false;
      do {
        const rowFirstMiddleName = await this.table.getRowIndex(
          employee.firstName + " " + employee.middleName,
          columnFirstMiddleName
        );

        if (rowFirstMiddleName !== -1) {
          await (
            await this.getEditButton(
              employee.firstName + " " + employee.middleName
            )
          ).click();

          await this.verifyPersonalDetailEmployeeLocator(
            personalDetailsPage,
            employee
          );
          await this.verifyContactDetailEmployeeLocator(
            contactDetailsPage,
            employee
          );

          await this.clickEmployeeListTab();
          await this.getTable().waitForTableVisible();

          isContinue = false;
          isCheck = true;
        } else {
          if (await this.getRightTableButton().isVisible()) {
            // go to next page to find employee
            await this.getRightTableButton().click();
            await this.waitForPageLoad();
          } else {
            // after all page, if can not find employee
            isContinue = false;
          }
        }
      } while (isContinue);

      expect(
        isCheck,
        `Verify can find employee ${employee.firstName} in table`
      ).toBe(true);
    }
  }

  async verifyDataInRowIsCorrect(employee: Employee, rowIndex: number) {
    const columnId = await this.table.getColumnIndex("Id");
    const columnFirstMiddleName = await this.table.getColumnIndex(
      "First (& Middle) Name"
    );
    const columnLastName = await this.table.getColumnIndex("Last Name");

    await expect(
      await this.table.getLocatorOfContent(columnFirstMiddleName, rowIndex),
      `Verify value at [${rowIndex},${columnFirstMiddleName}] is ${
        employee.firstName + " " + employee.middleName
      } `
    ).toHaveText(employee.firstName + " " + employee.middleName);

    await expect(
      await this.table.getLocatorOfContent(columnLastName, rowIndex),
      `Verify value at [${rowIndex},${columnLastName}] is ${employee.lastName} `
    ).toHaveText(employee.lastName);

    if (employee.employeeId) {
      await expect(
        await this.table.getLocatorOfContent(columnId, rowIndex),
        `Verify value at [${rowIndex},${columnId}] is ${employee.employeeId} `
      ).toHaveText(employee.employeeId);
    }
  }

  async verifyEmployee(
    actualEmployeeLocator: EmployeeLocator,
    expectEmployee: Employee
  ) {
    const keys = Object.keys(actualEmployeeLocator);

    for (let i = 0; i < keys.length; i++) {
      if (actualEmployeeLocator[keys[i]] !== undefined) {
        await actualEmployeeLocator[keys[i]].verifyValue(
          expectEmployee[keys[i]]
        );
      }
    }
  }

  async verifyPersonalDetailEmployeeLocator(
    personalDetailsPage: PersonalDetailsPage,
    employee: Employee
  ) {
    let personalEmployeeLocator = new EmployeeLocator();

    await this.waitForPageLoad();
    personalEmployeeLocator =
      await personalDetailsPage.getPersonalInforEmployeeLocator(
        personalEmployeeLocator,
        employee
      );
    await this.verifyEmployee(personalEmployeeLocator, employee);
  }

  async verifyContactDetailEmployeeLocator(
    contactDetailsPage: ContactDetailsPage,
    employee: Employee
  ) {
    let contactEmployeeLocator = new EmployeeLocator();

    await contactDetailsPage.clickContactDetailButton();
    await this.waitForPageLoad();
    contactEmployeeLocator =
      await contactDetailsPage.getContactInforEmployeeLocator(
        contactEmployeeLocator
      );
    await this.verifyEmployee(contactEmployeeLocator, employee);
  }
}
