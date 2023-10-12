import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

const Account = {
  username : "Admin",
  password : "admin123",
};
const invalidAccount = {
  username : "abc",
  password : "abc",
};

test.describe("Successfully login to OrangeHRM", () => {
    test('should login to system successfully', async ({ page }) => {

        const valid_Username = page.getByPlaceholder('Username');
        const valid_Password = page.getByPlaceholder('Password');
        const login_Button = page.getByRole('button', {name : " Login "});
        
        await valid_Username.fill(Account.username);
        await valid_Password.fill(Account.password);
        await login_Button.click();
    
        await expect(page.getByRole("heading")).toHaveText([
          "Dashboard"
        ]);
      });
});

test.describe("Unsuccessfully login to OrangeHRM", () => {
  test('should validate when user login with empty username and valid password', async ({ page }) => {

      await page.getByPlaceholder('Password').fill(Account.password);
      await page.getByRole('button', {name : " Login "}).click();
      
      await expect(page.getByText("Required")).toBeVisible();

     
    });

  test('should validate when user login empty username and valid password', async ({ page }) => {

      await page.getByPlaceholder('Password').fill(Account.password);
      await page.getByRole('button', {name : " Login "}).click();
      
      await expect(page.getByText("Required")).toBeVisible();
    });
 
  test('should validate when user login with valid username and empty password', async ({ page }) => {

      await page.getByPlaceholder('Username').fill(Account.username);
      await page.getByRole('button', {name : " Login "}).click();
      
      await expect(page.getByText("Required")).toBeVisible();
    });

  test('should validate when user login invalid username and valid password', async ({ page }) => {

      await page.getByPlaceholder('Username').fill(invalidAccount.username);
      await page.getByPlaceholder('Password').fill(Account.password);
      await page.getByRole('button', {name : " Login "}).click();
      
      await expect(page.getByText("Invalid credentials")).toBeVisible();
    });

    test('should validate when user login valid username and invalid password', async ({ page }) => {

      await page.getByPlaceholder('Username').fill(Account.username);
      await page.getByPlaceholder('Password').fill(invalidAccount.password);
      await page.getByRole('button', {name : " Login "}).click();
      
      await expect(page.getByText("Invalid credentials")).toBeVisible();
    });
});

test.describe("Forgot your password", () => {
    test('should navigate to Reset-password page', async ({ page }) => {

        await page.getByText("Forgot your password?").click();
        await expect(page.getByRole("heading")).toHaveText([
          "Reset Password"
        ]);
      });
});