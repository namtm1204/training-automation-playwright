import { expect, type Locator, type Page } from "@playwright/test";
import { AdminPage } from "./AdminPage";
import { LoginPage } from "../../login/LoginPage";
import { LocationsPage } from "./Location/LocationsPage";
import { EmployeeListPage } from "../abstract-pim-page/PIMConfiguration/EmployeeListPage";

export class CorporateBrandingPage extends AdminPage {
  readonly primaryColorPreview: Locator;
  readonly secondaryColorPreview: Locator;
  readonly primaryFontColorPreview: Locator;
  readonly secondaryFontColorPreview: Locator;
  readonly primaryGradientColorPreview1: Locator;
  readonly primaryGradientColorPreview2: Locator;
  readonly socialMediaImageSwitch: Locator;
  readonly organizationNameRequiredLabel: Locator;
  readonly resetDefaultButton: Locator;
  readonly previewButton: Locator;
  readonly publishButton: Locator;
  readonly colorInput: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    super(page);
    this.primaryColorPreview = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"][contains(.,"Primary Color")]/following-sibling::div'
    );
    this.secondaryColorPreview = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"][contains(.,"Secondary Color")]/following-sibling::div'
    );
    this.primaryFontColorPreview = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"][contains(.,"Primary Font Color")]/following-sibling::div'
    );
    this.secondaryFontColorPreview = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"][contains(.,"Secondary Font Color")]/following-sibling::div'
    );
    this.primaryGradientColorPreview1 = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"][contains(.,"Primary Gradient Color 1")]/following-sibling::div'
    );
    this.primaryGradientColorPreview2 = page.locator(
      '//*[@class="oxd-label oxd-input-field-required"][contains(.,"Primary Gradient Color 2")]/following-sibling::div'
    );
    this.socialMediaImageSwitch = page.locator(
      '//*[@class="oxd-text oxd-text--p orangehrm-sm-field-label"]/following-sibling::div//child::span'
    );
    this.resetDefaultButton = page.locator(
      '//*[@class="oxd-button oxd-button--medium oxd-button--ghost"][contains(.," Reset to Default ")]'
    );
    this.previewButton = page.locator(
      '//*[@class="oxd-button oxd-button--medium oxd-button--ghost"][contains(.," Preview ")]'
    );
    this.publishButton = page.locator(
      '//*[@class="oxd-button oxd-button--medium oxd-button--secondary"][contains(.," Publish ")]'
    );
    this.colorInput = page.locator(".oxd-color-picker .oxd-input--active");
    this.successNotification = page.locator(".oxd-toast--success");
  }

  async goToCorporateBrandingPage() {
    //click "Admin"
    await this.clickMenuItem();
    //click Organization dropdown
    await this.corporateBrandingTab.waitFor({ state: "visible" });
    await this.corporateBrandingTab.click();

    await this.loadSpinner.waitFor({ state: "hidden" });
  }

  async close() {
    await this.page.close();
  }

  async changePrimaryColor(color: string) {
    await this.primaryColorPreview.click();
    await this.colorInput.fill(color);
  }
  async changeSecondaryColor(color: string) {
    await this.secondaryColorPreview.click();
    await this.colorInput.fill(color);
  }
  async changePrimaryFontColor(color: string) {
    await this.primaryFontColorPreview.click();
    await this.colorInput.fill(color);
  }
  async changeSecondaryFontColor(color: string) {
    await this.secondaryFontColorPreview.click();
    await this.colorInput.fill(color);
  }
  async changePrimaryGradientColor1(color: string) {
    await this.primaryGradientColorPreview1.click();
    await this.colorInput.fill(color);
  }
  async changePrimaryGradientColor2(color: string) {
    await this.primaryGradientColorPreview2.click();
    await this.colorInput.fill(color);
  }
  async clickReset() {
    await this.resetDefaultButton.click();
  }
  async clickPreview() {
    await this.previewButton.click();
  }
  async clickPublish() {
    await this.publishButton.click();
  }
  async verifyColorOfTab(rgbColor: any) {
    await expect(this.corporateBrandingTab).toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }
  async verifySocialMediaImageSwitch(rgbColor: any) {
    await expect(this.socialMediaImageSwitch).toHaveCSS(
      "background-color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }
  async verifyMainMenuButton(rgbColor: any) {
    await expect(this.mainMenuButton).toHaveCSS(
      "background-color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }
  async verifySecondaryColorOfCorporateBrandingPage(rgbColor: any) {
    await expect(
      this.publishButton,
      "Verify color of Publish button at Corparate page"
    ).toHaveCSS(
      "background-color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
    await expect(
      this.previewButton,
      "Verify color of Preview button at Corparate page"
    ).toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
    await expect(
      this.previewButton,
      "Verify color of Reset to Default button at Corparate page"
    ).toHaveCSS(
      "color",
      `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`
    );
  }
}
