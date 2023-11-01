import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { DataImportPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/DataImportPage";
import { EmployeeListPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/EmployeeListPage";
import { CSVHelper } from "../../helpers/CSVHelper";

test.describe.parallel("Import employee", () => {
  let page: Page;
  let dataImportPage: DataImportPage;
  let employeeListPage: EmployeeListPage;
  let generatePage: GeneratePage;
  let csvHelper: CSVHelper;
  let randomEmployeeData;

  const filename = "TC-01.csv";
  const randomFileName = "TC-01-Random.csv";
  const relativePath = "test-data/import-employee/";

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    dataImportPage = new DataImportPage(page);
    employeeListPage = new EmployeeListPage(page);

    csvHelper = new CSVHelper();
    await csvHelper.createRandomTestDataFile(
      relativePath + filename,
      relativePath + randomFileName
    );
    randomEmployeeData = csvHelper.parseToEmployee(
      relativePath + randomFileName
    );
  });

  test.afterEach(async ({ page }) => {
    await employeeListPage.deleteTestData(randomEmployeeData);
    csvHelper.deleteRandomTestDataFile(relativePath + randomFileName);
    await page.close();
  });

  test(`[TC-01] Verify import successfully with all valid fields`, async () => {
    let newDirName = relativePath + randomFileName;

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
      await expect(dataImportPage.getNameFileInput()).toContainText(
        randomFileName
      );
    });

    await test.step("Step 4: Click Upload button", async () => {
      await dataImportPage.clickUploadButton();
    });

    await test.step("VP: Can show successfull notification", async () => {
      await dataImportPage.verifyCanShowSuccessfullNotification(
        randomEmployeeData.length
      );
    });

    await test.step("Step 5: Click Ok", async () => {
      await dataImportPage.clickOkButton();
    });

    await test.step("Step 6: Go to Employee list page", async () => {
      await employeeListPage.goToEmployeeListPageFromDataImportPage();
    });

    await test.step("VP: Import data successfully", async () => {
      await employeeListPage.verifyHaveEmployeeInTable(randomEmployeeData);
    });
  });
});
