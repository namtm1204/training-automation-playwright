import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Table extends BaseElement {
  constructor(locator: Locator) {
    super(locator);
  }

  async getColumn(name: string) {
    const headers = await this.locator
      .locator("//*[@role='columnheader']")
      .all();
    const nameHeader = headers.find(async (header) => {
      return (await header.innerText()).includes(name);
    });
    console.log("log: " + nameHeader);

    const index = await nameHeader?.locator("//preceding-sibling::div").count();
    if (index === undefined) return 0;
    else return index + 1;
  }

  async getRow(content: string, column: number) {
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
