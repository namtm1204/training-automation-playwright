import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Table extends BaseElement {
  constructor(locator: Locator) {
    super(locator);
  }

  async getColumnIndex(name: string) {
    const index = await this.locator.locator(`//div[@role='columnheader'][contains(., '${name}')]/preceding-sibling::div`).count();
    return index + 1;
  }

  async getRowIndex(content: string, column: number) {
    const allRow = await this.locator
      .locator("//*[@class='oxd-table-card']")
      .all();

    const contextRow = allRow.find(async (row) => {
      return (
        await row.locator(`//*[@role='cell'][${column}]`).innerText()
      ).includes(content);
    });
    const index = await contextRow?.locator("//preceding-sibling::div").count();
    if (index === undefined) return 0;
    else return index + 1;
  }
}
