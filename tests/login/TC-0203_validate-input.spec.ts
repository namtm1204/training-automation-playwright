import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/login-test-data/TC-0203.json";
import { LoginPage } from "../../page-objects/login/LoginPage";

test.describe
  .parallel("Validate input when user do not enter account information", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
  });

  test.afterEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.close();
  });

  for (const testData of testCaseData) {
    test(`[TC-0203] Show error message when user enter username = ${testData.username} or password = ${testData.password}`, async () => {
      await test.step("Step 1: Enter username", async () => {
        await loginPage.enterUserName(testData.username);
      });

      await test.step("Step 2: Enter password", async () => {
        await loginPage.enterPassword(testData.password);
      });

      await test.step("Step 3: Click Login", async () => {
        await loginPage.clickLogin();
      });

      await test.step("Show error message below input", async () => {
        await expect(loginPage.page.getByText("Required")).toBeVisible();
      });
    });
  }
});
