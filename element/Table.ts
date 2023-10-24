import { Locator } from "@playwright/test";
import { BaseElement } from "./BaseElement";

export class Table extends BaseElement {
    constructor(locator: Locator) {
        super(locator)
    }
    
    async getColumn(name: string) {
        const headers = await this.locator.locator("//*[@role='columnheader']").all()
        const nameHeader = headers.find(async (header) => {
            return (await header.innerText()).includes(name)
        })

        if(nameHeader === undefined) throw new Error("")

        const index = await nameHeader.locator("/following-sibling::*[@role='columnheader']").count(); 
    }
}