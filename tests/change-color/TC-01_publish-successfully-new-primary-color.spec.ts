import { test, expect, type Page } from "@playwright/test";
import { GeneratePage } from "../../helpers/GeneratePage";
import { CorporateBrandingPage } from "../../page-objects/abstract-page/abstract-admin-page/CorporateBrandingPagePage";
import testCaseData from "../../test-data/change-color/TC-01.json";
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

  test(`[TC-01] Verify color is changed successfully when Publish random color for Primary Color`, async () => {
    let rgbColor = colorHelper.convertHexToRGB(testCaseData.primaryColor);
    await test.step("Step 1: Go to Data Import Page", async () => {
      await corporateBrandingPage.goToCorporateBrandingPage();
    });

    await test.step("Step 2: Change primary color ", async () => {
      await corporateBrandingPage.changePrimaryColor(testCaseData.primaryColor);
    });

    await test.step("Step 3: Click publish ", async () => {
      await corporateBrandingPage.clickPublish();
    });

    await test.step("VP: Verify show success notification", async () => {
      await expect(corporateBrandingPage.successNotification).toContainText(
        "Successfully Saved"
      );
    });

    await test.step("VP: Verify primary color of Corporate Branding tab", async () => {
      await corporateBrandingPage.verifyColorOfTab(rgbColor);
    });
    await test.step("VP: Verify primary color of Social Media Image Switch", async () => {
      await corporateBrandingPage.verifySocialMediaImageSwitch(rgbColor);
    });
    await test.step("VP: Verify primary color of main menu button", async () => {
      await corporateBrandingPage.verifyMainMenuButton(rgbColor);
    });
    await test.step("VP: Verify primary color of login page", async () => {
      await loginPage.verifyPrimaryColorLoginPage(rgbColor);
    });
  });
});
