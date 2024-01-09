import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/manage-locations/TC-47.json";
import { GeneratePage } from "../../helpers/GeneratePage";
import { LocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/Location/LocationsPage";
import { AddLocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/Location/AddLocationPage";

test.describe.parallel("Delete location", () => {
  let page: Page;
  let locationsPage: LocationsPage;
  let addLocationsPage: AddLocationsPage;
  let generatePage: GeneratePage;
  let count = 0;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    locationsPage = new LocationsPage(page);
    addLocationsPage = new AddLocationsPage(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`[TC-47] Verify location is delete successfully`, async () => {
    let random = new Date().toISOString();
    const locationName = testCaseData[0].name + "_" + random;
    await test.step("Step 1: Go to Locations Page", async () => {
      await locationsPage.goToLoginPage();
      await locationsPage.goToLocationsPage();
    });

    await test.step("Step 2: Enter all locations", async () => {
      await addLocationsPage.addTestData(testCaseData, random, locationsPage);
    });

    await test.step("VP: Verify add successfully", async () => {
      await locationsPage.verifyHaveLocationInTable(
        locationName,
        testCaseData[0].city,
        testCaseData[0].country
      );
    });

    await test.step("Step 5: Click Delete", async () => {
      (await locationsPage.getDeleteButton(locationName)).click();
    });

    await test.step("Step 6: Click Confirm Delete", async () => {
      await locationsPage.clickConfirmDelete();
      await locationsPage.waitForPageLoad();
    });

    await test.step("VP: Can not find old location", async () => {
      await locationsPage.verifyDeleteSuccessfully(locationName);
    });
  });
});
