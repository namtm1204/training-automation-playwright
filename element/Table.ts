import { type Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Table extends BaseElement {
  constructor(locator: Locator) {
    super(locator);
  }

  async waitForTableVisible() {
    await this.locator
      .locator("//*[@class='oxd-table-body']")
      .waitFor({ state: "visible" });
  }

  async getColumnIndex(name: string) {
    const index = await this.locator
      .locator(
        `//div[@role='columnheader'][contains(., '${name}')]/preceding-sibling::div`
      )
      .count();
    return index + 1;
  }

  async getRowIndex(content: string, columnIndex: number) {
    const arrName = await this.locator
      .locator(
        `//*[@class='oxd-table-body']//*[@class='oxd-table-card']//*[@role='cell'][${columnIndex}]`
      )
      .allInnerTexts();
    const rowIndex = arrName.indexOf(content);
    if (rowIndex != -1) return rowIndex + 1;
    return -1;
  }
  getRowLocator(index: number) {
    return this.locator.locator(`//*[@class='oxd-table-card'][${index}]`);
  }

  async getLocatorOfContent(
    columnIndex: number,
    rowIndex: number
  ): Promise<Locator> {
    return this.locator.locator(
      `//*[@class='oxd-table-body']//*[@class='oxd-table-card'][${rowIndex}]//*[@role='cell'][${columnIndex}]`
    );
  }

  async getAllDataOfColumn(columnIndex: number): Promise<string[]> {
    const array = await this.locator
      .locator(
        `//*[@class='oxd-table-body']//*[@class='oxd-table-card']//*[@role='cell'][${columnIndex}]`
      )
      .allInnerTexts();
    return array;
  }
}
