import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/login-test-data/TC-01.json";
import { LoginPage } from "../../page-objects/login/LoginPage";

test.describe.parallel("Successfully login to OrangeHRM", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.close();
  });

  for (const testData of testCaseData) {
    test("[TC-01] User can login to system successfully", async () => {
      await test.step("Step 1: Enter username", async () => {
        await loginPage.enterUserName(testData.username);
      });

      await test.step("Step 2: Enter password", async () => {
        await loginPage.enterPassword(testData.password);
      });

      await test.step("Step 3: Click Login", async () => {
        await loginPage.clickLogin();
      });

      await test.step("Verify navigation to Dashboard page", async () => {
        await expect(loginPage.page.getByRole("heading")).toHaveText([
          "Dashboard",
        ]);
      });
    });
  }
});
