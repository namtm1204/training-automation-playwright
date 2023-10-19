import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/general-infor-data-admin/TC-02.json";
import { GeneratePage } from "../../helpers/generatePage";
import { OrganizationGeneralInformationPage } from "../../page-objects/admin/OrganizationGeneralInformationPage";

test.describe.parallel("Update1", () => {
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
    test(`[TC-02] Verify general information saved successfully when providing all fields are valid`, async () => {
      test.setTimeout(3 * 60 * 1000);
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

      await test.step("Step 4: Update phone", async () => {
        await organizationGeneralInformationPage.enterPhone(testData.Email);
      });

      await test.step("Step 5: Update fax", async () => {
        await organizationGeneralInformationPage.enterFax(testData.Fax);
      });

      await test.step("Step 6: Update email", async () => {
        await organizationGeneralInformationPage.enterEmail(testData.Email);
      });
      await test.step("Step 7: Click Submit", async () => {
        await organizationGeneralInformationPage.click_Submit();
      });

      await test.step("Step 8: Verify all fields after updating ", async () => {
        expect(
          await organizationGeneralInformationPage.getOrganizationName()
        ).toHaveValue(testData.Organization_Name);
      });
    });
  }
});
