import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { DataImportPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/DataImportPage";
import { EmployeeListPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/EmployeeListPage";
import { CSVHelper } from "../../helpers/CSVHelper";
import { PersonalDetailsPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/PersonalDetailsPage";
import { ContactDetailsPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/ContactDetailsPage";
import { EmployeeUtils } from "../../helpers/EmployeeUtils";
import { Employee } from "../../implement/Employee";
import { FileHelper } from "../../helpers/FileHepler";

test.describe.parallel("Import employee", () => {
  let page: Page;
  let dataImportPage: DataImportPage;
  let employeeListPage: EmployeeListPage;
  let generatePage: GeneratePage;
  let personalDetailsPage: PersonalDetailsPage;
  let contactDetailsPage: ContactDetailsPage;
  let csvHelper: CSVHelper;
  let fileHelper: FileHelper;
  let randomEmployeeData: Employee[];
  let customEmployeeData: any;
  let employeeUtils: EmployeeUtils;

  const filename = "TC-09.csv";
  const randomFileName = "TC-09-Random.csv";
  const relativePath = "test-data/import-employee/";

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    dataImportPage = new DataImportPage(page);
    employeeListPage = new EmployeeListPage(page);
    personalDetailsPage = new PersonalDetailsPage(page);
    contactDetailsPage = new ContactDetailsPage(page);

    csvHelper = new CSVHelper();
    fileHelper = new FileHelper();
    employeeUtils = new EmployeeUtils();
    await csvHelper.createRandomTestDataFile(
      relativePath + filename,
      relativePath + randomFileName
    );
    randomEmployeeData = csvHelper.parseToEmployee(
      relativePath + randomFileName
    );
    customEmployeeData = employeeUtils.filterEmployeeList(randomEmployeeData);
  });

  test.afterEach(async () => {
    console.log(randomEmployeeData);

    await employeeListPage.deleteTestData(customEmployeeData.uniqueData);
    fileHelper.deleteFile(relativePath + randomFileName);
    await page.close();
  });

  test(`[TC-09] Verify can not add the duplicated employee list`, async () => {
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
      await expect(dataImportPage.nameFileInput).toContainText(randomFileName);
    });

    await test.step("Step 4: Click Upload button", async () => {
      await dataImportPage.clickUploadButton();
    });

    await test.step("VP: Can show error notification", async () => {
      await dataImportPage.verifyCanShowErrorNotification(customEmployeeData);
    });

    await test.step("Step 5: Click Ok", async () => {
      await dataImportPage.clickOkButton();
    });

    await test.step("Step 6: Go to Employee list page", async () => {
      await employeeListPage.goToEmployeeListPageFromDataImportPage();
    });

    await test.step("VP: Import unique data successfully", async () => {
      await employeeListPage.verifyImportSuccessFully(
        customEmployeeData.uniqueData,
        personalDetailsPage,
        contactDetailsPage
      );
    });
  });
});
