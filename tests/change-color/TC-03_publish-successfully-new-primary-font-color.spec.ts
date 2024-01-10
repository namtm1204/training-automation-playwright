import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { CorporateBrandingPage } from "../../page-objects/abstract-page/abstract-admin-page/CorporateBrandingPagePage";
import testCaseData from "../../test-data/change-color/TC-03.json";
import { ColorHelper } from "../../helpers/ColorHelper";
import { LoginPage } from "../../page-objects/login/LoginPage";

test.describe("Change color", () => {
  let page: Page;
  let page2: Page;
  let generatePage: GeneratePage;
  let corporateBrandingPage: CorporateBrandingPage;
  let loginPage: LoginPage;
  let colorHelper: ColorHelper;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    page2 = await generatePage.createPage(browser);
    corporateBrandingPage = new CorporateBrandingPage(page);
    loginPage = new LoginPage(page2);
    colorHelper = new ColorHelper();
  });

  test.afterEach(async () => {
    await corporateBrandingPage.clickReset();
    await corporateBrandingPage.waitForPageLoad();
    await page.close();
  });

  test(`[TC-01] Verify color is changed successfully when Publish random color for Primary Font Color`, async () => {
    let rgbColor = colorHelper.convertHexToRGB(testCaseData.primaryFontColor);
    await test.step("Step 1: Go to Data Import Page", async () => {
      await corporateBrandingPage.goToLoginPage();
      await corporateBrandingPage.goToCorporateBrandingPage();
    });

    await test.step("Step 2: Change primary color ", async () => {
      await corporateBrandingPage.changePrimaryFontColor(
        testCaseData.primaryFontColor
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

    await test.step("VP: Verify primary color of abstract ", async () => {
      await corporateBrandingPage.verifyPrimaryFontColorOfAbstractPage(
        rgbColor
      );
    });
    await test.step("VP: Verify primary color of login page", async () => {
      await loginPage.goToLoginPage();
      await loginPage.verifyPrimaryFontColorLoginPage(rgbColor);
      await loginPage.close();
    });
  });
});
