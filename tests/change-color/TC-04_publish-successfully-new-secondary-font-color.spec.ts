import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { CorporateBrandingPage } from "../../page-objects/abstract-page/abstract-admin-page/CorporateBrandingPagePage";
import testCaseData from "../../test-data/change-color/TC-04.json";
import { ColorHelper } from "../../helpers/ColorHelper";
import { LocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/Location/LocationsPage";
import { EmployeeListPage } from "../../page-objects/abstract-page/abstract-pim-page/PIMConfiguration/EmployeeListPage";

test.describe("Change color", () => {
  let page: Page;
  let generatePage: GeneratePage;
  let corporateBrandingPage: CorporateBrandingPage;
  let locationsPage: LocationsPage;
  let employeeListPage: EmployeeListPage;
  let colorHelper: ColorHelper;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    corporateBrandingPage = new CorporateBrandingPage(page);
    locationsPage = new LocationsPage(page);
    employeeListPage = new EmployeeListPage(page);
    colorHelper = new ColorHelper();
  });

  test.afterEach(async () => {
    await corporateBrandingPage.goToCorporateBrandingPage();
    await corporateBrandingPage.clickReset();
    await corporateBrandingPage.waitForPageLoad();
    await page.close();
  });

  test(`[TC-04] Verify color is changed successfully when Publish random color for Secondary Color`, async () => {
    let rgbColor = colorHelper.convertHexToRGB(testCaseData.secondaryFontColor);
    await test.step("Step 1: Go to Data Import Page", async () => {
      await corporateBrandingPage.goToLoginPage();
      await corporateBrandingPage.goToCorporateBrandingPage();
    });

    await test.step("Step 2: Change secondary color ", async () => {
      await corporateBrandingPage.changeSecondaryFontColor(
        testCaseData.secondaryFontColor
      );
    });

    await test.step("Step 3: Click publish ", async () => {
      await corporateBrandingPage.clickPublish();
    });

    await test.step("VP: Verify show success notification", async () => {
      await expect(corporateBrandingPage.successNotification).toContainText(
        "Successfully Saved"
      );
    });

    await test.step("VP: Verify secondary font color of Corporate Branding page", async () => {
      await corporateBrandingPage.verifySecondaryFontColorOfCorporateBrandingPage(
        rgbColor
      );
    });
    await test.step("VP: Verify secondary font color of Locations page", async () => {
      await locationsPage.goToLocationsPage();
      await locationsPage.verifySecondaryFontColorLocationPage(rgbColor);
    });
    await test.step("VP: Verify secondary font color of Employee List page", async () => {
      await employeeListPage.goToEmployeeListPage();
      await employeeListPage.verifySecondaryFontColorEmployeeListPage(rgbColor);
    });
  });
});
