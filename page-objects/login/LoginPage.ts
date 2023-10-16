import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: " Login " });
    this.forgotPasswordText = page.getByText("Forgot your password?");
  }

  async goto() {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  async close() {
    await this.page.close();
  }

  async enterUserName(username: string) {
    await this.userNameInput.fill(username);
  }
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  async clickLogin() {
    await this.loginButton.click();
  }
  async clickForgotPassword() {
    await this.forgotPasswordText.click();
  }
}
