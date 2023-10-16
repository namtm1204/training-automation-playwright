import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/login-test-data/TC-0405.json";
import { LoginPage } from "../../page-objects/login/LoginPage";

test.describe.parallel("Validate input when user enter invalid account", () => {
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
    test(`[TC-0405] Show error alert when user enter username = ${testData.username} and password = ${testData.password}`, async () => {
      await test.step("Step 1: Enter username", async () => {
        await loginPage.enterUserName(testData.username);
      });

      await test.step("Step 2: Enter password", async () => {
        await loginPage.enterPassword(testData.password);
      });

      await test.step("Step 3: Click Login", async () => {
        await loginPage.clickLogin(2 * 60 * 1000);
      });

      await test.step("Show error alert above", async () => {
        await expect(
          loginPage.page.getByText("Invalid credentials")
        ).toBeVisible({ timeout: 2 * 60 * 1000 });
      });
    });
  }
});
