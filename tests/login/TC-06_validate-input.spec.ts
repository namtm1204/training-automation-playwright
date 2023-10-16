import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../../page-objects/login/LoginPage";

test.describe.parallel("Verify when user click Forgot Password ", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.close();
  });

  test("[TC-06] User will be navigated to Reset password page", async () => {
    await test.step("Step 1: Enter username", async () => {
      await loginPage.clickForgotPassword();
    });

    await test.step("Verify navigation to Reset password page", async () => {
      await expect(loginPage.page.getByRole("heading")).toHaveText([
        "Reset Password",
      ]);
    });
  });
});
