import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/manage-locations/TC-19.json";
import { GeneratePage } from "../../helpers/GeneratePage";
import { LocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/Location/LocationsPage";
import { AddLocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/Location/AddLocationPage";

test.describe.parallel("Search location", () => {
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
    await locationsPage.resetLocation();
    await locationsPage.clickSelectAll();
    await locationsPage.clickDelete();
    await locationsPage.clickConfirmDelete();
    await locationsPage.getLoadSpinner().waitFor({ state: "hidden" });
    await page.close();
  });

  test(`[TC-19] Verify that is possible to search location with country`, async () => {
    let random = new Date().toISOString();
    await test.step("Step 1: Go to Locations Page", async () => {
      await locationsPage.goToLocationsPage();
    });

    await test.step("Step 2: Enter all locations", async () => {
      await addLocationsPage.addTestData(
        testCaseData.data,
        random,
        locationsPage
      );
    });

    await test.step("Step 3: Click country", async () => {
      await locationsPage.clickCountry();
    });

    await test.step("Step 4: Choose country", async () => {
      await locationsPage.getCountryItem(testCaseData.country).click();
      await expect(locationsPage.countrySelection).toHaveText(
        testCaseData.country
      );
      console.log(await locationsPage.countrySelection.innerText());
    });

    await test.step("Step 11: Click Search", async () => {
      await locationsPage.clickSearch();
      await locationsPage.waitForPageLoad();
    });

    await test.step("VP: Verify search successfully", async () => {
      await locationsPage.verifySearchWithCountry(testCaseData.country);
    });
  });
});
