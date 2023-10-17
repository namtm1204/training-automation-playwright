import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/general-infor-data-admin/TC-01.json";
import { LoginPage } from "../../page-objects/login/LoginPage";
import { GeneratePage } from "../../helpers/generatePage";
import { OrganizationGeneralInformationPage } from "../../page-objects/admin/OrganizationGeneralInformationPage";

test.describe.parallel("Update name", () => {
  let loginPage: LoginPage;
  let page: Page;
  let organizationGeneralInformationPage: OrganizationGeneralInformationPage;
  let generatePage: GeneratePage;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    //loginPage.loginProcess(loginData[0].username, loginData[0].password);
    organizationGeneralInformationPage = new OrganizationGeneralInformationPage(
      page
    );
  });

  test.afterEach(async ({ page }) => {
    //  loginPage = new LoginPage(page);
    await page.close();
  });

  for (const testData of testCaseData) {
    test(`[TC-01] Verify general information saved successfully when updating only Origination name = ${testData.Organization_Name}`, async () => {
      await test.step("Step 1: Go to Organization General Information Page", async () => {
        await organizationGeneralInformationPage.goToOrganizationGeneralInformationPage();
      });

      await test.step("Step 2: Click Edit", async () => {
        await organizationGeneralInformationPage.click_Edit();
      });

      await test.step("Step 3: Update Origination name", async () => {
        await organizationGeneralInformationPage.enter_Organization_Name(
          testData.Organization_Name
        );
      });

      await test.step("Step 4: Click Submit", async () => {
        await organizationGeneralInformationPage.click_Submit();
      });

      await test.step("Step 5: Verify Origination name after updating ", async () => {
        // test.setTimeout(3 * 60 * 1000);
        console.log(
          "log: " +
            (
              await organizationGeneralInformationPage.getOrganizationName()
            ).innerText()
        );
        expect(
          await organizationGeneralInformationPage.getOrganizationName()
        ).toHaveText(testData.Organization_Name);
      });
    });
  }
});
