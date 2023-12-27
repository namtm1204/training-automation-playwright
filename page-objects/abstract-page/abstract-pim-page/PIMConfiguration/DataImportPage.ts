import { Locator, Page, expect } from "@playwright/test";
import { PIMPage } from "../PIMPage";
import path from "path";
import { Employee } from "../../../../implement/Employee";
import { CustomEmployee } from "../../../../interface/CustomEmployee";
import { FileHelper } from "../../../../helpers/FileHepler";

export class DataImportPage extends PIMPage {
  readonly selectFileButton: Locator;
  readonly uploadButton: Locator;
  readonly nameFileInput: Locator;
  readonly importDetailMessageBox: Locator;
  readonly okButton: Locator;
  readonly fileInput: Locator;
  readonly errorToast: Locator;
  readonly downloadLink: Locator;

  constructor(page: Page) {
    super(page);
    this.selectFileButton = page.locator(".oxd-file-input-icon");
    this.uploadButton = page.locator("button[type='submit']");
    this.nameFileInput = page.locator(".oxd-file-input-div");
    this.importDetailMessageBox = page.locator(".orangehrm-text-center-align");
    this.okButton = page.locator(
      '//*[@class="orangehrm-modal-footer"]//button'
    );
    this.fileInput = page.locator(".oxd-file-input");
    this.errorToast = page.locator(
      " .oxd-toast-content--error .oxd-text--toast-message"
    );
    this.downloadLink = page.locator(".download-link");
  }

  async clickSelectFileButton() {
    await this.selectFileButton.click();
  }

  async clickUploadButton() {
    await this.uploadButton.click();
  }

  async clickOkButton() {
    await this.okButton.click();
  }

  getNameFileInput(): Locator {
    return this.nameFileInput;
  }

  getErrorToast(): Locator {
    return this.errorToast;
  }
  async clickDownLoad() {
    await this.downloadLink.click();
  }

  async selectFile(dirname: string) {
    this.page.on("filechooser", async (fileChooser) => {
      await fileChooser.setFiles(path.join(dirname));
    });
  }
  async verifyCanShowSuccessfullNotification(countRecord: number) {
    const many = countRecord > 1 ? "s" : "";
    await expect(
      this.importDetailMessageBox,
      `Verify ${countRecord} was imported successfully`
    ).toContainText(` ${countRecord} Record${many} Successfully Imported`);
  }

  async verifyCanShowErrorToast() {
    await expect(this.errorToast, `Verify can show error toast`).toContainText(
      `The CSV File Is Not Valid`
    );
  }

  async verifyCanShowErrorNotification(customEmployeeData: CustomEmployee) {
    const many1 = customEmployeeData.uniqueData.length > 1 ? "s" : "";
    const many2 = customEmployeeData.duplicatedData.length > 1 ? "s" : "";
    let failedRow = customEmployeeData.duplicatedDataIndex[0] + "";
    for (let i = 1; i < customEmployeeData.duplicatedDataIndex.length; i++)
      failedRow += "," + customEmployeeData.duplicatedDataIndex[i];

    await expect(
      this.importDetailMessageBox,
      `Verify ${customEmployeeData.uniqueData.length} was imported successfully`
    ).toContainText(
      ` ${customEmployeeData.uniqueData.length} Record${many1} Successfully Imported`
    );

    await expect(
      this.importDetailMessageBox,
      `Verify ${customEmployeeData.duplicatedData.length} can not be imported successfully`
    ).toContainText(
      ` ${customEmployeeData.duplicatedData.length} Record${many2} Failed to Import`
    );

    await expect(
      this.importDetailMessageBox,
      `Verify ${failedRow} is failed rows`
    ).toContainText(`Failed Rows` + failedRow);
  }

  verifyContentOfFile(expectFile: string, actualFile: string) {
    const fileHelper = new FileHelper();
    Promise.all([
      fileHelper.readFile(expectFile),
      fileHelper.readFile(actualFile),
    ]).then((data) => {
      var expectContent = data[0];
      var actualContent = data[1];
      console.log(expectContent);
      console.log(actualContent);
      expect(
        expectContent,
        "Verify content of expect file is the same as actual file"
      ).toEqual(actualContent);
    });
  }
}
