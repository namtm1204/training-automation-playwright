import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/general-infor-data-admin/TC-01.json";
import { GeneratePage } from "../../helpers/generatePage";
import { OrganizationGeneralInformationPage } from "../../page-objects/admin/OrganizationGeneralInformationPage";

test.describe.parallel("Update name", () => {
  let page: Page;
  let organizationGeneralInformationPage: OrganizationGeneralInformationPage;
  let generatePage: GeneratePage;

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
    test(`[TC-01] Verify general information saved successfully when updating only Origination name = ${testData.Organization_Name}`, async () => {
      test.setTimeout(3 * 60 * 1000);
      await test.step("Step 1: Go to Organization General Information Page", async () => {
        await organizationGeneralInformationPage.goToOrganizationGeneralInformationPage();
      });

      await test.step("Step 2: Click Edit", async () => {
        await organizationGeneralInformationPage.clickEdit();
      });

      await test.step("Step 3: Update Origination name", async () => {
        await organizationGeneralInformationPage.enterOrganizationName(
          testData.Organization_Name
        );
      });

      await test.step("Step 4: Click Submit", async () => {
        await organizationGeneralInformationPage.clickSubmit();
      });

      await test.step("Step 5: Verify Origination name after updating ", async () => {
        expect(
          await organizationGeneralInformationPage.getOrganizationName()
        ).toHaveValue(testData.Organization_Name);
      });
    });
  }
});
