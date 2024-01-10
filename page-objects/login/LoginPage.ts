import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordText: Locator;
  readonly backGround: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.forgotPasswordText = page.locator(".orangehrm-login-forgot-header");
    this.backGround = page.locator(".orangehrm-login-layout");
  }

  async goToLoginPage() {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      { timeout: 3 * 60 * 1000 }
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
  async loginProcess(username: string, password: string) {
    await this.goToLoginPage();
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyPrimaryColorLoginPage(rgbColor: any) {
    await expect(this.loginButton).toHaveCSS(
      "background-color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
    await expect(this.forgotPasswordText).toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
    await expect(this.backGround).toHaveCSS(
      "background-color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }

  async verifyPrimaryFontColorLoginPage(rgbColor: any) {
    await expect(this.loginButton).toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }
}
