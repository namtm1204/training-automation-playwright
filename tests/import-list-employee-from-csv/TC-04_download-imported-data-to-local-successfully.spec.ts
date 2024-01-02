import { test, expect, type Page, Download } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { DataImportPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/DataImportPage";
import { FileHelper } from "../../helpers/FileHepler";

test.describe.parallel("Import employee", () => {
  let page: Page;
  let dataImportPage: DataImportPage;
  let generatePage: GeneratePage;
  let fileHelper: FileHelper;
  let downloadPromise: Promise<Download>;
  let download: Download;

  const filename = "TC-04.csv";
  const relativePath = "test-data/import-employee/";

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    dataImportPage = new DataImportPage(page);

    fileHelper = new FileHelper();
  });

  test.afterEach(async ({ page }) => {
    fileHelper.deleteFile(await download.path());
    await page.close();
  });

  test(`[TC-04] Verify download imported data to local successfully`, async () => {
    let dirName = relativePath + filename;

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
    await test.step("VP: Verify content of file is correct", async () => {
      console.log((await download.path()) + "aloloo");
      dataImportPage.verifyContentOfFile(dirName, await download.path());
    });
  });
});
