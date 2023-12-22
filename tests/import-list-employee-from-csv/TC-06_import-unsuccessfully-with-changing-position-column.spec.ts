import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { DataImportPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/DataImportPage";

test.describe.parallel("Import employee", () => {
  let page: Page;
  let dataImportPage: DataImportPage;
  let generatePage: GeneratePage;

  const filename = "TC-06.csv";
  const relativePath = "test-data/import-employee/";

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    dataImportPage = new DataImportPage(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`[TC-06] Verify the error appears when import with changing the column position`, async () => {
    let newDirName = relativePath + filename;

    await test.step("Step 1: Go to Data Import Page", async () => {
      await dataImportPage.goToDataImportPage();
    });

    await test.step("Step 2: Select file ", async () => {
      await dataImportPage.selectFile(newDirName);
    });

    await test.step("Step 3: Click select file ", async () => {
      await dataImportPage.clickSelectFileButton();
    });

    await test.step("VP: Verify select file successfully", async () => {
      await expect(dataImportPage.nameFileInput).toContainText(filename);
    });

    await test.step("Step 4: Click Upload button", async () => {
      await dataImportPage.clickUploadButton();
    });

    await test.step("VP: Can show successfull notification", async () => {
      await dataImportPage.verifyCanShowErrorToast();
    });
  });
});
