import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { DataImportPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/DataImportPage";
import { EmployeeListPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/EmployeeListPage";
import { ParseCSVToJSON } from "../../helpers/ParseCSVToJSON";

test.describe.parallel("Import employee", () => {
  let page: Page;
  let dataImportPage: DataImportPage;
  let employeeListPage: EmployeeListPage;
  let generatePage: GeneratePage;
  let parseCSVToJSON: ParseCSVToJSON;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    dataImportPage = new DataImportPage(page);
    employeeListPage = new EmployeeListPage(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`[TC-01] Verify import successfully with all valid fields`, async () => {
    const dirname = "test-data/import-employee/TC-01.csv";
    parseCSVToJSON = new ParseCSVToJSON(dirname);
    const importData = parseCSVToJSON.parse();
    console.log(importData);

    await test.step("Step 1: Go to Data Import Page", async () => {
      await dataImportPage.goToDataImportPage();
    });

    await test.step("Step 2: Select file ", async () => {
      await dataImportPage.selectFile(dirname);
    });

    await test.step("Step 3: Click select file ", async () => {
      await dataImportPage.clickSelectFileButton();
    });

    await test.step("VP: Verify select file successfully", async () => {});

    await test.step("Step 3: Click Upload button", async () => {
      await dataImportPage.clickUploadButton();
    });

    await test.step("VP: Can show successfull notification", async () => {
      await dataImportPage.verifyCanShowSuccessfullNotification(
        importData.length
      );
      await dataImportPage.clickOkButton();
    });

    await test.step("Step 4: Go to Employee list page", async () => {
      await employeeListPage.goToEmployeeListPageFromDataImportPage();
    });

    // await test.step("VP: Import data successfully", async () => {
    //   await employeeListPage.verifyHaveEmployeeInTable(importData);
    // });
  });
});
