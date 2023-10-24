import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/manage-locations/TC-01.json";
import { GeneratePage } from "../../helpers/generatePage";
import { LocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/LocationsPage";
import { AddLocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/AddLocationPage";

test.describe.parallel("Add location", () => {
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
    await locationsPage.clickSelectAll();
    await locationsPage.clickDelete();
    await locationsPage.clickConfirmDelete();
    await locationsPage.getLoadSpinner().waitFor({ state: "hidden" });
    await page.close();
  });

  for (const testData of testCaseData) {
    count++;
    test(`[TC-01] Verify that is possible to add location ${count} then search that location with full infor`, async () => {
      let random = new Date().toISOString();
      const locationName = testData.Location_Name + "_" + random;

      await test.step("Step 1: Go to Locations Page", async () => {
        await locationsPage.goToLocationsPage();
      });

      await test.step("Step 2: Click Add", async () => {
        await locationsPage.clickAdd();
        await locationsPage.waitForPageLoad();
      });

      await test.step("Step 3: Enter location name", async () => {
        await addLocationsPage.enterName(locationName);
      });

      await test.step("Step 4: Enter city", async () => {
        await addLocationsPage.enterCity(testData.City);
      });

      await test.step("Step 5: Enter zip code", async () => {
        await addLocationsPage.enterZipCode(testData.Zip);
      });

      await test.step("Step 6: Enter phone", async () => {
        await addLocationsPage.enterPhone(testData.Phone);
      });

      await test.step("Step 7: Click country", async () => {
        await addLocationsPage.clickCountry();
      });

      await test.step("Step 8: Choose country", async () => {
        await addLocationsPage.getCountryItem(testData.Country).click();
      });

      await test.step("Step 9: Click Save ", async () => {
        await addLocationsPage.clickSave();
      });

      await test.step("VP:Verify add successfully ", async () => {
        await expect(locationsPage.getAddButton()).toBeVisible();
      });

      await test.step("Step 10: Enter location name", async () => {
        await locationsPage.waitForPageLoad();
        await locationsPage.enterName(locationName);
      });

      await test.step("Step 11: Enter city", async () => {
        await locationsPage.enterCity(testData.City);
      });

      await test.step("Step 12: Click country", async () => {
        await locationsPage.clickCountry();
      });

      await test.step("Step 13: Choose country", async () => {
        await addLocationsPage.getCountryItem(testData.Country).click();
      });

      await test.step("Step 14: Click Search", async () => {
        await locationsPage.clickSearch();
        await locationsPage.waitForPageLoad();
      });

      await test.step("VP: Verify search successfully", async () => {
        await locationsPage.verifySearch(
          locationName,
          testData.City,
          testData.Country
        );
      });
    });
  }
});
