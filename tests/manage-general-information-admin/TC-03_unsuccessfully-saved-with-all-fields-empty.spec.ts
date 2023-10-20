import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/general-infor-data-admin/TC-03.json";
import { GeneratePage } from "../../helpers/generatePage";
import { OrganizationGeneralInformationPage } from "../../page-objects/abstract-page/abstract-admin-page/OrganizationGeneralInformationPage";

test.describe.parallel("Update all fileds empty", () => {
  let page: Page;
  let organizationGeneralInformationPage: OrganizationGeneralInformationPage;
  let generatePage: GeneratePage;
  let count = 0;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    organizationGeneralInformationPage = new OrganizationGeneralInformationPage(
      page
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  for (const testData of testCaseData) {
    count++;
    test(`[TC-03] Verify general information saved unsuccessfully when leaving all fields in testdata${count} empty `, async () => {
      test.setTimeout(3 * 60 * 1000);
      await test.step("Step 1: Go to Organization General Information Page", async () => {
        await organizationGeneralInformationPage.goToOrganizationGeneralInformationPage();
        await expect(
          organizationGeneralInformationPage.getGeneralInforTitle()
        ).toHaveText("General Information");
        await expect(
          organizationGeneralInformationPage.getLoadSpinner()
        ).toBeHidden();
      });

      await test.step("Step 2: Click Edit", async () => {
        await organizationGeneralInformationPage.clickEdit();
      });

      await test.step("Step 3: Update Origination name", async () => {
        await organizationGeneralInformationPage.enterOrganizationName(
          testData.Organization_Name
        );
      });

      await test.step("Step 4: Update phone", async () => {
        await organizationGeneralInformationPage.enterPhone(testData.Phone);
      });

      await test.step("Step 5: Update fax", async () => {
        await organizationGeneralInformationPage.enterFax(testData.Fax);
      });

      await test.step("Step 6: Update email", async () => {
        await organizationGeneralInformationPage.enterEmail(testData.Email);
      });
      await test.step("Step 7: Click Submit", async () => {
        await organizationGeneralInformationPage.clickSubmit();
      });
      await test.step("Step 8: Verify all fields after updating ", async () => {
        await expect(
          organizationGeneralInformationPage.getOrganizationNameRequiredLabel()
        ).toBeVisible();
      });
    });
  }
});
