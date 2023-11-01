import { Locator, Page, expect } from "@playwright/test";
import { PIMPage } from "../PIMPage";
import { Table } from "../../../../element/Table";
import { Employee } from "../../../../interface/EmployeeInterface";

export class EmployeeListPage extends PIMPage {
  readonly table: Table;
  readonly rightTableButton: Locator;
  constructor(page: Page) {
    super(page);
    this.table = new Table(page.locator("//*[@role='table']"));
    this.rightTableButton = page.locator(
      ".oxd-pagination-page-item--previous-next .bi-chevron-right"
    );
    // .oxd-pagination-page-item--previous-next .bi-chevron-right
    // .oxd-pagination-page-item--previous-next .bi-chevron-left
  }

  getTable(): Table {
    return this.table;
  }

  getRightTableButton(): Locator {
    return this.rightTableButton;
  }

  async verifyHaveEmployeeInTable(listEmployee: Employee[]) {
    await this.getTable().waitForTableVisible();

    let list = {
      arrId: new Array<String>(),
      arrFirstMiddleName: new Array<String>(),
      arrayLastName: new Array<String>(),
    };

    await this.getListEmployee(list);

    listEmployee.forEach((employee) => {
      const indexEmployee = list.arrId.indexOf(employee.employeeId);

      expect(
        indexEmployee,
        `Verify "Id" column contain ${employee.employeeId} `
      ).not.toBe(-1);

      expect(
        list.arrFirstMiddleName[indexEmployee],
        `Verify first and middle name of ${indexEmployee}th employee is ${
          employee.firstName + " " + employee.middleName
        }`
      ).toBe(employee.firstName + " " + employee.middleName);

      expect(
        list.arrayLastName[indexEmployee],
        `Verify last name of ${indexEmployee}th employee is ${employee.lastName}`
      ).toBe(employee.lastName);
    });
  }

  async getListEmployee(list) {
    const columnId = await this.table.getColumnIndex("Id");
    const columnFirstMiddleName = await this.table.getColumnIndex(
      "First (& Middle) Name"
    );
    const columnLastName = await this.table.getColumnIndex("Last Name");

    do {
      list.arrId = list.arrId.concat(
        await this.table.getAllDataOfColumn(columnId)
      );
      list.arrFirstMiddleName = list.arrFirstMiddleName.concat(
        await this.table.getAllDataOfColumn(columnFirstMiddleName)
      );
      list.arrayLastName = list.arrayLastName.concat(
        await this.table.getAllDataOfColumn(columnLastName)
      );
      if (await this.getRightTableButton().isVisible()) {
        this.getRightTableButton().click();
        this.waitForPageLoad();
        continue;
      }
    } while (await this.getRightTableButton().isVisible());
  }
}
