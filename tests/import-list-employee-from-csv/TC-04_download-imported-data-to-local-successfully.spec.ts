import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { DataImportPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/DataImportPage";
import fs from "fs";

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

  test(`[TC-04] Verify download imported data to local successfully`, async () => {
    let downloadPromise;
    let download;

    await test.step("Step 1: Go to Data Import Page", async () => {
      await dataImportPage.goToDataImportPage();
    });

    await test.step("Step 2: Click download ", async () => {
      downloadPromise = dataImportPage.page.waitForEvent("download");
      await dataImportPage.clickDownLoad();
      download = await downloadPromise;
    });

    await test.step("VP: Verify download file successfully", async () => {
      expect(download.suggestedFilename()).toBe("importData.csv");
    });
  });
});
