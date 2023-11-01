import { Locator, Page, expect } from "@playwright/test";
import { PIMPage } from "../PIMPage";
import { Table } from "../../../../element/Table";
import { Employee } from "../../../../interface/EmployeeInterface";

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

  async verifyHaveEmployeeInTable(listEmployee: Employee[]) {
    await this.getTable().waitForTableVisible();

    let listTable = await this.getListsEmployeeFromTable();

    listEmployee.forEach((employee) => {
      const indexEmployee = listTable.arrFirstMiddleName.indexOf(
        employee.firstName + " " + employee.middleName
      );

      expect(
        indexEmployee,
        `Verify "First (& Middle) Name" column contain ${
          employee.firstName + " " + employee.middleName
        } `
      ).not.toBe(-1);

      expect(
        listTable.arrayLastName[indexEmployee],
        `Verify last name of ${indexEmployee}th employee is ${employee.lastName}`
      ).toBe(employee.lastName);
    });
  }

  async getListsEmployeeFromTable() {
    let arrFirstMiddleName = new Array<String>();
    let arrayLastName = new Array<String>();

    const columnFirstMiddleName = await this.table.getColumnIndex(
      "First (& Middle) Name"
    );
    const columnLastName = await this.table.getColumnIndex("Last Name");

    let isContinue = true;
    do {
      arrFirstMiddleName = arrFirstMiddleName.concat(
        await this.table.getAllDataOfColumn(columnFirstMiddleName)
      );
      arrayLastName = arrayLastName.concat(
        await this.table.getAllDataOfColumn(columnLastName)
      );

      if (await this.getRightTableButton().isVisible()) {
        await this.getRightTableButton().click();
        await this.waitForPageLoad();
      } else {
        isContinue = false;
      }
    } while (isContinue);

    return { arrFirstMiddleName, arrayLastName };
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
    this.verifyDeleteTestData(listEmployee);
  }

  verifyDeleteTestData(listEmployee: Employee[]) {
    expect(
      listEmployee.length,
      `Verify deleted all employees in test data with length of test data equal to ${listEmployee.length}`
    ).toEqual(0);
  }
}
