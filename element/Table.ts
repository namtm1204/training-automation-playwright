import { type Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Table extends BaseElement {
  constructor(locator: Locator) {
    super(locator);
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
    console.log(arrName);
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
}
