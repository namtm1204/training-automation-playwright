import { Page } from "@playwright/test";
import { PIMPage } from "../PIMPage";
import { Table } from "../../../../element/Table";

export class EmployeeListPage extends PIMPage {
  readonly table: Table;
  constructor(page: Page) {
    super(page);
    this.table = new Table(page.locator("//*[@role='table']"));
  }
}
